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
import type { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/share/Table-Share";
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
    studentObj?.id ?? studentObj?._id ?? raw?.studentId ?? raw?.userId ?? null;

  const courseId = raw?.course?.id ?? raw?.course?._id ?? raw?.courseId ?? null;

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

function modalIconForTitle(title: string) {
  const t = title.toLowerCase();
  if (t.includes("details")) return Eye;
  if (t.includes("pay") || t.includes("payment")) return Wallet;
  return AlertTriangle;
}

function ModalShell({ title, subtitle, loading, onClose, children }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {(() => {
              const Icon = modalIconForTitle(String(title));
              return (
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
              );
            })()}

            <div className="min-w-0">
              <h2 className="text-[15px] sm:text-[16px] font-extrabold text-gray-900 tracking-tight leading-none truncate">
                {title}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1 font-medium truncate">
                {subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors disabled:opacity-60"
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
  const [courseId, setCourseId] = useState(
    props.initialBody?.courseId !== undefined &&
      props.initialBody?.courseId !== null
      ? String(props.initialBody.courseId)
      : "",
  );
  const [studentId, setStudentId] = useState(
    props.initialBody?.studentId !== undefined &&
      props.initialBody?.studentId !== null
      ? String(props.initialBody.studentId)
      : "",
  );
  const [error, setError] = useState<null | {
    courseId?: string;
    studentId?: string;
  }>(null);

  const submit = () => {
    const nextError: { courseId?: string; studentId?: string } = {};

    if (!courseId.trim()) nextError.courseId = "Course ID is required";
    if (!studentId.trim()) nextError.studentId = "Student ID is required";

    const courseIdNum = Number(courseId);
    const studentIdNum = Number(studentId);

    if (
      courseId.trim() &&
      (!Number.isFinite(courseIdNum) || courseIdNum <= 0)
    ) {
      nextError.courseId = "Course ID must be a valid number";
    }

    if (
      studentId.trim() &&
      (!Number.isFinite(studentIdNum) || studentIdNum <= 0)
    ) {
      nextError.studentId = "Student ID must be a valid number";
    }

    if (Object.keys(nextError).length) {
      setError(nextError);
      return;
    }

    setError(null);
    props.onSubmit({ courseId: courseIdNum, studentId: studentIdNum });
  };

  return (
    <ModalShell
      title={props.title}
      subtitle={props.subtitle}
      loading={props.loading}
      onClose={props.onClose}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Course ID
            </label>
            <input
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              inputMode="numeric"
              placeholder="e.g. 12"
              disabled={props.loading}
              className={`w-full h-11 px-3 rounded-xl border bg-white text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300 ${error?.courseId ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {error?.courseId ? (
              <p className="text-[10px] text-red-500 mt-1">{error.courseId}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Student ID
            </label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              inputMode="numeric"
              placeholder="e.g. 45"
              disabled={props.loading}
              className={`w-full h-11 px-3 rounded-xl border bg-white text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300 ${error?.studentId ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {error?.studentId ? (
              <p className="text-[10px] text-red-500 mt-1">{error.studentId}</p>
            ) : null}
          </div>
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

  const details = useMemo(() => {
    const root = (data as any)?.data ?? data;
    const payload = (root as any)?.data ?? root;

    const enrollment = payload ?? {};
    const student = (payload as any)?.student ?? (payload as any)?.user ?? {};
    const course = (payload as any)?.course ?? {};

    const enrollmentId =
      (enrollment as any)?.id ?? (enrollment as any)?._id ?? id;

    const status = String(
      (enrollment as any)?.status ??
        (enrollment as any)?.paymentStatus ??
        ((enrollment as any)?.isPaid ? "paid" : "pending"),
    );

    const amountRaw =
      (enrollment as any)?.amount ??
      (enrollment as any)?.price ??
      (enrollment as any)?.total ??
      (enrollment as any)?.payment?.amount ??
      null;
    const amount =
      amountRaw !== null && amountRaw !== undefined ? String(amountRaw) : "?";

    const paymentMethod = String((enrollment as any)?.paymentMethod ?? "?");
    const transactionId =
      (enrollment as any)?.transactionId ??
      (enrollment as any)?.payment?.transactionId ??
      null;
    const isManual = Boolean((enrollment as any)?.isManual ?? false);

    const studentName = String(student?.name ?? student?.email ?? "?");
    const studentEmail = String(student?.email ?? "?");
    const studentPhone = student?.phone ? String(student.phone) : "?";
    const studentCountry = student?.country ? String(student.country) : "?";

    const courseTitle = String(course?.title ?? course?.name ?? "?");
    const coursePrice = course?.price ?? course?.amount ?? null;
    const courseSlug = course?.slug ? String(course.slug) : "?";

    const createdAt = formatDate((enrollment as any)?.createdAt);
    const enrolledAt = formatDate((enrollment as any)?.enrolledAt);

    return {
      enrollmentId,
      status,
      amount,
      paymentMethod,
      transactionId: transactionId ? String(transactionId) : "?",
      isManual,
      createdAt,
      enrolledAt,
      studentName,
      studentEmail,
      studentPhone,
      studentCountry,
      courseTitle,
      coursePrice:
        coursePrice !== null && coursePrice !== undefined
          ? String(coursePrice)
          : "?",
      courseSlug,
    };
  }, [data, id]);

  const statusLower = details.status.toLowerCase();
  const paid = ["paid", "active", "completed", "success"].some((k) =>
    statusLower.includes(k),
  );

  const failed = ["failed", "cancel", "canceled", "rejected", "error"].some(
    (k) => statusLower.includes(k),
  );

  const pending = ["pending", "unpaid", "due"].some((k) =>
    statusLower.includes(k),
  );

  return (
    <ModalShell
      title="Enrollment Details"
      subtitle={`GET /enrollments/${id}`}
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
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400 font-semibold">
                Enrollment
              </p>
              <p className="text-[15px] font-extrabold text-gray-900 truncate">
                #{details.enrollmentId}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${paid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
              >
                {details.status}
              </span>
              {details.isManual ? (
                <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700">
                  Manual
                </span>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
              <p className="text-[11px] font-extrabold tracking-widest uppercase text-gray-500 mb-3">
                Student
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-gray-500 font-semibold">
                    Name
                  </span>
                  <span className="text-[12px] text-gray-900 font-bold truncate max-w-[60%]">
                    {details.studentName}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-gray-500 font-semibold">
                    Email
                  </span>
                  <span className="text-[12px] text-gray-900 font-semibold truncate max-w-[60%]">
                    {details.studentEmail}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-gray-500 font-semibold">
                    Phone
                  </span>
                  <span className="text-[12px] text-gray-900 font-semibold truncate max-w-[60%]">
                    {details.studentPhone}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-gray-500 font-semibold">
                    Country
                  </span>
                  <span className="text-[12px] text-gray-900 font-semibold truncate max-w-[60%]">
                    {details.studentCountry}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
              <p className="text-[11px] font-extrabold tracking-widest uppercase text-gray-500 mb-3">
                Course
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-gray-500 font-semibold">
                    Title
                  </span>
                  <span className="text-[12px] text-gray-900 font-bold truncate max-w-[60%]">
                    {details.courseTitle}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-gray-500 font-semibold">
                    Slug
                  </span>
                  <span className="text-[12px] text-gray-900 font-semibold truncate max-w-[60%]">
                    {details.courseSlug}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] text-gray-500 font-semibold">
                    Price
                  </span>
                  <span className="text-[12px] text-gray-900 font-semibold whitespace-nowrap">
                    {"\u09F3"}
                    {details.coursePrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-[11px] font-extrabold tracking-widest uppercase text-gray-500 mb-3">
              Payment
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-gray-500 font-semibold">
                  Amount
                </span>
                <span
                  className={`text-[12px] font-extrabold whitespace-nowrap ${paid ? "text-emerald-700" : failed ? "text-red-600" : pending ? "text-amber-700" : "text-gray-900"}`}
                >
                  {"\u09F3"}
                  {details.amount}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-gray-500 font-semibold">
                  Method
                </span>
                <span
                  className={`text-[12px] font-semibold whitespace-nowrap ${paid ? "text-emerald-700" : failed ? "text-red-600" : pending ? "text-amber-700" : "text-gray-900"}`}
                >
                  {details.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-gray-500 font-semibold">
                  TRX
                </span>
                <span className="text-[12px] text-gray-900 font-semibold truncate max-w-[60%]">
                  {details.transactionId}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-gray-500 font-semibold">
                  Created
                </span>
                <span className="text-[12px] text-gray-900 font-semibold whitespace-nowrap">
                  {details.createdAt}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-gray-500 font-semibold">
                  Enrolled
                </span>
                <span className="text-[12px] text-gray-900 font-semibold whitespace-nowrap">
                  {details.enrolledAt}
                </span>
              </div>
            </div>
          </div>
        </div>
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
  const [bkashBody, setBkashBody] = useState<{
    courseId: number | string | null;
    studentId: number | string | null;
  } | null>(null);
  const [manualBody, setManualBody] = useState<{
    courseId: number | string | null;
    studentId: number | string | null;
  } | null>(null);
  const [payBkash, { isLoading: isPayingBkash }] =
    useAdminEnrollmentsPayBkashPaymentMutation();
  const [manualPayment, { isLoading: isManualPaying }] =
    useAdminEnrollmentsManualPaymentMutation();

  const columns = useMemo<ColumnDef<UiEnrollment, unknown>[]>(
    () => [
      {
        accessorKey: "student",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Student" />
        ),
        cell: ({ row }) => {
          const e = row.original;
          return (
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-gray-900 whitespace-nowrap">
                {e.student}
              </p>
              <p className="text-[11px] text-gray-400 truncate max-w-[220px]">
                {e.studentEmail}
              </p>
              <p className="text-[11px] text-gray-300 whitespace-nowrap">
                ID: {e.id}
              </p>
            </div>
          );
        },
        enableHiding: false,
      },
      {
        accessorKey: "course",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Course" />
        ),
        cell: ({ row }) => (
          <span className="font-medium text-gray-800">
            {row.original.course}
          </span>
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
          <span className="font-extrabold text-gray-900 whitespace-nowrap">
            ৳{row.original.amount}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const paid = status === "completed";
          return (
            <span
              className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${paid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "paymentMethod",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Payment" />
        ),
        cell: ({ row }) => {
          const e = row.original;
          return (
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 whitespace-nowrap">
                {e.paymentMethod}
              </p>
              {e.transactionId ? (
                <p className="text-[11px] text-gray-500 whitespace-nowrap">
                  TRX: {e.transactionId}
                </p>
              ) : null}
              {e.isManual ? (
                <span className="text-[10px] text-purple-600 font-bold whitespace-nowrap">
                  MANUAL
                </span>
              ) : null}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => (
          <span className="text-[12px] text-gray-500 whitespace-nowrap">
            {row.original.createdAt}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
          const e = row.original;
          return (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDetailsId(e.id)}
                className="h-9 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold flex items-center gap-1"
              >
                <Eye size={14} /> Details
              </button>

              <button
                onClick={() =>
                  setBkashBody({ courseId: e.courseId, studentId: e.studentId })
                }
                className="h-9 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <Wallet size={14} /> Bkash
              </button>

              <button
                onClick={() =>
                  setManualBody({
                    courseId: e.courseId,
                    studentId: e.studentId,
                  })
                }
                className="h-9 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <Wallet size={14} /> Manual
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

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
          onSubmit={async (body: Record<string, unknown>) => {
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
          onSubmit={async (body: Record<string, unknown>) => {
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
      <div className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <Wallet size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[17px] sm:text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">
                Enrollments
              </h1>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 font-medium truncate hidden sm:block">
                Manage enrollments and payments.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search student or course..."
                className="w-full sm:w-[320px] h-10 pl-10 pr-3 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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

        {list.isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="py-16 text-center">
              <div className="flex items-center justify-center gap-2 text-[13px] text-gray-400 font-semibold">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />{" "}
                Loading enrollments...
              </div>
            </div>
          </div>
        ) : list.isError ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="py-16 text-center text-[13px] text-red-500 font-semibold">
              Failed to load enrollments
            </div>
          </div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={enrollments}
              showFooter={false}
              pageSize={PAGE_SIZE}
            />

            <div className="mt-3 flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
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
          </>
        )}
      </div>
    </>
  );
}
