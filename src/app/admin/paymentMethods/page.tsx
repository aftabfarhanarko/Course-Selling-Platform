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
  ShieldCheck,
  Trash2,
  X,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import {
  useAdminApprovePaymentMethodMutation,
  useAdminDeletePaymentMethodMutation,
  useAdminPaymentMethodQuery,
  useAdminPaymentMethodsQuery,
  useAdminRejectPaymentMethodMutation,
} from "@/lib/api/admin/payment-methods";

type MethodType = "bkash" | "nagad" | "bank" | "binance";
type MethodStatus = "pending" | "approved" | "rejected";

type UiPaymentMethod = {
  id: number | string;
  type: MethodType | "unknown";
  status: MethodStatus | "unknown";
  label: string;
  account: string;
  owner: string;
  createdAt: string;
  balance?: string;
};

const PAGE_SIZE = 10;

/* ─── Data helpers ─── */
function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.paymentMethods)) return payload.paymentMethods;
  if (Array.isArray(payload?.methods)) return payload.methods;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.paymentMethods))
    return payload.data.paymentMethods;
  if (Array.isArray(payload?.data?.methods)) return payload.data.methods;
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

function normalizeType(value: unknown): MethodType | "unknown" {
  const v = String(value ?? "")
    .toLowerCase()
    .trim();
  if (v === "bkash") return "bkash";
  if (v === "nagad") return "nagad";
  if (v === "bank") return "bank";
  if (v === "binance" || v === "binence") return "binance";
  return "unknown";
}

function normalizeStatus(value: unknown): UiPaymentMethod["status"] {
  const v = String(value ?? "")
    .toLowerCase()
    .trim();
  if (v === "pending") return "pending";
  if (v === "approved" || v === "active") return "approved";
  if (v === "rejected") return "rejected";
  return "unknown";
}

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

function toUi(raw: any): UiPaymentMethod | null {
  const id = raw?.id ?? raw?._id ?? raw?.paymentMethodId ?? null;
  if (!id) return null;
  const type = normalizeType(raw?.type ?? raw?.method ?? raw?.provider);
  const status = normalizeStatus(raw?.status);
  const label =
    String(raw?.label ?? raw?.name ?? raw?.title ?? type).trim() ||
    String(type).toUpperCase();
  const account =
    String(
      raw?.accountNumber ??
        raw?.account ??
        raw?.phone ??
        raw?.walletNumber ??
        raw?.number ??
        "",
    ).trim() || "—";
  const owner =
    String(
      raw?.user?.name ??
        raw?.user?.email ??
        raw?.owner?.name ??
        raw?.owner ??
        raw?.nameOnAccount ??
        "",
    ).trim() || "—";
  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);
  return {
    id,
    type,
    status,
    label,
    account,
    owner,
    createdAt,
    balance: raw?.balance,
  };
}

/* ─── Status Pill ─── */
function StatusPill({ status }: { status: UiPaymentMethod["status"] }) {
  const map: Record<string, { cls: string; dot: string; label: string }> = {
    approved: {
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: "Active",
    },
    pending: {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      label: "Pending",
    },
    rejected: {
      cls: "bg-red-50 text-red-700 border-red-200",
      dot: "bg-red-500",
      label: "Rejected",
    },
    unknown: {
      cls: "bg-gray-50 text-gray-600 border-gray-200",
      dot: "bg-gray-400",
      label: "Unknown",
    },
  };
  const { cls, dot, label } = map[status] ?? map.unknown;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${dot}`} />
      {label}
    </span>
  );
}

/* ─── Type Pill ─── */
function TypePill({ type }: { type: UiPaymentMethod["type"] }) {
  const map: Record<string, string> = {
    bkash: "bg-pink-50 text-pink-700 border-pink-200",
    nagad: "bg-orange-50 text-orange-700 border-orange-200",
    bank: "bg-blue-50 text-blue-700 border-blue-200",
    binance: "bg-yellow-50 text-yellow-700 border-yellow-200",
    unknown: "bg-gray-50 text-gray-600 border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${map[type] ?? map.unknown}`}
    >
      {type}
    </span>
  );
}

