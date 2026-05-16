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
  user: string;
  course: string;
  amount: string;
  status: string;
  createdAt: string;
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
  if (Array.isArray(payload?.data?.data?.enrollments))
    return payload.data.data.enrollments;
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
  const id = raw?.id ?? raw?._id ?? raw?.enrollmentId ?? null;
  if (!id) return null;

  const user =
    String(
      raw?.user?.name ?? raw?.user?.email ?? raw?.userName ?? raw?.email ?? "",
    ).trim() || "—";

  const course =
    String(
      raw?.course?.title ??
        raw?.course?.name ??
        raw?.courseTitle ??
        raw?.title ??
        "",
    ).trim() || "—";

  const amountRaw =
    raw?.amount ??
    raw?.price ??
    raw?.total ??
    raw?.payment?.amount ??
    raw?.paymentAmount ??
    null;

  const amount =
    amountRaw === null || amountRaw === undefined || amountRaw === ""
      ? "—"
      : String(amountRaw);

  const status =
    String(
      raw?.status ??
        raw?.paymentStatus ??
        raw?.state ??
        (raw?.isPaid ? "paid" : undefined) ??
        "",
    ).trim() || "—";

  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);

  return { id, user, course, amount, status, createdAt };
}

function ModalShell({
  title,
  subtitle,
  loading,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  loading?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
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
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function JsonBodyModal({
  title,
  subtitle,
  loading,
  initialBody,
  onClose,
  onSubmit,
}: {
  title: string;
  subtitle: string;
  loading: boolean;
  initialBody: Record<string, any>;
  onClose: () => void;
  onSubmit: (body: Record<string, any>) => void;
}) {
  const [text, setText] = useState(JSON.stringify(initialBody, null, 2));
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    try {
      const parsed = JSON.parse(text);
      setError(null);
      onSubmit(parsed);
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <ModalShell
      title={title}
      subtitle={subtitle}
      loading={loading}
      onClose={onClose}
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
          {error ? (
            <p className="text-[10px] text-red-500 mt-1">{error}</p>
          ) : null}
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
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
    if (!open) return;
    trigger(id);
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
        <div className="text-[12px] text-red-600 font-semibold py-4">
          Failed to load details
        </div>
      ) : (
        <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[520px]">
          {JSON.stringify(data ?? null, null, 2)}
        </pre>
      )}
    </ModalShell>
  );
}

export default function AdminEnrollmentsPage(): React.JSX.Element {
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
  const [bkashId, setBkashId] = useState<number | string | null>(null);
  const [manualId, setManualId] = useState<number | string | null>(null);

  const [payBkash, { isLoading: isPayingBkash }] =
    useAdminEnrollmentsPayBkashPaymentMutation();
  const [manualPayment, { isLoading: isManualPaying }] =
    useAdminEnrollmentsManualPaymentMutation();

  return (
    <>
      {detailsId !== null ? (
        <DetailsModal
          id={detailsId}
          open={detailsId !== null}
          onClose={() => setDetailsId(null)}
        />
      ) : null}

      {bkashId !== null ? (
        <JsonBodyModal
          title="Pay (Bkash)"
          subtitle="POST /enrollments/pay"
          loading={isPayingBkash}
          initialBody={{ enrollmentId: bkashId }}
          onClose={() => setBkashId(null)}
          onSubmit={async (body) => {
            await payBkash(body).unwrap();
            setBkashId(null);
          }}
        />
      ) : null}

      {manualId !== null ? (
        <JsonBodyModal
          title="Manual Payment"
          subtitle="POST /enrollments/manual"
          loading={isManualPaying}
          initialBody={{ enrollmentId: manualId }}
          onClose={() => setManualId(null)}
          onSubmit={async (body) => {
            await manualPayment(body).unwrap();
            setManualId(null);
          }}
        />
      ) : null}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              Enrollments
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              GET /enrollments · GET /enrollments/:id · POST
              /enrollments/pay-bkash-payment · POST /enrollments/manual-payment
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
                placeholder="Search user/course..."
                className="w-[260px] max-w-full h-10 pl-10 pr-3 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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
                    "User",
                    "Course",
                    "Amount",
                    "Status",
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
                    <td colSpan={6} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                      </div>
                    </td>
                  </tr>
                ) : list.isError ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-red-600 font-semibold">
                        <AlertTriangle className="h-4 w-4" /> Failed to load
                        enrollments
                      </div>
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10">
                      <div className="text-center text-[12px] text-gray-500 font-semibold">
                        No enrollments found
                      </div>
                    </td>
                  </tr>
                ) : (
                  enrollments.map((e) => (
                    <tr
                      key={String(e.id)}
                      className="border-b border-gray-100 hover:bg-gray-50/40"
                    >
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-bold text-gray-900">
                          {e.user}
                        </p>
                        <p className="text-[11px] text-gray-400 font-semibold">
                          ID: {String(e.id)}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-semibold text-gray-800">
                          {e.course}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-extrabold text-gray-900">
                          {e.amount}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700">
                          {e.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[12px] text-gray-600 font-semibold">
                          {e.createdAt}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailsId(e.id)}
                            className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
                          >
                            <Eye size={14} /> Details
                          </button>

                          <button
                            onClick={() => setBkashId(e.id)}
                            className="h-9 px-3 rounded-xl bg-emerald-600 text-white text-[12px] font-extrabold hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm"
                          >
                            <Wallet size={14} /> Bkash
                          </button>

                          <button
                            onClick={() => setManualId(e.id)}
                            className="h-9 px-3 rounded-xl bg-indigo-600 text-white text-[12px] font-extrabold hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
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

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-white">
            <p className="text-[12px] text-gray-500 font-semibold">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 px-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-[12px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1"
              >
                <ChevronLeft size={15} /> Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 px-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-[12px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
