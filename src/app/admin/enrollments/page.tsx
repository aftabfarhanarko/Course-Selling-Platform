"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  Wallet,
  X,
} from "lucide-react";
import {
  useAdminEnrollmentsManualPaymentMutation,
  useAdminEnrollmentsPayBkashPaymentMutation,
  useAdminEnrollmentsQuery,
  useLazyAdminEnrollmentQuery,
} from "@/lib/api/admin/enrollments";

type UiEnrollment = {
  id: number | string;
  studentId: number | string | null;
  courseId: number | string | null;
  student: string;
  studentEmail: string;
  course: string;
  amount: string;
  status: string;
  paymentMethod: string;
  transactionId?: string;
  isManual: boolean;
  createdAt: string;
  enrolledAt: string;
};

const PAGE_SIZE = 10;

function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function extractEnrollments(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.enrollments)) return payload.enrollments;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.enrollments))
    return payload.data.enrollments;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function extractTotal(payload: any): number | null {
  const candidates = [
    payload?.meta?.total,
    payload?.data?.meta?.total,
    payload?.pagination?.total,
    payload?.data?.pagination?.total,
    payload?.total,
    payload?.data?.total,
  ];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

function normalizeEnrollment(raw: any): UiEnrollment | null {
  const id = raw?.id ?? raw?._id ?? null;
  if (!id) return null;

  const studentObj = raw?.student ?? raw?.user;
  const studentName =
    String(
      studentObj?.name ?? studentObj?.email ?? raw?.userName ?? "",
    ).trim() || "—";

  const studentEmail = String(studentObj?.email ?? "").trim() || "—";
  const studentId =
    studentObj?.id ??
    studentObj?._id ??
    raw?.studentId ??
    raw?.userId ??
    null;

  const courseId =
    raw?.course?.id ??
    raw?.course?._id ??
    raw?.courseId ??
    null;

  const course =
    String(
      raw?.course?.title ??
        raw?.course?.name ??
        raw?.courseTitle ??
        raw?.title ??
        "",
    ).trim() || "—";

  const amount =
    raw?.amount ?? raw?.price ?? raw?.total ?? raw?.payment?.amount ?? "—";

  const status = String(
    raw?.status ?? raw?.paymentStatus ?? (raw?.isPaid ? "paid" : "pending"),
  ).trim();

  const paymentMethod = String(raw?.paymentMethod ?? "—");
  const transactionId = raw?.transactionId ?? undefined;
  const isManual = Boolean(raw?.isManual);

  return {
    id,
    studentId,
    courseId,
    student: studentName,
    studentEmail,
    course,
    amount: String(amount),
    status: status || "—",
    paymentMethod,
    transactionId,
    isManual,
    createdAt: formatDate(raw?.createdAt),
    enrolledAt: formatDate(raw?.enrolledAt),
  };
}

function ModalShell({ title, subtitle, loading, onClose, children }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-60"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* Keep your existing JsonBodyModal and DetailsModal components (unchanged) */
function JsonBodyModal({ ...props }: any) {
  // ... your existing JsonBodyModal code
  const [text, setText] = useState(JSON.stringify(props.initialBody, null, 2));
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    try {
      const parsed = JSON.parse(text);
      setError(null);
      props.onSubmit(parsed);
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <ModalShell
      title={props.title}
      subtitle={props.subtitle}
      loading={props.loading}
      onClose={props.onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Request Body (JSON)
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full min-h-[220px] px-3 py-2 text-[12px] border rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300 ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
          />
          {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={props.onClose}
            disabled={props.loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={props.loading}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5"
          >
            {props.loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            Submit
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function DetailsModal({
  id,
  open,
  onClose,
}: {
  id: number | string;
  open: boolean;
  onClose: () => void;
}) {
  const [trigger, { data, isFetching, isError }] =
    useLazyAdminEnrollmentQuery();

  React.useEffect(() => {
    if (open) trigger(id);
  }, [id, open, trigger]);

  return (
    <ModalShell
      title="Enrollment Details"
      subtitle="GET /enrollments/:id"
      loading={isFetching}
      onClose={onClose}
    >
      {isFetching ? (
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : isError ? (
        <div className="text-red-600 font-semibold py-4">
          Failed to load details
        </div>
      ) : (
        <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-auto max-h-[520px] whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </ModalShell>
  );
}

export default function AdminEnrollmentsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const list = useAdminEnrollmentsQuery({
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const enrollments = useMemo(() => {
    const items = extractEnrollments(list.data);
    return items
      .map(normalizeEnrollment)
      .filter((x): x is UiEnrollment => Boolean(x));
  }, [list.data]);

  const totalFromApi = extractTotal(list.data);
  const totalPages = Math.max(
    1,
    totalFromApi ? Math.ceil(totalFromApi / PAGE_SIZE) : 1,
  );
const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [bkashBody, setBkashBody] = useState<
    { courseId: number | string | null; studentId: number | string | null } | null
  >(null);
  const [manualBody, setManualBody] = useState<
    { courseId: number | string | null; studentId: number | string | null } | null
  >(null);
  const [payBkash, { isLoading: isPayingBkash }] =
    useAdminEnrollmentsPayBkashPaymentMutation();
  const [manualPayment, { isLoading: isManualPaying }] =
    useAdminEnrollmentsManualPaymentMutation();

  return (
    <>
      {detailsId !== null && (
        <DetailsModal id={detailsId} open onClose={() => setDetailsId(null)} />
      )}
      {bkashBody !== null && (
        <JsonBodyModal
          title="Pay (Bkash)"
          subtitle="POST /enrollments/pay"
          loading={isPayingBkash}
          initialBody={{
            courseId: bkashBody.courseId,
            studentId: bkashBody.studentId,
          }}
          onClose={() => setBkashBody(null)}
          onSubmit={async (body) => {
            const payload: any = { ...body };
            delete payload.enrollmentId;
            if (payload.courseId !== undefined && payload.courseId !== null) {
              payload.courseId = Number(payload.courseId);
            }
            if (payload.studentId !== undefined && payload.studentId !== null) {
              payload.studentId = Number(payload.studentId);
            }
            await payBkash(payload).unwrap();
            setBkashBody(null);
            list.refetch();
          }}
        />
      )}
      {manualBody !== null && (
        <JsonBodyModal
          title="Manual Payment"
          subtitle="POST /enrollments/manual"
          loading={isManualPaying}
          initialBody={{
            courseId: manualBody.courseId,
            studentId: manualBody.studentId,
          }}
          onClose={() => setManualBody(null)}
          onSubmit={async (body) => {
            const payload: any = { ...body };
            delete payload.enrollmentId;
            if (payload.courseId !== undefined && payload.courseId !== null) {
              payload.courseId = Number(payload.courseId);
            }
            if (payload.studentId !== undefined && payload.studentId !== null) {
              payload.studentId = Number(payload.studentId);
            }
            await manualPayment(payload).unwrap();
            setManualBody(null);
            list.refetch();
          }}
        />
      )}
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              Enrollments
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              GET /enrollments · GET /enrollments/:id · POST
              /enrollments/pay · POST /enrollments/manual
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search student or course..."
                className="w-[280px] h-10 pl-10 pr-3 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <button
              onClick={() => list.refetch()}
              className="h-10 px-4 rounded-xl bg-white border border-gray-200 text-[13px] font-bold text-gray-700 hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    "Student",
                    "Course",
                    "Amount",
                    "Status",
                    "Payment",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[11px] font-extrabold tracking-widest uppercase text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : list.isError ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-red-600"
                    >
                      Failed to load enrollments
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      No enrollments found
                    </td>
                  </tr>
                ) : (
                  enrollments.map((e) => (
                    <tr
                      key={String(e.id)}
                      className="border-b border-gray-100 hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-4">
                        <p className="font-bold text-gray-900">{e.student}</p>
                        <p className="text-[11px] text-gray-500">
                          {e.studentEmail}
                        </p>
                        <p className="text-[11px] text-gray-400">ID: {e.id}</p>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {e.course}
                      </td>
                      <td className="px-4 py-4 font-extrabold text-gray-900">
                        ৳{e.amount}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${e.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="font-semibold">{e.paymentMethod}</p>
                          {e.transactionId && (
                            <p className="text-[11px] text-gray-500">
                              TRX: {e.transactionId}
                            </p>
                          )}
                          {e.isManual && (
                            <span className="text-[10px] text-purple-600 font-bold">
                              MANUAL
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[12px] text-gray-600">
                        {e.createdAt}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setDetailsId(e.id)}
                            className="h-9 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold flex items-center gap-1"
                          >
                            <Eye size={14} /> Details
                          </button>

                          <button
                            onClick={() => setBkashBody({ courseId: e.courseId, studentId: e.studentId })}
                            className="h-9 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <Wallet size={14} /> Bkash
                          </button>

                          <button
                            onClick={() => setManualBody({ courseId: e.courseId, studentId: e.studentId })}
                            className="h-9 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <Wallet size={14} /> Manual
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-medium">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 px-4 rounded-xl border flex items-center gap-1 disabled:opacity-50"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 px-4 rounded-xl border flex items-center gap-1 disabled:opacity-50"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