/* ─── Avatar ─── */
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  const colors = [
    "bg-violet-100 text-violet-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-pink-100 text-pink-700",
    "bg-amber-100 text-amber-700",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${colors[idx]}`}
    >
      {initials || "?"}
    </div>
  );
}

/* ─── Details Modal ─── */
function DetailsModal({
  id,
  onClose,
}: {
  id: number | string;
  onClose: () => void;
}) {
  const { data, isFetching, isError } = useAdminPaymentMethodQuery(id);
  const raw =
    data?.data?.paymentMethod || data?.paymentMethod || data?.data || data;
  const method = React.useMemo(() => toUi(raw), [raw]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-xl bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              Payment Method Details
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">ID: {String(id)}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-5 py-4 overflow-auto flex-1">
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : isError ? (
            <p className="text-[12px] text-red-500 font-semibold py-4">
              Failed to load details
            </p>
          ) : !method ? (
            <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto">
              {JSON.stringify(raw ?? null, null, 2)}
            </pre>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                    Status
                  </p>
                  <StatusPill status={method.status} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">
                    Type
                  </p>
                  <TypePill type={method.type} />
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-2xl space-y-4">
                {[
                  { label: "OWNER", value: method.owner },
                  method.balance !== undefined
                    ? { label: "BALANCE", value: `৳${method.balance}` }
                    : { label: "ACCOUNT", value: method.account },
                  { label: "LABEL", value: method.label },
                  { label: "CREATED AT", value: method.createdAt },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-gray-400 font-bold mb-1">
                      {label}
                    </p>
                    <p className="text-[13px] font-semibold text-gray-800 break-all">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Confirm Modal ─── */
function ConfirmModal({
  title,
  description,
  confirmText,
  loading,
  onClose,
  onConfirm,
}: {
  title: string;
  description: React.ReactNode;
  confirmText: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-sm bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={26} className="text-red-500" />
        </div>
        <h3 className="text-[15px] font-extrabold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-[12px] text-gray-500 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-2.5 mt-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-red-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Card ─── */
function MobileCard({
  m,
  busy,
  onDetails,
  onApprove,
  onReject,
  onDelete,
}: {
  m: UiPaymentMethod;
  busy: boolean;
  onDetails: () => void;
  onApprove: () => void;
  onReject: (data: { id: number | string; reason: string }) => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar name={m.owner} />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-gray-900 truncate leading-none">
              {m.owner}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">
              ID: {String(m.id)}
            </p>
          </div>
        </div>
        <StatusPill status={m.status} />
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <TypePill type={m.type} />
          <span className="text-[12px] font-semibold text-gray-700 truncate">
            {m.label}
          </span>
        </div>
        <span className="text-[12px] text-gray-500 font-mono">{m.account}</span>
      </div>

      <p className="text-[11px] text-gray-400">{m.createdAt}</p>

      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <button
          onClick={onDetails}
          className="flex-1 h-9 rounded-xl border border-gray-200 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Eye size={13} /> Details
        </button>
        {m.status === "pending" && (
          <>
            <button
              disabled={busy}
              onClick={onApprove}
              className="flex-1 h-9 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <Check size={13} /> Approve
            </button>
            <button
              disabled={busy}
              onClick={async () => {
                const reason = window.prompt(
                  "Reason for rejection?",
                  "Invalid payment details",
                );
                if (reason !== null) onReject({ id: m.id, reason });
              }}
              className="flex-1 h-9 rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <X size={13} /> Reject
            </button>
          </>
        )}
        <button
          disabled={busy}
          onClick={onDelete}
          className="w-9 h-9 rounded-xl border border-red-200 bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:pointer-events-none flex-shrink-0"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

/* ══════════════ MAIN PAGE ══════════════ */
export default function AdminPaymentMethodsPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"" | MethodType>("");
  const [status, setStatus] = useState<"" | MethodStatus>("");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UiPaymentMethod | null>(
    null,
  );

  const { data, isLoading, isError } = useAdminPaymentMethodsQuery({
    search,
    type: type || undefined,
    status: status || undefined,
    page,
    limit: PAGE_SIZE,
  });
  const [approve, { isLoading: isApproving }] =
    useAdminApprovePaymentMethodMutation();
  const [reject, { isLoading: isRejecting }] =
    useAdminRejectPaymentMethodMutation();
  const [remove, { isLoading: isDeleting }] =
    useAdminDeletePaymentMethodMutation();

  const list = useMemo(
    () => extractList(data).map(toUi).filter(Boolean) as UiPaymentMethod[],
    [data],
  );
  const total = extractTotal(data);
  const totalPages = Math.max(
    1,
    total !== null
      ? Math.ceil(total / PAGE_SIZE)
      : Math.ceil(list.length / PAGE_SIZE) || 1,
  );
  const totalCount = total ?? list.length;
  const approvedCount = list.filter((m) => m.status === "approved").length;
  const pendingCount = list.filter((m) => m.status === "pending").length;
  const rejectedCount = list.filter((m) => m.status === "rejected").length;
  const busy = isApproving || isRejecting || isDeleting;

  const hasBalance =
    list.length > 0 && list.some((m) => m.balance !== undefined);
  const tableHeaders = hasBalance
    ? ["Owner", "Balance", "Created At", "Actions"]
    : ["Owner", "Method", "Account", "Status", "Created At", "Actions"];

  /* ── Pagination helper ── */
  const Pagination = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={`flex items-center ${compact ? "justify-between pt-1" : "justify-between px-4 py-3.5 border-t border-gray-100"}`}
    >
      <p className="text-[11px] text-gray-400 font-semibold">
        <span className="text-gray-700">
          {list.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–
          {Math.min(page * PAGE_SIZE, total ?? list.length)}
        </span>{" "}
        of <span className="text-gray-700">{total ?? list.length}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="h-8 w-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="text-[12px] font-bold text-gray-600 px-1">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="h-8 w-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {detailsId !== null && (
        <DetailsModal id={detailsId} onClose={() => setDetailsId(null)} />
      )}
      {deleteTarget && (
        <ConfirmModal
          title="Delete payment method?"
          description={
            <>
              Delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.label}
              </span>{" "}
              from{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.account}
              </span>
              ?
            </>
          }
          confirmText="Delete"
          loading={busy}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await remove(deleteTarget.id).unwrap();
            setDeleteTarget(null);
          }}
        />
      )}

      <div className="min-h-screen p-3 sm:p-4 lg:p-6 space-y-4">
        {/* ── Premium Header ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 px-5 py-5 sm:px-7 sm:py-6 shadow-lg shadow-violet-200">
          <div className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-indigo-400/20 blur-xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                <CreditCard size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-[18px] sm:text-[22px] font-extrabold text-white tracking-tight leading-none">
                    Payment Methods
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-white/15 border border-white/20 text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Sparkles size={9} /> Admin
                  </span>
                </div>
                <p className="text-[12px] text-violet-200 font-medium">
                  Manage payment methods, roles & account status.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 w-fit">
              <ShieldCheck size={13} className="text-emerald-300" />
              <span className="text-[11px] font-bold text-white/90 tracking-wide">
                Review Panel
              </span>
            </div>
          </div>
        </div>

        {/* ── Premium Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {[
            {
              label: "Total Methods",
              value: totalCount,
              Icon: CreditCard,
              accent: "from-violet-400 to-violet-600",
              icon: "bg-violet-50 text-violet-600",
              badge: "bg-violet-50 text-violet-600 border-violet-100",
            },
            {
              label: "Active",
              value: approvedCount,
              Icon: CheckCircle,
              accent: "from-emerald-400 to-emerald-600",
              icon: "bg-emerald-50 text-emerald-600",
              badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
            },
            {
              label: "Pending",
              value: pendingCount,
              Icon: Clock,
              accent: "from-amber-400 to-amber-600",
              icon: "bg-amber-50 text-amber-600",
              badge: "bg-amber-50 text-amber-600 border-amber-100",
            },
            {
              label: "Rejected",
              value: rejectedCount,
              Icon: XCircle,
              accent: "from-red-400 to-red-600",
              icon: "bg-red-50 text-red-500",
              badge: "bg-red-50 text-red-500 border-red-100",
            },
          ].map(({ label, value, Icon, accent, icon, badge }) => (
            <div
              key={label}
              className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 flex items-center gap-3 hover:shadow-md transition-shadow"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${accent}`}
              />
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${icon} border-current/20`}
              >
                <Icon size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 truncate">
                    {label}
                  </p>
                  <span
                    className={`hidden sm:inline text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${badge}`}
                  >
                    {label === "Total Methods" ? "All" : label}
                  </span>
                </div>
                <p className="text-[22px] sm:text-[24px] font-black text-gray-900 leading-none tracking-tight">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Premium Search + Filters ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4 space-y-2.5">
          {/* Search row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center pointer-events-none">
                <Search size={13} className="text-violet-500" />
              </div>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, account, owner…"
                className="w-full pl-12 pr-9 py-2.5 text-[13px] font-semibold text-gray-700 placeholder:text-gray-400 placeholder:font-normal outline-none bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            {/* mobile filter toggle */}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className={`sm:hidden h-10 w-10 rounded-xl border flex items-center justify-center transition-colors flex-shrink-0 ${
                filtersOpen || type || status
                  ? "border-violet-300 bg-violet-50 text-violet-600"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>

          {/* Selects */}
          <div
            className={`${filtersOpen ? "flex" : "hidden"} sm:flex flex-wrap items-center gap-2`}
          >
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as any);
                setPage(1);
              }}
              className="flex-1 sm:flex-none h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white text-gray-700 outline-none cursor-pointer hover:border-violet-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all min-w-[120px]"
            >
              <option value="">All Types</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="bank">Bank</option>
              <option value="binance">Binance</option>
            </select>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setPage(1);
              }}
              className="flex-1 sm:flex-none h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white text-gray-700 outline-none cursor-pointer hover:border-violet-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all min-w-[120px]"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            {(type || status) && (
              <button
                onClick={() => {
                  setType("");
                  setStatus("");
                  setPage(1);
                }}
                className="h-9 px-3 text-[12px] font-semibold text-red-500 border border-red-200 bg-red-50 rounded-xl hover:bg-red-100 transition-colors whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden sm:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {tableHeaders.map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={tableHeaders.length} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin text-violet-500" />{" "}
                        Loading payment methods...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load payment methods
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="px-4 py-14 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                          <CreditCard size={20} className="text-gray-400" />
                        </div>
                        <p className="text-[12px] text-gray-400 font-semibold">
                          No payment methods found.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  list.map((m) => (
                    <tr
                      key={String(m.id)}
                      className="hover:bg-violet-50/20 transition-colors"
                    >
                      {/* Owner */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={m.owner} />
                          <div>
                            <p className="text-[13px] font-bold text-gray-900 leading-none mb-1">
                              {m.owner}
                            </p>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                              ID: {m.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      {hasBalance ? (
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center text-[13px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                            ৳{m.balance}
                          </span>
                        </td>
                      ) : (
                        <>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <TypePill type={m.type} />
                              <span className="text-[12px] font-semibold text-gray-700">
                                {m.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-[12px] font-bold text-gray-700 tracking-wide">
                              {m.account}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <StatusPill status={m.status} />
                          </td>
                        </>
                      )}
                      {/* Created At */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-[11px] font-semibold text-gray-400">
                          {m.createdAt}
                        </p>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setDetailsId(m.id)}
                            className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>
                          {m.status === "pending" && (
                            <>
                              <button
                                disabled={busy}
                                onClick={async () => {
                                  await approve(m.id).unwrap();
                                }}
                                className="w-8 h-8 rounded-lg border border-emerald-200 bg-emerald-50 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                title="Approve"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                disabled={busy}
                                onClick={async () => {
                                  const reason = window.prompt(
                                    "Reason for rejection?",
                                    "Invalid payment details",
                                  );
                                  if (reason !== null)
                                    await reject({ id: m.id, reason }).unwrap();
                                }}
                                className="w-8 h-8 rounded-lg border border-amber-200 bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                title="Reject"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          <button
                            disabled={busy}
                            onClick={() => setDeleteTarget(m)}
                            className="w-8 h-8 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>

        {/* ── Mobile Cards ── */}
        <div className="sm:hidden space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
              <Loader2 className="h-4 w-4 animate-spin text-violet-500" />{" "}
              Loading...
            </div>
          ) : isError ? (
            <p className="text-[12px] text-red-500 font-semibold text-center py-6">
              Failed to load payment methods
            </p>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-14">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <CreditCard size={20} className="text-gray-400" />
              </div>
              <p className="text-[12px] text-gray-400 font-semibold">
                No payment methods found.
              </p>
            </div>
          ) : (
            <>
              {list.map((m) => (
                <MobileCard
                  key={String(m.id)}
                  m={m}
                  busy={busy}
                  onDetails={() => setDetailsId(m.id)}
                  onApprove={async () => {
                    await approve(m.id).unwrap();
                  }}
                  onReject={async ({ id, reason }) => {
                    await reject({ id, reason }).unwrap();
                  }}
                  onDelete={() => setDeleteTarget(m)}
                />
              ))}
              <Pagination compact />
            </>
          )}
        </div>
      </div>
    </>
  );
}
