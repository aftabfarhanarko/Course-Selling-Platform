"use client";

import React, { useState } from "react";
import {
  Search,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  Plus,
  Eye,
  Ban,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Download,
  Filter,
  X,
  AlertTriangle,
  Wallet,
  MoreHorizontal,
  Clock,
} from "lucide-react";

/* ─────────────────────────── types ─────────────────────────── */
type TxType = "CREDIT" | "DEBIT" | "DEPOSIT" | "WITHDRAW";
type TxStatus = "Completed" | "Pending" | "Failed" | "Refunded";

interface Transaction {
  id: string;
  user: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  amount: number;
  type: TxType;
  status: TxStatus;
  timestamp: string;
  reason?: string;
}

/* ─────────────────────────── seed ──────────────────────────── */
const seedTx: Transaction[] = [
  {
    id: "#TRX-892102",
    user: "Alex Rivera",
    initials: "AR",
    avatarBg: "#FEE2E2",
    avatarColor: "#EF4444",
    amount: 450,
    type: "DEPOSIT",
    status: "Completed",
    timestamp: "Oct 24, 2023 • 14:22",
    reason: "Wallet top-up",
  },
  {
    id: "#TRX-892101",
    user: "Sarah Jenkins",
    initials: "SJ",
    avatarBg: "#F3F4F6",
    avatarColor: "#6B7280",
    amount: -1200,
    type: "WITHDRAW",
    status: "Completed",
    timestamp: "Oct 24, 2023 • 12:05",
    reason: "User withdrawal",
  },
  {
    id: "#TRX-892099",
    user: "John Doe",
    initials: "JD",
    avatarBg: "#EEF2FF",
    avatarColor: "#6366F1",
    amount: 85.2,
    type: "CREDIT",
    status: "Completed",
    timestamp: "Oct 23, 2023 • 09:44",
    reason: "Referral bonus",
  },
  {
    id: "#TRX-892084",
    user: "Michael Chen",
    initials: "MC",
    avatarBg: "#F0FDF4",
    avatarColor: "#16A34A",
    amount: 2500,
    type: "DEPOSIT",
    status: "Pending",
    timestamp: "Oct 22, 2023 • 17:10",
    reason: "Bank transfer",
  },
  {
    id: "#TRX-892070",
    user: "Elena Ruiz",
    initials: "ER",
    avatarBg: "#FEF3C7",
    avatarColor: "#D97706",
    amount: -320,
    type: "WITHDRAW",
    status: "Failed",
    timestamp: "Oct 21, 2023 • 11:30",
    reason: "Insufficient funds",
  },
  {
    id: "#TRX-892055",
    user: "Omar Hassan",
    initials: "OH",
    avatarBg: "#EDE9FE",
    avatarColor: "#7C3AED",
    amount: 750,
    type: "CREDIT",
    status: "Completed",
    timestamp: "Oct 20, 2023 • 08:15",
    reason: "Commission payout",
  },
  {
    id: "#TRX-892041",
    user: "Priya Nair",
    initials: "PN",
    avatarBg: "#D1FAE5",
    avatarColor: "#059669",
    amount: -180,
    type: "DEBIT",
    status: "Refunded",
    timestamp: "Oct 19, 2023 • 16:45",
    reason: "Charge reversal",
  },
  {
    id: "#TRX-892030",
    user: "David Kim",
    initials: "DK",
    avatarBg: "#FCE7F3",
    avatarColor: "#DB2777",
    amount: 5000,
    type: "DEPOSIT",
    status: "Completed",
    timestamp: "Oct 18, 2023 • 10:00",
    reason: "Initial deposit",
  },
  {
    id: "#TRX-892020",
    user: "Nina Patel",
    initials: "NP",
    avatarBg: "#DBEAFE",
    avatarColor: "#2563EB",
    amount: -900,
    type: "WITHDRAW",
    status: "Pending",
    timestamp: "Oct 17, 2023 • 14:55",
    reason: "Pending review",
  },
  {
    id: "#TRX-892010",
    user: "Carlos Vega",
    initials: "CV",
    avatarBg: "#FFF7ED",
    avatarColor: "#EA580C",
    amount: 220,
    type: "CREDIT",
    status: "Completed",
    timestamp: "Oct 16, 2023 • 09:20",
    reason: "Bonus credit",
  },
  {
    id: "#TRX-891999",
    user: "Lena Müller",
    initials: "LM",
    avatarBg: "#F0FDF4",
    avatarColor: "#15803D",
    amount: -60,
    type: "DEBIT",
    status: "Completed",
    timestamp: "Oct 15, 2023 • 13:10",
    reason: "Service fee",
  },
  {
    id: "#TRX-891988",
    user: "Tom Hardy",
    initials: "TH",
    avatarBg: "#F8FAFC",
    avatarColor: "#475569",
    amount: 1100,
    type: "DEPOSIT",
    status: "Completed",
    timestamp: "Oct 14, 2023 • 11:00",
    reason: "Wire transfer",
  },
];

