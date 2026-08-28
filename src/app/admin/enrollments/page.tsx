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
  User,
  BookOpen,
  Calendar,
  RefreshCw,
  GraduationCap,
  Mail,
  Hash,
  CreditCard,
  Clock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAdminEnrollmentsManualPaymentMutation,
  useAdminEnrollmentsPayBkashPaymentMutation,
  useAdminEnrollmentsQuery,
  useLazyAdminEnrollmentQuery,
} from "@/lib/api/admin/enrollments";
import { useAdminCoursesQuery } from "@/lib/api/admin/course";
import { useAdminUsersQuery } from "@/lib/api/admin/user";

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

// ── UI helpers ───────────────────────────────────────────────────────────
const AVATAR_STYLES = [
  "bg-gradient-to-br from-indigo-500 to-violet-500",
  "bg-gradient-to-br from-violet-500 to-purple-500",
  "bg-gradient-to-br from-blue-500 to-indigo-500",
  "bg-gradient-to-br from-fuchsia-500 to-pink-500",
  "bg-gradient-to-br from-purple-500 to-indigo-600",
  "bg-gradient-to-br from-cyan-500 to-blue-500",
];

function getInitials(name: string) {
  const trimmed = (name || "").trim();
  if (!trimmed || trimmed === "—") return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarStyle(seed: string) {
  const str = String(seed || "x");
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
  return AVATAR_STYLES[sum % AVATAR_STYLES.length];
}

function getStatusMeta(status: string) {
  const s = (status || "").toLowerCase();
  if (s === "completed" || s === "paid" || s === "success") {
    return {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    };
  }
  if (
    s === "failed" ||
    s === "cancelled" ||
    s === "canceled" ||
    s === "rejected" ||
    s === "declined"
  ) {
    return {
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
    };
  }
  return {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  };
}

function parseAmount(amount: string): number {
  const n = Number(String(amount).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

// ── Modal Shell ──────────────────────────────────────────────────────────
function ModalShell({ title, subtitle, loading, onClose, children }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-200/60 overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600" />
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-b from-slate-50/60 to-white">
          <div>
            <h2 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              {subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors disabled:opacity-60"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

// ── JSON Body Modal ──────────────────────────────────────────────────────
function JsonBodyModal({ ...props }: any) {
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
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Request Body (JSON)
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            className={`w-full min-h-[220px] px-4 py-3 text-[12px] leading-relaxed border rounded-2xl font-mono bg-slate-950 text-emerald-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 ${
              error ? "border-rose-400 ring-2 ring-rose-300/60" : "border-slate-800"
            }`}
          />
          {error && (
            <p className="flex items-center gap-1.5 text-[11px] text-rose-600 font-semibold mt-2">
              <AlertTriangle size={12} /> {error}
            </p>
          )}
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={props.onClose}
            disabled={props.loading}
            className="flex-1 py-2.5 rounded-2xl border-2 border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={props.loading}
            className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all disabled:opacity-60"
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

// ── Manual Enroll Modal ──────────────────────────────────────────────────
function ManualEnrollModal({
  title,
  subtitle,
  loading,
  onClose,
  onSubmit,
  initialBody,
}: any) {
  const [courseId, setCourseId] = useState(initialBody?.courseId || "");
  const [studentId, setStudentId] = useState(initialBody?.studentId || "");
  const [amount, setAmount] = useState(initialBody?.amount || "");
  const [paymentMethod, setPaymentMethod] = useState(
    initialBody?.paymentMethod || "cash",
  );

  const coursesQuery = useAdminCoursesQuery({ limit: 1000 });
  const usersQuery = useAdminUsersQuery();

  const extractArr = (payload: any) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.data?.items)) return payload.data.items;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.users)) return payload.users;
    if (Array.isArray(payload?.courses)) return payload.courses;
    return [];
  };

  const courses = extractArr(coursesQuery.data);
  const users = extractArr(usersQuery.data);

  const submit = () => {
    onSubmit({
      courseId: courseId,
      studentId: studentId,
      amount: amount,
      paymentMethod: paymentMethod,
    });
  };

  const fieldLabel =
    "flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5";
  const fieldClass =
    "w-full px-3.5 py-2.5 text-[13px] font-medium border border-slate-200 rounded-2xl bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white focus:border-indigo-300 disabled:opacity-50 transition-colors";

  return (
    <ModalShell
      title={title}
      subtitle={subtitle}
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className={fieldLabel}>
            <BookOpen size={12} /> Select Course
          </label>
          <select
            value={courseId}
            onChange={(e) => {
              setCourseId(e.target.value);
              const selectedCourse = courses.find(
                (c: any) => String(c.id || c._id) === String(e.target.value),
              );
              if (selectedCourse && !amount) {
                setAmount(
                  selectedCourse.discountPrice || selectedCourse.price || "",
                );
              }
            }}
            disabled={coursesQuery.isLoading}
            className={fieldClass}
          >
            <option value="">Select a course...</option>
            {courses.map((c: any) => (
              <option key={c.id || c._id} value={c.id || c._id}>
                {c.title || c.name || `Course #${c.id || c._id}`}
              </option>
            ))}
          </select>
          {coursesQuery.isLoading && (
            <p className="text-[10px] text-slate-400 font-semibold mt-1.5">
              Loading courses...
            </p>
          )}
        </div>
        <div>
          <label className={fieldLabel}>
            <User size={12} /> Select Student
          </label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            disabled={usersQuery.isLoading}
            className={fieldClass}
          >
            <option value="">Select a student...</option>
            {users.map((u: any) => (
              <option key={u.id || u._id} value={u.id || u._id}>
                {u.name || u.email || `User #${u.id || u._id}`} ({u.email})
              </option>
            ))}
          </select>
          {usersQuery.isLoading && (
            <p className="text-[10px] text-slate-400 font-semibold mt-1.5">
              Loading users...
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={fieldLabel}>
              <Wallet size={12} /> Amount (৳)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={fieldClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={fieldLabel}>
              <CreditCard size={12} /> Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={fieldClass}
            >
              <option value="cash">Cash</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="bank">Bank Transfer</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-2xl border-2 border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all disabled:opacity-60"
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

// ── Details Modal ────────────────────────────────────────────────────────
function DetailRow({ icon: Icon, label, value, mono }: any) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={14} className="text-slate-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p
          className={`text-[13px] font-semibold text-slate-800 break-words ${mono ? "font-mono" : ""}`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
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

  const raw = data?.data?.enrollment || data?.enrollment || data?.data || data;
  const enr = React.useMemo(() => normalizeEnrollment(raw), [raw]);

  return (
    <ModalShell
      title="Enrollment Details"
      subtitle={`GET /enrollments/${id}`}
      loading={isFetching}
      onClose={onClose}
    >
      {isFetching ? (
        <div className="flex flex-col items-center justify-center gap-2 text-[12px] text-slate-500 font-semibold py-16">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          Loading details...
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-2 text-rose-600 font-semibold py-16">
          <AlertTriangle className="h-5 w-5" />
          Failed to load details
        </div>
      ) : !enr ? (
        <pre className="text-[11px] text-emerald-300 bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-auto max-h-[520px] whitespace-pre-wrap font-mono">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Status + Amount summary */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                Status
              </p>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-extrabold uppercase tracking-wider ${getStatusMeta(enr.status).badge}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${getStatusMeta(enr.status).dot}`}
                />
                {enr.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                Amount
              </p>
              <p className="text-xl font-black text-slate-900 tabular-nums">
                ৳{enr.amount}
              </p>
            </div>
          </div>

          {/* Student */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-[13px] font-extrabold flex-shrink-0 ${getAvatarStyle(enr.student)}`}
              >
                {getInitials(enr.student)}
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-extrabold text-slate-900 truncate">
                  {enr.student}
                </p>
                <p className="text-[11px] text-slate-400">Student</p>
              </div>
            </div>
            <div className="pl-1 divide-y divide-slate-100">
              <DetailRow icon={Mail} label="Email" value={enr.studentEmail} />
              <DetailRow icon={Hash} label="Student ID" value={enr.studentId} mono />
            </div>
          </div>

          {/* Course */}
          <div className="pt-1 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pt-3">
              Course
            </p>
            <div className="divide-y divide-slate-100">
              <DetailRow icon={BookOpen} label="Title" value={enr.course} />
              <DetailRow icon={Hash} label="Course ID" value={enr.courseId} mono />
            </div>
          </div>

          {/* Payment */}
          <div className="pt-1 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pt-3">
              Payment
            </p>
            <div className="divide-y divide-slate-100">
              <DetailRow
                icon={CreditCard}
                label="Method"
                value={
                  <span className="inline-flex items-center gap-2">
                    {enr.paymentMethod}
                    {enr.isManual && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[9px] font-black uppercase tracking-wider">
                        Manual
                      </span>
                    )}
                  </span>
                }
              />
              {enr.transactionId && (
                <DetailRow
                  icon={Hash}
                  label="Transaction ID"
                  value={enr.transactionId}
                  mono
                />
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="pt-1 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pt-3">
              Timeline
            </p>
            <div className="divide-y divide-slate-100">
              <DetailRow icon={Calendar} label="Created At" value={enr.createdAt} />
              <DetailRow icon={Clock} label="Enrolled At" value={enr.enrolledAt} />
            </div>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
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

  const pageStats = useMemo(() => {
    const paid = enrollments.filter((e) => {
      const s = e.status.toLowerCase();
      return s === "completed" || s === "paid" || s === "success";
    }).length;
    const total = enrollments.reduce((sum, e) => sum + parseAmount(e.amount), 0);
    return { paid, pending: enrollments.length - paid, total };
  }, [enrollments]);

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

  return (
    <>
      {/* Modals (logic unchanged) */}
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
          onSubmit={async (body: any) => {
            const payload: any = { ...body };
            delete payload.enrollmentId;
            if (payload.courseId !== undefined && payload.courseId !== null)
              payload.courseId = Number(payload.courseId);
            if (payload.studentId !== undefined && payload.studentId !== null)
              payload.studentId = Number(payload.studentId);
            await payBkash(payload).unwrap();
            setBkashBody(null);
            list.refetch();
          }}
        />
      )}
      {manualBody !== null && (
        <ManualEnrollModal
          title="Manual Payment"
          subtitle="POST /enrollments/manual"
          loading={isManualPaying}
          initialBody={{
            courseId: manualBody.courseId,
            studentId: manualBody.studentId,
          }}
          onClose={() => setManualBody(null)}
          onSubmit={async (body: any) => {
            const payload: any = { ...body };
            delete payload.enrollmentId;
            if (
              payload.courseId !== undefined &&
              payload.courseId !== null &&
              payload.courseId !== ""
            )
              payload.courseId = Number(payload.courseId);
            else delete payload.courseId;
            if (
              payload.studentId !== undefined &&
              payload.studentId !== null &&
              payload.studentId !== ""
            )
              payload.studentId = Number(payload.studentId);
            else delete payload.studentId;
            if (
              payload.amount !== undefined &&
              payload.amount !== null &&
              payload.amount !== ""
            )
              payload.amount = Number(payload.amount);
            if (!payload.paymentMethod) payload.paymentMethod = "cash";
            await manualPayment(payload).unwrap();
            setManualBody(null);
            list.refetch();
          }}
        />
      )}

      <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 sm:p-8 shadow-xl shadow-indigo-200/60 mb-5">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-purple-400/20 blur-3xl" />
            </div>

            <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-indigo-600 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-white">
                    Enrollments
                  </h1>
                  <p className="text-sm text-white/70 font-medium mt-1">
                    Manage student enrollments and course access.
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search student or course..."
                    className="w-full sm:w-[280px] h-11 pl-10 pr-4 rounded-2xl border border-white/20 bg-white/95 backdrop-blur-sm text-[13px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/60 shadow-sm"
                  />
                </div>
                <button
                  onClick={() => list.refetch()}
                  className="h-11 px-4 rounded-2xl bg-white/10 border border-white/20 text-[13px] font-semibold text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <RefreshCw size={15} className={list.isFetching ? "animate-spin" : ""} />
                  Refresh
                </button>
                <button
                  onClick={() => setManualBody({ courseId: "", studentId: "" })}
                  className="h-11 px-5 rounded-2xl bg-white text-[13px] font-bold text-indigo-700 hover:bg-white/90 shadow-lg shadow-black/10 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <Wallet size={16} />
                  Manual Enroll
                </button>
              </div>
            </div>
          </div>

          {/* Stats strip (derived from the current page) */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3.5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-lg font-black text-slate-900 leading-none tabular-nums">
                  {pageStats.paid}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 truncate">
                  Paid · this page
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3.5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-lg font-black text-slate-900 leading-none tabular-nums">
                  {pageStats.pending}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 truncate">
                  Pending · this page
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Wallet size={14} className="text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-black text-slate-900 leading-none tabular-nums truncate">
                  ৳{pageStats.total.toLocaleString()}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 truncate">
                  Total · this page
                </p>
              </div>
            </div>
          </div>

          {/* ── TABLE for md+ ── */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-slate-200 bg-slate-50/80">
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Student
                  </TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Course
                  </TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Amount
                  </TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Status
                  </TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Payment
                  </TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Created
                  </TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-indigo-600" />
                    </TableCell>
                  </TableRow>
                ) : list.isError ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-rose-600 font-bold">
                        <AlertTriangle size={20} />
                        Failed to load enrollments
                      </div>
                    </TableCell>
                  </TableRow>
                ) : enrollments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <GraduationCap size={22} />
                        <span className="font-semibold">No enrollments found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  enrollments.map((e) => {
                    const meta = getStatusMeta(e.status);
                    return (
                      <TableRow
                        key={String(e.id)}
                        className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-extrabold flex-shrink-0 ${getAvatarStyle(e.student)}`}
                            >
                              {getInitials(e.student)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate">
                                {e.student}
                              </p>
                              <p className="text-xs text-slate-500 font-medium truncate">
                                {e.studentEmail}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold">
                                ID: {e.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-slate-800">
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen size={13} className="text-slate-400" />
                            {e.course}
                          </span>
                        </TableCell>
                        <TableCell className="font-extrabold text-slate-900 tabular-nums">
                          ৳{e.amount}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${meta.badge}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                            {e.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold text-slate-800">{e.paymentMethod}</p>
                          {e.transactionId && (
                            <p className="text-xs text-slate-500 font-mono">
                              TRX: {e.transactionId}
                            </p>
                          )}
                          {e.isManual && (
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[9px] font-black tracking-wider uppercase">
                              Manual
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-slate-500 font-medium">
                          {e.createdAt}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => setDetailsId(e.id)}
                            className="h-9 px-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/60 text-xs font-bold text-slate-700 hover:text-indigo-700 flex items-center gap-1.5 transition-all active:scale-[0.97]"
                          >
                            <Eye size={14} /> Details
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* ── MOBILE CARDS ── */}
          <div className="md:hidden space-y-3">
            {list.isLoading ? (
              <div className="flex justify-center py-14">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
              </div>
            ) : list.isError ? (
              <div className="flex flex-col items-center gap-2 py-14 text-rose-600 font-bold">
                <AlertTriangle size={20} />
                Failed to load enrollments
              </div>
            ) : enrollments.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-14 text-slate-400">
                <GraduationCap size={22} />
                <span className="font-semibold">No enrollments found</span>
              </div>
            ) : (
              enrollments.map((e) => {
                const meta = getStatusMeta(e.status);
                return (
                  <div
                    key={String(e.id)}
                    className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-[12px] font-extrabold flex-shrink-0 ${getAvatarStyle(e.student)}`}
                        >
                          {getInitials(e.student)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 truncate">
                            {e.student}
                          </h3>
                          <p className="text-[12px] text-slate-500 truncate">
                            {e.studentEmail}
                          </p>
                          <p className="text-[11px] text-slate-400">ID: {e.id}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase flex-shrink-0 ${meta.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                        {e.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">
                          Course
                        </p>
                        <p className="font-semibold text-slate-800 truncate">{e.course}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">
                          Amount
                        </p>
                        <p className="font-extrabold text-slate-900 tabular-nums">
                          ৳{e.amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">
                          Payment
                        </p>
                        <p className="font-semibold text-slate-800">{e.paymentMethod}</p>
                        {e.transactionId && (
                          <p className="text-[11px] text-slate-500 font-mono">
                            TRX: {e.transactionId}
                          </p>
                        )}
                        {e.isManual && (
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[9px] font-black uppercase">
                            Manual
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">
                          Created
                        </p>
                        <p className="text-slate-600 text-[12px] font-medium">
                          {e.createdAt}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setDetailsId(e.id)}
                      className="w-full h-9 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-50 active:scale-[0.98] transition-all"
                    >
                      <Eye size={14} /> Details
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-5 px-1">
            <p className="text-sm text-slate-500 font-semibold">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 px-4 rounded-xl border border-slate-200 bg-white flex items-center gap-1 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors active:scale-[0.97]"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 px-4 rounded-xl border border-slate-200 bg-white flex items-center gap-1 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors active:scale-[0.97]"
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