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
};

const PAGE_SIZE = 10;

/* ─── Data helpers ─── */
function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.paymentMethods)) return payload.paymentMethods;
  if (Array.isArray(payload?.methods)) return payload.methods;
  if (Array.isArray(payload?.data)) return payload.data;
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

function normalizeType(value: unknown): UiPaymentMethod["type"] {
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

  return { id, type, status, label, account, owner, createdAt };
}

/* ─── Stat Card ─── */
function StatCard({
  label,
  value,
  icon: Icon,
  variant = "default",
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  const styles = {
    default: {
      card: "bg-violet-600",
      icon: "bg-violet-500 text-white",
      label: "text-violet-200",
      value: "text-white",
    },
    success: {
      card: "bg-white border border-gray-200",
      icon: "bg-emerald-50 text-emerald-600",
      label: "text-gray-400",
      value: "text-gray-900",
    },
    warning: {
      card: "bg-white border border-gray-200",
      icon: "bg-amber-50 text-amber-600",
      label: "text-gray-400",
      value: "text-gray-900",
    },
    danger: {
      card: "bg-white border border-gray-200",
      icon: "bg-red-50 text-red-600",
      label: "text-gray-400",
      value: "text-gray-900",
    },
  };
  const s = styles[variant];
  return (
    <div
      className={`rounded-2xl px-4 py-3.5 flex items-center gap-3 sm:gap-4 ${s.card}`}
    >
      <div
        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.icon}`}
      >
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p
          className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-0.5 truncate ${s.label}`}
        >
          {label}
        </p>
        <p
          className={`text-[18px] sm:text-[22px] font-extrabold leading-none ${s.value}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
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
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${map[type] ?? map.unknown}`}
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-xl bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              Payment Method Details
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              GET /payment-methods/:id
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-auto flex-1">
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : isError ? (
            <div className="text-[12px] text-red-500 font-semibold py-4">
              Failed to load details
            </div>
          ) : (
            <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[420px]">
              {JSON.stringify(data ?? null, null, 2)}
            </pre>
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
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-red-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
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
  onReject: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar name={m.owner} />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-gray-900 truncate leading-none">
              {m.owner}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">
              {String(m.id)}
            </p>
          </div>
        </div>
        <StatusPill status={m.status} />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <TypePill type={m.type} />
          <span className="text-[12px] font-semibold text-gray-700">
            {m.label}
          </span>
        </div>
        <span className="text-[12px] text-gray-600 font-semibold font-mono">
          {m.account}
        </span>
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
              onClick={onReject}
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

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function AdminPaymentMethodsPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"" | MethodType>("");
  const [status, setStatus] = useState<"" | MethodStatus>("");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UiPaymentMethod | null>(
    null,
  );

  const busy = isApproving || isRejecting || isDeleting;

  return (
    <>
      {detailsId !== null ? (
        <DetailsModal id={detailsId} onClose={() => setDetailsId(null)} />
      ) : null}

      {deleteTarget ? (
        <ConfirmModal
          title="Delete payment method?"
          description={
            <>
              Delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.label}
              </span>{" "}
              ({String(deleteTarget.id)}) from{" "}
              <span className="font-semibold text-gray-800">
                /payment-methods/:id
              </span>
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
      ) : null}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-5 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0">
              <CreditCard size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[16px] sm:text-[18px] font-extrabold text-gray-900 tracking-tight">
                Wallet · Payment Methods
              </h1>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium hidden sm:block">
                /payment-methods (search, type, status, page, limit) +
                approve/reject/delete
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-200 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-[12px] font-semibold text-gray-600 flex-shrink-0">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span className="hidden sm:inline">Admin review panel</span>
            <span className="sm:hidden">Admin</span>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <StatCard
            label="Total Methods"
            value={totalCount}
            icon={CreditCard}
            variant="default"
          />
          <StatCard
            label="Active"
            value={approvedCount}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            label="Pending"
            value={pendingCount}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            label="Rejected"
            value={rejectedCount}
            icon={XCircle}
            variant="danger"
          />
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4 mb-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 flex-1 border border-gray-200 rounded-xl px-3 py-2">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search..."
                className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className={`sm:hidden h-9 w-9 rounded-xl border flex items-center justify-center transition-colors flex-shrink-0 ${
                filtersOpen || type || status
                  ? "border-violet-300 bg-violet-50 text-violet-600"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>

          <div
            className={`${filtersOpen ? "flex" : "hidden"} sm:flex flex-wrap items-center gap-2`}
          >
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as any);
                setPage(1);
              }}
              className="flex-1 sm:flex-none h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white min-w-[120px] outline-none cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value="">All Types</option>
              <option value="bkash">bkash</option>
              <option value="nagad">nagad</option>
              <option value="bank">bank</option>
              <option value="binance">binance</option>
            </select>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setPage(1);
              }}
              className="flex-1 sm:flex-none h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white min-w-[120px] outline-none cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value="">All Status</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
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
                Clear
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
                  {[
                    "Owner",
                    "Method",
                    "Account",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin text-violet-500" />{" "}
                        Loading...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load payment methods
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-gray-400"
                    >
                      No payment methods found.
                    </td>
                  </tr>
                ) : (
                  list.map((m) => (
                    <tr
                      key={String(m.id)}
                      className="hover:bg-indigo-50/20 transition-colors"
                    >
                      {/* Owner */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={m.owner} />
                          <div>
                            <p className="text-[12px] font-bold text-gray-900 leading-none">
                              {m.owner}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {String(m.id)}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* Method */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <TypePill type={m.type} />
                          <span className="text-[12px] font-semibold text-gray-700">
                            {m.label}
                          </span>
                        </div>
                      </td>
                      {/* Account */}
                      <td className="px-4 py-3 text-[12px] text-gray-700 font-semibold">
                        {m.account}
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusPill status={m.status} />
                      </td>
                      {/* Created */}
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {m.createdAt}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailsId(m.id)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
                            title="Details"
                          >
                            <Eye size={14} />
                          </button>

                          {m.status === "pending" ? (
                            <>
                              <button
                                disabled={busy}
                                onClick={async () => {
                                  await approve(m.id).unwrap();
                                }}
                                className="px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                disabled={busy}
                                onClick={async () => {
                                  await reject(m.id).unwrap();
                                }}
                                className="px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          ) : null}

                          <button
                            disabled={busy}
                            onClick={() => setDeleteTarget(m)}
                            className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-60 disabled:pointer-events-none transition-colors"
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

          {/* Desktop Pagination */}
          <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[11px] text-gray-400 font-semibold">
              Page <span className="text-gray-700">{page}</span> of{" "}
              <span className="text-gray-700">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="sm:hidden space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
              <Loader2 className="h-4 w-4 animate-spin text-violet-500" />{" "}
              Loading...
            </div>
          ) : isError ? (
            <div className="text-[12px] text-red-500 font-semibold text-center py-6">
              Failed to load payment methods
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-10 text-[12px] text-gray-400">
              No payment methods found.
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
                  onReject={async () => {
                    await reject(m.id).unwrap();
                  }}
                  onDelete={() => setDeleteTarget(m)}
                />
              ))}
              {/* Mobile Pagination */}
              <div className="flex items-center justify-between pt-1 pb-2">
                <p className="text-[11px] text-gray-400 font-semibold">
                  Page <span className="text-gray-700">{page}</span> of{" "}
                  <span className="text-gray-700">{totalPages}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="h-9 w-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="h-9 w-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
