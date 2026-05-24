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
} from "@/lib/api/admin/wallet";

type MethodType = "bkash" | "nagad" | "bank" | "binance";
type MethodStatus = "pending" | "approved" | "rejected";

// ─── Exact API shapes ──────────────────────────────────────────────────────────
//
// GET /payment-methods  →  {
//   success: true, statusCode: 200, message: "...",
//   data: {
//     items: [
//       {
//         id: 3, type: "binance", status: "pending",
//         rejectReason: null,
//         accountNumber: null,    accountHolderName: null,
//         bankName: null,         branchName: null,
//         binanceId: "87654321",
//         isDefault: false,
//         createdAt: "...", updatedAt: "...", deletedAt: null,
//         user: { id: 2, name: "ovi", email: "...", role: "admin", phone: "..." }
//       }, ...
//     ],
//     meta: { total: 2, page: 1, limit: 10, totalPages: 1 }
//   }
// }

type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
};

type ApiPaymentMethod = {
  id: number;
  type: string;
  status: string;
  rejectReason: string | null;
  accountNumber: string | null;
  accountHolderName: string | null;
  bankName: string | null;
  branchName: string | null;
  binanceId: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: ApiUser;
};

type ApiMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type ApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: ApiPaymentMethod[];
    meta: ApiMeta;
  };
};

// ─── UI shape ─────────────────────────────────────────────────────────────────

type UiPaymentMethod = {
  id: number;
  type: MethodType | "unknown";
  status: MethodStatus | "unknown";
  /** human-readable method label  */
  label: string;
  /** primary account identifier (account number, binance ID, etc.) */
  account: string;
  /** owner name from nested user object */
  owner: string;
  ownerEmail: string;
  ownerPhone: string;
  rejectReason: string | null;
  bankName: string | null;
  branchName: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  raw: ApiPaymentMethod;
};

const PAGE_SIZE = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

/** Resolve the best account identifier based on method type */
function resolveAccount(raw: ApiPaymentMethod): string {
  if (raw.type === "binance" && raw.binanceId) return raw.binanceId;
  if (raw.accountNumber) return raw.accountNumber;
  if (raw.binanceId) return raw.binanceId;
  return "—";
}

/** Resolve display label for the method */
function resolveLabel(raw: ApiPaymentMethod): string {
  if (raw.type === "bank" && raw.bankName) return raw.bankName;
  return raw.type?.toUpperCase() ?? "—";
}

/** Map one API item → UI shape */
function toUi(raw: ApiPaymentMethod): UiPaymentMethod {
  return {
    id: raw.id,
    type: normalizeType(raw.type),
    status: normalizeStatus(raw.status),
    label: resolveLabel(raw),
    account: resolveAccount(raw),
    owner: raw.user?.name ?? "—",
    ownerEmail: raw.user?.email ?? "—",
    ownerPhone: raw.user?.phone ?? "—",
    rejectReason: raw.rejectReason,
    bankName: raw.bankName,
    branchName: raw.branchName,
    isDefault: raw.isDefault ?? false,
    createdAt: formatDate(raw.createdAt),
    updatedAt: formatDate(raw.updatedAt),
    raw,
  };
}

