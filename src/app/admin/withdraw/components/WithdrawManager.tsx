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
  Users,
  Wallet,
  X,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Trash2,
  TrendingUp,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  useAdminWithdrawsQuery,
  useAdminApproveWithdrawMutation,
  useAdminRejectWithdrawMutation,
  useAdminDirectWithdrawMutation,
  useAdminDeleteWithdrawMutation,
  useLazyAdminWithdrawQuery,
} from "@/lib/api/admin/withdraw";
import { useAdminPaymentMethodsQuery } from "@/lib/api/admin/payment-methods";

type UiWithdraw = {
  id: number | string;
  user: { name: string; email: string; photo: string };
  productName: string;
  totalAmount: string;
  studentAmount: string;
  adminAmount: string;
  status: string;
  createdAt: string;
  raw: any;
};

const PAGE_SIZE = 10;

/* ─── Data helpers ─── */
function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function extractTotal(payload: any): number | null {
  const candidates = [payload?.data?.meta?.total, payload?.meta?.total];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
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

function toUi(raw: any): UiWithdraw | null {
  const id = raw?.id;
  if (!id) return null;
  const user = raw?.user || {};

  let productName = "—";
  if (raw?.product?.botName) productName = raw.product.botName;
  else if (raw?.product?.title) productName = raw.product.title;
  else if (raw?.enrollment?.course?.title)
    productName = raw.enrollment.course.title;
  else if (raw?.enrollment?.id)
    productName = `Enrollment #${raw.enrollment.id}`;

  return {
    id,
    user: {
      name: user.name || "—",
      email: user.email || "—",
      photo: user.photo || "",
    },
    productName,
    totalAmount: raw?.totalAmount ?? "0.00",
    studentAmount: raw?.studentAmount ?? "0.00",
    adminAmount: raw?.adminAmount ?? "0.00",
    status: (raw?.status || "pending").toLowerCase(),
    createdAt: formatDate(raw?.createdAt),
    raw,
  };
}

/* ─── Shared Components ─── */
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

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { cls: string; dot: string; label: string }> = {
    approved: {
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: "Approved",
    },
    paid: {
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: "Paid",
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

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src && src.startsWith("http")) {
    return (
      <img
        src={src}
        alt={name}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
    );
  }
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

/* ─── Modals ─── */
function ModalShell({ title, subtitle, loading, onClose, children }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] text-gray-400 mt-0.5 font-mono">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-5 py-5 flex-1 overflow-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

function DetailsModal({
  id,
  onClose,
  onApprove,
  onReject,
  isBusy,
}: {
  id: number | string;
  onClose: () => void;
  onApprove: (id: number | string) => void;
  onReject: (id: number | string) => void;
  isBusy: boolean;
}) {
  const [trigger, { data, isFetching, isError }] = useLazyAdminWithdrawQuery();
  React.useEffect(() => {
    trigger(id);
  }, [id, trigger]);

  const w = data?.data || data;

  return (
    <ModalShell
      title="Withdraw Details"
      subtitle={`ID: ${id}`}
      loading={isFetching}
      onClose={onClose}
    >
      {isFetching ? (
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : isError || !w ? (
        <div className="text-[12px] text-red-500 font-semibold py-4">
          Failed to load details
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                Status
              </p>
              <StatusPill status={w.status} />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                Total Amount
              </p>
              <p className="text-xl font-extrabold text-gray-900">
                ৳{w.totalAmount ?? "0.00"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-violet-500" />
                <h4 className="text-[11px] font-bold text-gray-900 uppercase">
                  User Info
                </h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    Name
                  </p>
                  <p className="text-[12px] font-bold text-gray-800">
                    {w.user?.name || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    Email
                  </p>
                  <p
                    className="text-[12px] font-semibold text-gray-600 truncate"
                    title={w.user?.email}
                  >
                    {w.user?.email || "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={14} className="text-emerald-500" />
                <h4 className="text-[11px] font-bold text-gray-900 uppercase">
                  Breakdown
                </h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    Student Amount
                  </p>
                  <p className="text-[12px] font-bold text-violet-600">
                    ৳{w.studentAmount ?? "0.00"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    Admin Amount
                  </p>
                  <p className="text-[12px] font-bold text-emerald-600">
                    ৳{w.adminAmount ?? "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} className="text-blue-500" />
              <h4 className="text-[11px] font-bold text-gray-900 uppercase">
                Target Details
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">
                  Product/Enrollment
                </p>
                <p className="text-[12px] font-bold text-gray-800 line-clamp-2">
                  {w.product?.botName ||
                    w.product?.title ||
                    w.enrollment?.course?.title ||
                    "—"}
                </p>
              </div>
              {w.percentage && (
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">
                    Percentage Rule
                  </p>
                  <p className="text-[12px] font-bold text-gray-800">
                    {w.percentage.name || "Custom"}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Student: {w.percentage.studentPercentage}%, Admin:{" "}
                    {w.percentage.adminPercentage}%
                  </p>
                </div>
              )}
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">
                  Created At
                </p>
                <p className="text-[12px] font-semibold text-gray-600">
                  {formatDate(w.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {(w.status === "pending" || w.status === "processing") && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-2">
              <button
                disabled={isBusy}
                onClick={() => onReject(id)}
                className="flex-1 py-2.5 rounded-xl border border-red-200 bg-red-50 text-[12px] font-bold text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors flex justify-center items-center gap-1.5"
              >
                <X size={14} /> Reject
              </button>
              <button
                disabled={isBusy}
                onClick={() => onApprove(id)}
                className="flex-1 py-2.5 rounded-xl border border-emerald-200 bg-emerald-500 text-[12px] font-bold text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors flex justify-center items-center gap-1.5"
              >
                <Check size={14} /> Approve
              </button>
            </div>
          )}
        </div>
      )}
    </ModalShell>
  );
}

function WithdrawApproveModal({
  withdraw,
  loading,
  onClose,
  onConfirm,
}: {
  withdraw: UiWithdraw;
  loading: boolean;
  onClose: () => void;
  onConfirm: (selectedMethod: any) => void;
}) {
  const { data, isFetching } = useAdminPaymentMethodsQuery({
    search: withdraw.user.email,
  });

  const [selectedMethodId, setSelectedMethodId] = useState<
    string | number | null
  >(null);

  const paymentMethods = useMemo(() => extractList(data), [data]);
  const selectedMethod = useMemo(() => {
    return paymentMethods.find(
      (pm) => (pm.id ?? pm._id ?? pm.paymentMethodId) === selectedMethodId,
    );
  }, [paymentMethods, selectedMethodId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-[15px] font-black text-slate-900">
              Approve Withdraw & Pay?
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
              Amount: ৳{withdraw.totalAmount}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all disabled:opacity-60"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          <p className="text-[12px] text-amber-700 mb-4 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200">
            <strong>Note:</strong> Select a payment method below. Clicking
            approve will <strong>approve & mark as paid</strong> this withdraw
            request.
          </p>

          <h4 className="text-[12px] font-black text-slate-900 mb-3 uppercase tracking-wider">
            User Payment Methods
          </h4>

          {isFetching ? (
            <div className="flex items-center justify-center py-6 text-slate-400 gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-[12px] font-semibold">
                Loading methods...
              </span>
            </div>
          ) : paymentMethods.length === 0 ? (
            <div className="py-6 text-center rounded-xl bg-slate-50 border border-slate-100 border-dashed">
              <p className="text-[12px] font-semibold text-slate-500">
                No payment methods found for {withdraw.user.email}.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((pm, i) => {
                const pmId = pm.id ?? pm._id ?? pm.paymentMethodId ?? i;
                const isSelected = selectedMethodId === pmId;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedMethodId(pmId)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col gap-1 ${
                      isSelected
                        ? "border-violet-600 bg-violet-50/50 shadow-md ring-2 ring-violet-500/20"
                        : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-black text-slate-800 uppercase flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full border flex items-center justify-center ${isSelected ? "border-violet-600 bg-violet-600" : "border-slate-300"}`}
                        >
                          {isSelected && (
                            <span className="w-1 h-1 rounded-full bg-white" />
                          )}
                        </span>
                        {pm.provider || pm.type || "Method"}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          pm.status === "approved" || pm.isVerified
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {pm.status || (pm.isVerified ? "Verified" : "Pending")}
                      </span>
                    </div>
                    <div className="text-[12px] text-slate-600 bg-slate-50/50 p-2 rounded-xl border border-slate-100 mt-1 font-mono flex flex-col gap-1">
                      {(pm.accountNumber ||
                        pm.account ||
                        pm.phone ||
                        pm.walletNumber ||
                        pm.number) && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Account:</span>
                          <span className="font-bold text-slate-800">
                            {pm.accountNumber ||
                              pm.account ||
                              pm.phone ||
                              pm.walletNumber ||
                              pm.number}
                          </span>
                        </div>
                      )}
                      {(pm.accountHolderName || pm.nameOnAccount) && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Name:</span>
                          <span className="font-bold text-slate-800">
                            {pm.accountHolderName || pm.nameOnAccount}
                          </span>
                        </div>
                      )}
                      {pm.bankName && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bank:</span>
                          <span className="font-bold text-slate-800">
                            {pm.bankName}
                          </span>
                        </div>
                      )}
                      {pm.branchName && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Branch:</span>
                          <span className="font-bold text-slate-800">
                            {pm.branchName}
                          </span>
                        </div>
                      )}
                      {pm.binanceId && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Binance ID:</span>
                          <span className="font-bold text-slate-800">
                            {pm.binanceId}
                          </span>
                        </div>
                      )}
                      {!(
                        pm.accountNumber ||
                        pm.account ||
                        pm.phone ||
                        pm.walletNumber ||
                        pm.number
                      ) &&
                        !(pm.accountHolderName || pm.nameOnAccount) &&
                        !pm.bankName &&
                        !pm.binanceId && (
                          <div className="text-slate-400">
                            No details provided
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-6 py-5 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-[13px] font-bold text-slate-500 hover:bg-white hover:border-slate-300 transition-all disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedMethod)}
            disabled={loading || !selectedMethodId}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            Confirm Approve
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  description,
  loading,
  confirmText,
  confirmStyle = "bg-red-500 hover:bg-red-600 text-white",
  onClose,
  onConfirm,
}: any) {
  return (
    <ModalShell title={title} onClose={onClose} loading={loading}>
      <div className="text-center">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${confirmStyle.includes("red") ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"}`}
        >
          <AlertTriangle size={26} />
        </div>
        <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-60 ${confirmStyle}`}
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
    </ModalShell>
  );
}

/* ─── Mobile Card Row ─── */
function MobileWithdrawCard({
  m,
  busy,
  onDetails,
  onAction,
}: {
  m: UiWithdraw;
  busy: boolean;
  onDetails: () => void;
  onAction: (action: "approve" | "reject" | "delete") => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
      {/* Top row: user + status */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar name={m.user.name} src={m.user.photo} />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-gray-900 leading-none mb-0.5 truncate">
              {m.user.name}
            </p>
            <p className="text-[10px] text-gray-400 truncate">{m.user.email}</p>
          </div>
        </div>
        <StatusPill status={m.status} />
      </div>

      {/* Product */}
      <div className="bg-gray-50 rounded-xl px-3 py-2">
        <p className="text-[10px] text-gray-400 font-semibold mb-0.5">
          Product
        </p>
        <p className="text-[12px] font-bold text-gray-800 truncate">
          {m.productName}
        </p>
      </div>

      {/* Amounts */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-violet-50 rounded-xl px-2.5 py-2 text-center">
          <p className="text-[9px] text-violet-400 font-semibold uppercase mb-0.5">
            Student
          </p>
          <p className="text-[12px] font-extrabold text-violet-700">
            ৳{m.studentAmount}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl px-2.5 py-2 text-center">
          <p className="text-[9px] text-emerald-400 font-semibold uppercase mb-0.5">
            Admin
          </p>
          <p className="text-[12px] font-extrabold text-emerald-700">
            ৳{m.adminAmount}
          </p>
        </div>
        <div className="bg-gray-100 rounded-xl px-2.5 py-2 text-center">
          <p className="text-[9px] text-gray-400 font-semibold uppercase mb-0.5">
            Total
          </p>
          <p className="text-[12px] font-extrabold text-gray-800">
            ৳{m.totalAmount}
          </p>
        </div>
      </div>

      {/* Date + Actions */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <p className="text-[10px] text-gray-400 font-semibold">{m.createdAt}</p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onDetails}
            className="h-8 w-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Eye size={13} />
          </button>
          {m.status === "pending" && (
            <>
              <button
                disabled={busy}
                onClick={() => onAction("approve")}
                className="h-8 w-8 rounded-lg border border-emerald-200 bg-emerald-50 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 transition-colors"
              >
                <Check size={13} />
              </button>
              <button
                disabled={busy}
                onClick={() => onAction("reject")}
                className="h-8 w-8 rounded-lg border border-amber-200 bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100 disabled:opacity-50 transition-colors"
              >
                <X size={13} />
              </button>
            </>
          )}
          <button
            disabled={busy}
            onClick={() => onAction("delete")}
            className="h-8 w-8 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 disabled:opacity-50 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function WithdrawManager(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useAdminWithdrawsQuery({
    search,
    page,
    limit: PAGE_SIZE,
  });

  const [approve, { isLoading: isApproving }] =
    useAdminApproveWithdrawMutation();
  const [reject, { isLoading: isRejecting }] = useAdminRejectWithdrawMutation();
  const [direct, { isLoading: isDirecting }] = useAdminDirectWithdrawMutation();
  const [remove, { isLoading: isDeleting }] = useAdminDeleteWithdrawMutation();

  const list = useMemo(
    () => extractList(data).map(toUi).filter(Boolean) as UiWithdraw[],
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
  const approvedCount = list.filter(
    (m) => m.status === "approved" || m.status === "paid",
  ).length;
  const pendingCount = list.filter((m) => m.status === "pending").length;
  const rejectedCount = list.filter((m) => m.status === "rejected").length;

  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [actionTarget, setActionTarget] = useState<{
    id: number | string;
    action: "approve" | "reject" | "delete" | "direct";
    payload?: any;
  } | null>(null);

  const busy = isApproving || isRejecting || isDirecting || isDeleting;

  return (
    <>
      {detailsId !== null && (
        <DetailsModal
          id={detailsId}
          onClose={() => setDetailsId(null)}
          isBusy={busy}
          onApprove={(id) => {
            setActionTarget({ id, action: "approve" });
            setDetailsId(null);
          }}
          onReject={(id) => {
            setActionTarget({ id, action: "reject" });
            setDetailsId(null);
          }}
        />
      )}
      {actionTarget &&
        actionTarget.action === "approve" &&
        list.find((item) => item.id === actionTarget.id) && (
          <WithdrawApproveModal
            withdraw={list.find((item) => item.id === actionTarget.id)!}
            loading={busy}
            onClose={() => setActionTarget(null)}
            onConfirm={async (selectedMethod) => {
              await approve({ id: actionTarget.id }).unwrap();
              setActionTarget(null);
              refetch();
            }}
          />
        )}
      {actionTarget && actionTarget.action !== "approve" && (
        <ConfirmModal
          title={
            actionTarget.action === "direct"
              ? "Process Direct Payment?"
              : `${actionTarget.action.charAt(0).toUpperCase() + actionTarget.action.slice(1)} Withdraw?`
          }
          description={
            actionTarget.action === "direct"
              ? "Are you sure you want to process a direct payment?"
              : `Are you sure you want to ${actionTarget.action} this withdraw request?`
          }
          confirmText={
            actionTarget.action === "delete"
              ? "Delete"
              : actionTarget.action === "direct"
                ? "Process"
                : "Reject"
          }
          confirmStyle={
            actionTarget.action === "direct"
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }
          loading={busy}
          onClose={() => setActionTarget(null)}
          onConfirm={async () => {
            if (actionTarget.action === "direct")
              await direct(actionTarget.payload).unwrap();
            else if (actionTarget.action === "reject") {
              const reason = window.prompt(
                "Reason for rejection?",
                "Invalid details",
              );
              if (reason !== null)
                await reject({ id: actionTarget.id, reason }).unwrap();
            } else await remove(actionTarget.id).unwrap();
            setActionTarget(null);
            refetch();
          }}
        />
      )}

      <div className="min-h-screen bg-white p-3 sm:p-4 lg:p-6">
        {/* ═══ HEADER — fully updated ═══ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 sm:mb-5 overflow-hidden">
          {/* Top band */}
          <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-500 px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              {/* Left: icon + title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30">
                  <CreditCard size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-[17px] sm:text-[22px] font-extrabold text-white tracking-tight leading-none">
                    Withdraws & Payments
                  </h1>
                  <p className="text-[11px] sm:text-[12px] text-violet-200 mt-1 font-medium">
                    Manage requests · approve · reject · direct payments
                  </p>
                </div>
              </div>

              {/* Right: quick badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-sm">
                  <TrendingUp size={12} />
                  {totalCount} Total
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/30 text-amber-100 text-[11px] font-bold px-3 py-1.5 rounded-xl">
                  <Clock size={12} />
                  {pendingCount} Pending
                </span>
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl hover:bg-white/25 transition-colors"
                >
                  <RefreshCw size={12} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search bar — part of header card */}
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
                <Search size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by name or email..."
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
              {/* Filter button placeholder — can hook up later */}
              <button className="h-9 w-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0 shadow-sm">
                <Filter size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <StatCard
            label="Total Requests"
            value={totalCount}
            icon={CreditCard}
            variant="default"
          />
          <StatCard
            label="Approved/Paid"
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

        {/* ═══ TABLE — desktop only (md+) ═══ */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                {[
                  "User",
                  "Product",
                  "Amounts",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-[12px] text-gray-500 font-semibold"
                  >
                    <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2 text-violet-500" />{" "}
                    Loading...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                  >
                    Failed to load withdraws
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <CreditCard size={20} className="text-gray-400" />
                      </div>
                      <p className="text-[12px] text-gray-400 font-semibold">
                        No withdraw requests found.
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
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={m.user.name} src={m.user.photo} />
                        <div>
                          <p className="text-[13px] font-bold text-gray-900 leading-none mb-1">
                            {m.user.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {m.user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-[12px] font-semibold text-gray-800">
                        {m.productName}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-[11px] text-gray-500 font-semibold">
                        Student:{" "}
                        <span className="text-violet-600">
                          ৳{m.studentAmount}
                        </span>
                      </p>
                      <p className="text-[11px] text-gray-500 font-semibold">
                        Admin:{" "}
                        <span className="text-emerald-600">
                          ৳{m.adminAmount}
                        </span>
                      </p>
                      <p className="text-[11px] text-gray-500 font-semibold">
                        Total:{" "}
                        <span className="text-gray-800">৳{m.totalAmount}</span>
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusPill status={m.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-[11px] font-semibold text-gray-500">
                        {m.createdAt}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setDetailsId(m.id)}
                          className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        {m.status === "pending" && (
                          <>
                            <button
                              disabled={busy}
                              onClick={() =>
                                setActionTarget({ id: m.id, action: "approve" })
                              }
                              className="w-8 h-8 rounded-lg border border-emerald-200 bg-emerald-50 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              disabled={busy}
                              onClick={() =>
                                setActionTarget({ id: m.id, action: "reject" })
                              }
                              className="w-8 h-8 rounded-lg border border-amber-200 bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50"
                              title="Reject"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        <button
                          disabled={busy}
                          onClick={() =>
                            setActionTarget({ id: m.id, action: "delete" })
                          }
                          className="w-8 h-8 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
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

          {/* Desktop pagination */}
          <div className="px-4 py-3.5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[11px] text-gray-400 font-semibold">
              Showing{" "}
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
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[12px] font-bold text-gray-600 px-1">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE CARDS — below md ═══ */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-14 gap-2 text-gray-400">
              <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
              <p className="text-[12px] font-semibold">Loading...</p>
            </div>
          ) : isError ? (
            <div className="py-10 text-center text-[12px] text-red-500 font-semibold">
              Failed to load withdraws
            </div>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-14">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <CreditCard size={20} className="text-gray-400" />
              </div>
              <p className="text-[12px] text-gray-400 font-semibold">
                No withdraw requests found.
              </p>
            </div>
          ) : (
            list.map((m) => (
              <MobileWithdrawCard
                key={String(m.id)}
                m={m}
                busy={busy}
                onDetails={() => setDetailsId(m.id)}
                onAction={(action) => setActionTarget({ id: m.id, action })}
              />
            ))
          )}

          {/* Mobile pagination */}
          {list.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
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
                  className="h-8 w-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={15} />
                </button>
                <span className="text-[12px] font-bold text-gray-600">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="h-8 w-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
