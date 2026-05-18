"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Loader2,
  Search,
  Users,
  Wallet,
  X,
} from "lucide-react";
import {
  useAdminEnrollmentsManualMutation,
  useAdminEnrollmentsMyCoursesQuery,
  useAdminEnrollmentsPayMutation,
  useAdminEnrollmentsQuery,
  useLazyAdminEnrollmentQuery,
} from "@/lib/api/admin/withdraw";

/* ─── Types ────────────────────────────────────────────────────── */
type Tab = "all" | "my-courses";

type UiEnrollment = {
  id: number | string;
  user: string;
  course: string;
  amount: string;
  status: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

/* ─── Helpers ───────────────────────────────────────────────────── */
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

/* ─── Status Badge ──────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const config: Record<string, { bg: string; text: string; dot: string }> = {
    paid: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    active: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
    failed: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
    rejected: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
    cancelled: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
  };
  const { bg, text, dot } = config[s] ?? {
    bg: "bg-gray-100",
    text: "text-gray-500",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${bg} ${text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/* ─── Stat Card ─────────────────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  accent?: "primary" | "success" | "warning" | "danger";
}) {
  const styles = {
    primary: {
      card: "bg-violet-600 border-violet-500",
      icon: "bg-violet-500 text-white",
      label: "text-violet-200",
      value: "text-white",
    },
    success: {
      card: "bg-white border-gray-200",
      icon: "bg-emerald-50 text-emerald-600",
      label: "text-gray-400",
      value: "text-gray-900",
    },
    warning: {
      card: "bg-white border-gray-200",
      icon: "bg-amber-50 text-amber-500",
      label: "text-gray-400",
      value: "text-gray-900",
    },
    danger: {
      card: "bg-white border-gray-200",
      icon: "bg-red-50 text-red-500",
      label: "text-gray-400",
      value: "text-gray-900",
    },
  };
  const s = styles[accent ?? "success"];
  return (
    <div className={`flex items-center gap-4 p-5 rounded-2xl border ${s.card}`}>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.icon}`}
      >
        <Icon size={20} />
      </div>
      <div>
        <p
          className={`text-[11px] font-semibold uppercase tracking-widest ${s.label}`}
        >
          {label}
        </p>
        <p className={`text-2xl font-extrabold mt-0.5 leading-none ${s.value}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Modal Shell ───────────────────────────────────────────────── */
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
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-gray-200 overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-[13px] font-extrabold text-gray-900">
              {title}
            </h2>
            <code className="text-[10px] text-violet-500 font-mono mt-0.5 block">
              {subtitle}
            </code>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors disabled:opacity-40"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* ─── JSON Body Modal ───────────────────────────────────────────── */
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
      setError("Invalid JSON — please fix the syntax and try again.");
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
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Request Body
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full min-h-[200px] px-3.5 py-2.5 text-[12px] border rounded-xl font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none transition-colors ${
              error
                ? "border-red-300 bg-red-50/50 text-red-700"
                : "border-gray-200 bg-gray-50/50 text-gray-700"
            }`}
          />
          {error && (
            <p className="text-[11px] text-red-500 mt-1.5 font-medium">
              {error}
            </p>
          )}
        </div>
        <div className="flex gap-2.5 pt-1">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[12px] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

/* ─── Details Modal ─────────────────────────────────────────────── */
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
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-400 py-10">
          <Loader2 className="h-4 w-4 animate-spin text-violet-500" /> Loading
          details…
        </div>
      ) : isError ? (
        <div className="flex items-center gap-2 text-[12px] text-red-500 font-semibold py-6 bg-red-50 rounded-xl px-4">
          <AlertTriangle size={15} /> Failed to load enrollment details.
        </div>
      ) : (
        <pre className="text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-xl p-3.5 overflow-auto max-h-[420px] leading-relaxed font-mono">
          {JSON.stringify(data ?? null, null, 2)}
        </pre>
      )}
    </ModalShell>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function WithdrawManager(): React.JSX.Element {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const all = useAdminEnrollmentsQuery({
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });
  const my = useAdminEnrollmentsMyCoursesQuery(undefined, {
    skip: tab !== "my-courses",
  });

  const listPayload = tab === "my-courses" ? my.data : all.data;
  const listLoading = tab === "my-courses" ? my.isLoading : all.isLoading;
  const listError = tab === "my-courses" ? my.isError : all.isError;

  const enrollments = useMemo(() => {
    return extractEnrollments(listPayload)
      .map(normalizeEnrollment)
      .filter((x): x is UiEnrollment => Boolean(x));
  }, [listPayload]);

  const totalFromApi = extractTotal(all.data);
  const totalPages = Math.max(
    1,
    totalFromApi ? Math.ceil(totalFromApi / PAGE_SIZE) : 1,
  );

  /* summary counts */
  const totalCount = totalFromApi ?? 0;
  const activeCount = enrollments.filter((e) =>
    ["paid", "active"].includes(e.status.toLowerCase()),
  ).length;
  const pendingCount = enrollments.filter(
    (e) => e.status.toLowerCase() === "pending",
  ).length;
  const failedCount = enrollments.filter((e) =>
    ["failed", "rejected"].includes(e.status.toLowerCase()),
  ).length;

  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  const [pay, { isLoading: isPaying }] = useAdminEnrollmentsPayMutation();
  const [manual, { isLoading: isManualing }] =
    useAdminEnrollmentsManualMutation();

  return (
    <>
      {/* Modals */}
      {detailsId !== null && (
        <DetailsModal id={detailsId} open onClose={() => setDetailsId(null)} />
      )}
      {payOpen && (
        <JsonBodyModal
          title="Pay Enrollment"
          subtitle="POST /enrollments/pay"
          loading={isPaying}
          initialBody={{}}
          onClose={() => setPayOpen(false)}
          onSubmit={async (body) => {
            await pay(body).unwrap();
            setPayOpen(false);
          }}
        />
      )}
      {manualOpen && (
        <JsonBodyModal
          title="Manual Enrollment"
          subtitle="POST /enrollments/manual"
          loading={isManualing}
          initialBody={{}}
          onClose={() => setManualOpen(false)}
          onSubmit={async (body) => {
            await manual(body).unwrap();
            setManualOpen(false);
          }}
        />
      )}

      <div className="min-h-screen bg-gray-50/70 p-4 lg:p-6">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <CreditCard size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-[17px] font-extrabold text-gray-900 tracking-tight">
                Enrollments
              </h1>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                /enrollments · /enrollments/pay · /enrollments/manual ·
                /enrollments/my-courses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setManualOpen(true)}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <Wallet size={14} />
              Manual
            </button>
            <button
              onClick={() => setPayOpen(true)}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-200"
            >
              <Check size={14} />
              Pay
            </button>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatCard
            icon={CreditCard}
            label="Total Methods"
            value={totalCount}
            accent="primary"
          />
          <StatCard
            icon={Users}
            label="Active"
            value={activeCount}
            accent="success"
          />
          <StatCard
            icon={BookOpen}
            label="Pending"
            value={pendingCount}
            accent="warning"
          />
          <StatCard
            icon={X}
            label="Failed"
            value={failedCount}
            accent="danger"
          />
        </div>

        {/* ── Toolbar ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tab switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {(["all", "my-courses"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setPage(1);
                }}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                  tab === t
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "all" ? "All Enrollments" : "My Courses"}
              </button>
            ))}
          </div>

          {/* Search */}
          <div
            className={`flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 w-full sm:w-72 transition-opacity ${tab !== "all" ? "opacity-40 pointer-events-none" : ""}`}
          >
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search enrollments…"
              disabled={tab !== "all"}
              className="w-full text-[12px] font-medium text-gray-700 placeholder:text-gray-400 bg-transparent outline-none"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Owner",
                    "Course",
                    "Amount",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5 bg-gray-50/60"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {listLoading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                        <span className="text-[12px] font-semibold">
                          Loading enrollments…
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : listError ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-red-500 font-semibold">
                        <AlertTriangle size={16} /> Failed to load enrollments
                      </div>
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <BookOpen size={28} className="opacity-40" />
                        <span className="text-[12px] font-semibold">
                          No enrollments found
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  enrollments.map((e) => (
                    <tr
                      key={String(e.id)}
                      className="hover:bg-violet-50/20 transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-[11px] font-extrabold flex items-center justify-center flex-shrink-0">
                            {e.user !== "—"
                              ? e.user.slice(0, 2).toUpperCase()
                              : "—"}
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-gray-900 leading-tight">
                              {e.user}
                            </p>
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                              #{String(e.id)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <p
                          className="text-[12px] text-gray-700 font-medium max-w-[180px] truncate"
                          title={e.course}
                        >
                          {e.course}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[12px] text-gray-800 font-bold tabular-nums">
                          {e.amount}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={e.status} />
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[11px] text-gray-400">
                          {e.createdAt}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setDetailsId(e.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-500 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all"
                          title="View details"
                        >
                          <Eye size={13} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between bg-gray-50/40">
            {tab === "all" ? (
              <>
                <p className="text-[11px] text-gray-400 font-medium">
                  Page <span className="text-gray-700 font-bold">{page}</span>{" "}
                  of{" "}
                  <span className="text-gray-700 font-bold">{totalPages}</span>
                  {totalFromApi !== null && (
                    <span className="ml-2 text-gray-400">
                      · {totalFromApi} total
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:border-gray-300 disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:border-gray-300 disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <p className="text-[11px] text-amber-600 font-semibold flex items-center gap-1.5">
                <AlertTriangle size={13} />
                Pagination unavailable — depends on /enrollments/my-courses
                backend response
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