/** Destructure the API envelope → items array */
function extractItems(payload: ApiResponse | any): ApiPaymentMethod[] {
  // Primary shape: { data: { items: [...] } }
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  // Fallback shapes
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

/** Destructure the API envelope → meta */
function extractMeta(payload: ApiResponse | any): ApiMeta | null {
  if (payload?.data?.meta) return payload.data.meta;
  if (payload?.meta) return payload.meta;
  return null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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
  const idx = (name.charCodeAt(0) ?? 0) % colors.length;
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${colors[idx]}`}
    >
      {initials || "?"}
    </div>
  );
}

// ─── Details Modal ────────────────────────────────────────────────────────────

function DetailsModal({ id, onClose }: { id: number; onClose: () => void }) {
  const {
    data: apiResponse,
    isFetching,
    isError,
  } = useAdminPaymentMethodQuery(id);

  // Single-item response: same envelope → data.items[0] or data directly
  const detail: ApiPaymentMethod | null =
    apiResponse?.data?.items?.[0] ?? apiResponse?.data ?? apiResponse ?? null;

  const ui = detail ? toUi(detail) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-xl bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              Payment Method Details
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">ID: {id}</p>
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
            <div className="text-[12px] text-red-500 font-semibold py-4">
              Failed to load details
            </div>
          ) : ui ? (
            <div className="space-y-4">
              {/* Owner */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Owner
                </p>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Avatar name={ui.owner} />
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">
                      {ui.owner}
                    </p>
                    <p className="text-[11px] text-gray-500">{ui.ownerEmail}</p>
                    <p className="text-[11px] text-gray-500">{ui.ownerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Method fields */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Method
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "ID", value: ui.id },
                    { label: "Type", value: <TypePill type={ui.type} /> },
                    {
                      label: "Status",
                      value: <StatusPill status={ui.status} />,
                    },
                    { label: "Account / ID", value: ui.account },
                    { label: "Bank Name", value: ui.bankName ?? "—" },
                    { label: "Branch", value: ui.branchName ?? "—" },
                    { label: "Default", value: ui.isDefault ? "Yes" : "No" },
                    { label: "Reject Reason", value: ui.rejectReason ?? "—" },
                    { label: "Created", value: ui.createdAt },
                    { label: "Updated", value: ui.updatedAt },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                        {label}
                      </p>
                      {typeof value === "string" ||
                      typeof value === "number" ? (
                        <p className="text-[12px] font-semibold text-gray-800">
                          {value}
                        </p>
                      ) : (
                        <div className="mt-0.5">{value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

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

// ─── Mobile Card ──────────────────────────────────────────────────────────────

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
              {m.ownerEmail}
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
      {m.isDefault && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-200">
          Default
        </span>
      )}
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

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function AdminPaymentMethodsPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"" | MethodType>("");
  const [statusFilter, setStatusFilter] = useState<"" | MethodStatus>("");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useAdminPaymentMethodsQuery({
    search: search || undefined,
    type: typeFilter || undefined,
    status: statusFilter || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const [approve, { isLoading: isApproving }] =
    useAdminApprovePaymentMethodMutation();
  const [reject, { isLoading: isRejecting }] =
    useAdminRejectPaymentMethodMutation();
  const [remove, { isLoading: isDeleting }] =
    useAdminDeletePaymentMethodMutation();

  // ── Destructure API response ─────────────────────────────────────────────
  // Shape: { success, statusCode, message, data: { items: [...], meta: { total, page, limit, totalPages } } }
  const list = useMemo<UiPaymentMethod[]>(() => {
    return extractItems(apiResponse).map(toUi);
  }, [apiResponse]);

  const meta = extractMeta(apiResponse);
  const total = meta?.total ?? list.length;
  const totalPages =
    meta?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Stats derived from meta total + current page counts
  const approvedCount = list.filter((m) => m.status === "approved").length;
  const pendingCount = list.filter((m) => m.status === "pending").length;
  const rejectedCount = list.filter((m) => m.status === "rejected").length;

  const [detailsId, setDetailsId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UiPaymentMethod | null>(
    null,
  );
  const busy = isApproving || isRejecting || isDeleting;

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
              ({deleteTarget.account}) owned by{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.owner}
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

      <div className="min-h-screen bg-gray-50/60 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5 sm:mb-6 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0">
              <CreditCard size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[16px] sm:text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">
                Payment Methods
              </h1>
              <p className="text-[11px] sm:text-[12px] text-gray-400 mt-0.5 sm:mt-1 font-medium hidden sm:block">
                Manage payment methods, roles, access & account status.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-200 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-[12px] font-semibold text-gray-600 shadow-sm flex-shrink-0">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span className="hidden sm:inline">Admin review panel</span>
            <span className="sm:hidden">Admin</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <StatCard
            label="Total Methods"
            value={total}
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

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, account, email..."
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
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className={`sm:hidden h-9 w-9 rounded-xl border flex items-center justify-center transition-colors flex-shrink-0 ${
                filtersOpen || typeFilter || statusFilter
                  ? "border-violet-300 bg-violet-50 text-violet-600"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>

          <div
            className={`${filtersOpen ? "flex" : "hidden"} sm:flex flex-wrap items-center gap-2 mt-2.5`}
          >
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as any);
                setPage(1);
              }}
              className="flex-1 sm:flex-none h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-colors min-w-[120px]"
            >
              <option value="">All Types</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="bank">Bank</option>
              <option value="binance">Binance</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="flex-1 sm:flex-none h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-colors min-w-[120px]"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            {(typeFilter || statusFilter) && (
              <button
                onClick={() => {
                  setTypeFilter("");
                  setStatusFilter("");
                  setPage(1);
                }}
                className="h-9 px-3 text-[12px] font-semibold text-red-500 border border-red-200 bg-red-50 rounded-xl hover:bg-red-100 transition-colors whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    "Owner",
                    "Method",
                    "Account / ID",
                    "Status",
                    "Default",
                    "Created",
                    "Actions",
                  ].map((h) => (
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
                    <td colSpan={7} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin text-violet-500" />{" "}
                        Loading payment methods...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load payment methods
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-14 text-center">
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
                      key={m.id}
                      className="hover:bg-violet-50/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={m.owner} />
                          <div>
                            <p className="text-[12px] font-bold text-gray-900 leading-none">
                              {m.owner}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {m.ownerEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <TypePill type={m.type} />
                          <span className="text-[12px] font-semibold text-gray-700">
                            {m.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-700 font-semibold font-mono">
                        {m.account}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={m.status} />
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-600">
                        {m.isDefault ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-200">
                            Default
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500 whitespace-nowrap">
                        {m.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setDetailsId(m.id)}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                            title="View Details"
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
                                  await reject(m.id).unwrap();
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

          {/* Desktop Pagination */}
          <div className="px-4 py-3.5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[11px] text-gray-400 font-semibold">
              Showing{" "}
              <span className="text-gray-700">
                {list.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–
                {Math.min(page * PAGE_SIZE, total)}
              </span>{" "}
              of <span className="text-gray-700">{total}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[12px] font-bold text-gray-600 px-1">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
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
                  key={m.id}
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
              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-gray-400 font-semibold">
                  <span className="text-gray-700">
                    {list.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–
                    {Math.min(page * PAGE_SIZE, total)}
                  </span>{" "}
                  of <span className="text-gray-700">{total}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="h-9 w-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[12px] font-bold text-gray-600">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="h-9 w-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
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