const PAGE_SIZE = 6;

const typeStyle: Record<TxType, string> = {
  DEPOSIT: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  WITHDRAW: "bg-rose-50 text-rose-700 border border-rose-200",
  CREDIT: "bg-blue-50 text-blue-700 border border-blue-200",
  DEBIT: "bg-orange-50 text-orange-700 border border-orange-200",
};

const statusStyle: Record<TxStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-red-50 text-red-600",
  Refunded: "bg-purple-50 text-purple-700",
};

const statusIcon: Record<TxStatus, React.ReactNode> = {
  Completed: <CheckCircle2 size={11} />,
  Pending: <Clock size={11} />,
  Failed: <XCircle size={11} />,
  Refunded: <RotateCcw size={11} />,
};

/* ──────────────── Action Dropdown ──────────────── */
function TxActionMenu({
  tx,
  onView,
  onRefund,
  onCancel,
}: {
  tx: Transaction;
  onView: () => void;
  onRefund: () => void;
  onCancel: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden py-1">
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-50"
            >
              <Eye size={13} className="text-gray-400" /> View Details
            </button>
            {tx.status === "Completed" && (
              <button
                onClick={() => {
                  onRefund();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-purple-600 hover:bg-purple-50"
              >
                <RotateCcw size={13} /> Refund
              </button>
            )}
            {tx.status === "Pending" && (
              <button
                onClick={() => {
                  onCancel();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-red-500 hover:bg-red-50"
              >
                <Ban size={13} /> Cancel
              </button>
            )}
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-50">
              <Download size={13} className="text-gray-400" /> Export Receipt
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ──────────────── View Detail Modal ──────────────── */
function TxDetailModal({
  tx,
  onClose,
}: {
  tx: Transaction;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div
          className={`h-2 w-full ${tx.amount >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
        />
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-extrabold text-gray-900">
              Transaction Details
            </h3>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Amount hero */}
          <div className="text-center py-4 mb-4 bg-gray-50 rounded-xl">
            <p
              className={`text-[30px] font-extrabold tracking-tight ${tx.amount >= 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[tx.status]}`}
              >
                {statusIcon[tx.status]} {tx.status}
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { label: "Transaction ID", value: tx.id },
              { label: "User", value: tx.user },
              { label: "Type", value: tx.type },
              { label: "Timestamp", value: tx.timestamp },
              { label: "Reason", value: tx.reason ?? "—" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-start justify-between py-2 border-b border-gray-50"
              >
                <span className="text-[11px] text-gray-400 font-medium">
                  {r.label}
                </span>
                <span className="text-[12px] font-semibold text-gray-800 text-right max-w-[60%]">
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-5 py-2.5 rounded-xl bg-indigo-600 text-white text-[12px] font-semibold hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── Confirm Modal ──────────────── */
function ConfirmModal({
  title,
  message,
  confirmLabel,
  confirmClass,
  onClose,
  onConfirm,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  confirmClass: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={22} className="text-amber-500" />
        </div>
        <h3 className="text-[15px] font-extrabold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-[12px] text-gray-500 leading-relaxed">{message}</p>
        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white text-[12px] font-semibold transition-colors ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════ MAIN PAGE ════════════════════════ */
export default function WalletPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(seedTx);
  const [adjustType, setAdjustType] = useState<
    "DEPOSIT" | "WITHDRAW" | "CREDIT" | "DEBIT"
  >("DEPOSIT");
  const [userSearch, setUserSearch] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // table
  const [txSearch, setTxSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  // modals
  const [viewTx, setViewTx] = useState<Transaction | null>(null);
  const [refundTx, setRefundTx] = useState<Transaction | null>(null);
  const [cancelTx, setCancelTx] = useState<Transaction | null>(null);

  /* ── toast helper ── */
  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  /* ── apply transaction ── */
  const handleApply = () => {
    if (!userSearch.trim())
      return showToast("Please enter a username or Wallet ID.", false);
    const val = parseFloat(amount);
    if (!val || val <= 0)
      return showToast("Please enter a valid amount.", false);

    const sign = adjustType === "WITHDRAW" || adjustType === "DEBIT" ? -1 : 1;
    const newTx: Transaction = {
      id: `#TRX-${Math.floor(900000 + Math.random() * 99999)}`,
      user: userSearch.trim(),
      initials: userSearch
        .trim()
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      avatarBg: "#EEF2FF",
      avatarColor: "#6366F1",
      amount: sign * val,
      type: adjustType,
      status: "Completed",
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      reason: reason.trim() || undefined,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(
      `✓ ${adjustType} of $${val.toFixed(2)} applied to "${userSearch}"`,
    );
    setUserSearch("");
    setAmount("");
    setReason("");
  };

  /* ── refund / cancel ── */
  const handleRefund = (tx: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === tx.id ? { ...t, status: "Refunded" } : t)),
    );
    setRefundTx(null);
    showToast(`Transaction ${tx.id} refunded.`);
  };
  const handleCancel = (tx: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === tx.id ? { ...t, status: "Failed" } : t)),
    );
    setCancelTx(null);
    showToast(`Transaction ${tx.id} cancelled.`, false);
  };

  /* ── filtered + paginated ── */
  const filtered = transactions.filter((tx) => {
    const q = txSearch.toLowerCase();
    const matchSearch =
      tx.id.toLowerCase().includes(q) || tx.user.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || tx.type === typeFilter;
    const matchStatus = statusFilter === "All" || tx.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── stats ── */
  const totalDeposits = transactions
    .filter((t) => t.amount > 0 && t.status === "Completed")
    .reduce((s, t) => s + t.amount, 0);
  const totalWithdraws = transactions
    .filter((t) => t.amount < 0 && t.status === "Completed")
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const pending = transactions.filter((t) => t.status === "Pending").length;

  return (
    <>
      {/* Modals */}
      {viewTx && <TxDetailModal tx={viewTx} onClose={() => setViewTx(null)} />}
      {refundTx && (
        <ConfirmModal
          title="Refund Transaction"
          message={`Refund $${Math.abs(refundTx.amount).toFixed(2)} to ${refundTx.user}?`}
          confirmLabel="Confirm Refund"
          confirmClass="bg-purple-600 hover:bg-purple-700"
          onClose={() => setRefundTx(null)}
          onConfirm={() => handleRefund(refundTx)}
        />
      )}
      {cancelTx && (
        <ConfirmModal
          title="Cancel Transaction"
          message={`Cancel pending transaction ${cancelTx.id} for ${cancelTx.user}?`}
          confirmLabel="Yes, Cancel"
          confirmClass="bg-red-500 hover:bg-red-600"
          onClose={() => setCancelTx(null)}
          onConfirm={() => handleCancel(cancelTx)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-[12px] font-semibold text-white max-w-xs transition-all ${toast.ok ? "bg-gray-900" : "bg-red-600"}`}
        >
          {toast.ok ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
          {toast.msg}
        </div>
      )}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              Wallet Management
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              Monitor balances, deposits & withdrawals
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-all">
            <Download size={13} /> Export Ledger
          </button>
        </div>

        {/* ── Top Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {/* Total Balance */}
          <div className="sm:col-span-2 lg:col-span-1 bg-blue-600 rounded-xl p-4 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Wallet size={14} className="text-white" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                Total Balance
              </p>
            </div>
            <p className="text-[24px] font-extrabold tracking-tight">
              $1,284,590
            </p>
            <p className="text-[10px] text-blue-300 mt-0.5 font-medium">
              Managed platform balance
            </p>
          </div>

          {/* Total Deposits */}
          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                <ArrowDownCircle size={14} className="text-emerald-600" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                Total Deposits
              </p>
            </div>
            <p className="text-[22px] font-extrabold text-gray-900">
              ${totalDeposits.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingUp size={11} className="text-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-bold">
                +12% this month
              </span>
            </div>
          </div>

          {/* Total Withdrawals */}
          <div className="bg-white rounded-xl p-4 border border-rose-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
                <ArrowUpCircle size={14} className="text-rose-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500">
                Withdrawals
              </p>
            </div>
            <p className="text-[22px] font-extrabold text-gray-900">
              ${totalWithdraws.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingDown size={11} className="text-rose-500" />
              <span className="text-[10px] text-rose-500 font-bold">
                -4% this month
              </span>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock size={14} className="text-amber-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                Pending TXNs
              </p>
            </div>
            <p className="text-[22px] font-extrabold text-gray-900">
              {pending}
            </p>
            <p className="text-[10px] text-amber-500 font-bold mt-0.5">
              Awaiting review
            </p>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* ── Left: Adjustment Form + Trust ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Manual Adjustment */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-[14px] font-extrabold text-gray-900">
                Manual Adjustment
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5 mb-4">
                Add or remove funds from any account.
              </p>

              {/* Type toggle — 4 options */}
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Transaction Type
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["DEPOSIT", "WITHDRAW", "CREDIT", "DEBIT"] as const).map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setAdjustType(t)}
                        className={`py-2 rounded-xl text-[11px] font-bold border-2 transition-all ${
                          adjustType === t
                            ? t === "DEPOSIT" || t === "CREDIT"
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200"
                              : "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {t === "DEPOSIT" && (
                          <ArrowDownCircle size={11} className="inline mr-1" />
                        )}
                        {t === "WITHDRAW" && (
                          <ArrowUpCircle size={11} className="inline mr-1" />
                        )}
                        {t === "CREDIT" && (
                          <Plus size={11} className="inline mr-1" />
                        )}
                        {t === "DEBIT" && (
                          <DollarSign size={11} className="inline mr-1" />
                        )}
                        {t}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* User */}
              <div className="mb-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  User / Wallet ID
                </label>
                <div className="relative">
                  <Search
                    size={12}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Username or Wallet ID"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="mb-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign
                    size={12}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Reason / Reference
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain the reason…"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                />
              </div>

              <button
                onClick={handleApply}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[13px] font-bold shadow-lg shadow-blue-200 transition-all"
              >
                Apply Transaction
              </button>
            </div>

            {/* Trust Protocol */}
            {/* <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3">
                <ShieldCheck size={18} className="text-emerald-600" />
              </div>
              <h3 className="text-[13px] font-extrabold text-gray-900 mb-1">
                Trust Protocol
              </h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                All manual adjustments are logged with immutable timestamps and
                admin ID tracking for full audit compliance.
              </p>
              <button className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View Audit Log <ArrowRight size={12} />
              </button>
            </div> */}
          </div>

          {/* ── Right: Transaction Table ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3.5 border-b border-gray-100">
              <div>
                <h2 className="text-[13px] font-extrabold text-gray-900">
                  Transaction History
                </h2>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Real-time ledger of all wallet activities
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={12}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search ID, user…"
                    value={txSearch}
                    onChange={(e) => {
                      setTxSearch(e.target.value);
                      setPage(1);
                    }}
                    className="h-8 w-36 pl-7 pr-3 text-[11px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                {/* Filter */}
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className={`flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[11px] font-semibold transition-colors ${filterOpen || typeFilter !== "All" || statusFilter !== "All" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                  >
                    <Filter size={12} /> Filter
                  </button>
                  {filterOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setFilterOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-3 w-48">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          Type
                        </p>
                        {["All", "DEPOSIT", "WITHDRAW", "CREDIT", "DEBIT"].map(
                          (f) => (
                            <button
                              key={f}
                              onClick={() => {
                                setTypeFilter(f);
                                setPage(1);
                              }}
                              className={`w-full text-left px-2 py-1.5 text-[11px] font-medium rounded-lg mb-0.5 transition-colors ${typeFilter === f ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                            >
                              {f}
                            </button>
                          ),
                        )}
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 mb-1.5">
                          Status
                        </p>
                        {[
                          "All",
                          "Completed",
                          "Pending",
                          "Failed",
                          "Refunded",
                        ].map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setStatusFilter(s);
                              setPage(1);
                            }}
                            className={`w-full text-left px-2 py-1.5 text-[11px] font-medium rounded-lg mb-0.5 transition-colors ${statusFilter === s ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    {[
                      "TXN ID",
                      "User",
                      "Amount",
                      "Type",
                      "Status",
                      "Timestamp",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-3 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-[12px] text-gray-400"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((tx) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-blue-50/20 transition-colors"
                      >
                        <td className="px-3 py-3">
                          <span className="text-[11px] font-bold text-blue-600">
                            {tx.id}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0"
                              style={{
                                background: tx.avatarBg,
                                color: tx.avatarColor,
                              }}
                            >
                              {tx.initials}
                            </div>
                            <span className="text-[12px] font-medium text-gray-800 whitespace-nowrap">
                              {tx.user}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`text-[12px] font-extrabold ${tx.amount >= 0 ? "text-emerald-600" : "text-rose-500"}`}
                          >
                            {tx.amount >= 0 ? "+" : ""}$
                            {Math.abs(tx.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${typeStyle[tx.type]}`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[tx.status]}`}
                          >
                            {statusIcon[tx.status]} {tx.status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">
                            {tx.timestamp}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <TxActionMenu
                            tx={tx}
                            onView={() => setViewTx(tx)}
                            onRefund={() => setRefundTx(tx)}
                            onCancel={() => setCancelTx(tx)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-gray-100">
              {paginated.map((tx) => (
                <div key={tx.id} className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-600">
                      {tx.id}
                    </span>
                    <TxActionMenu
                      tx={tx}
                      onView={() => setViewTx(tx)}
                      onRefund={() => setRefundTx(tx)}
                      onCancel={() => setCancelTx(tx)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                      style={{ background: tx.avatarBg, color: tx.avatarColor }}
                    >
                      {tx.initials}
                    </div>
                    <span className="text-[12px] font-medium text-gray-800">
                      {tx.user}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[13px] font-extrabold ${tx.amount >= 0 ? "text-emerald-600" : "text-rose-500"}`}
                    >
                      {tx.amount >= 0 ? "+" : ""}$
                      {Math.abs(tx.amount).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex px-1.5 py-0.5 rounded-full text-[10px] font-bold ${typeStyle[tx.type]}`}
                      >
                        {tx.type}
                      </span>
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[tx.status]}`}
                      >
                        {statusIcon[tx.status]}
                        {tx.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400">{tx.timestamp}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3.5 border-t border-gray-100">
              <p className="text-[11px] text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-700">
                  {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
                  {Math.min(page * PAGE_SIZE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-700">
                  {filtered.length}
                </span>{" "}
                transactions
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={13} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition-colors ${
                        page === p
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
