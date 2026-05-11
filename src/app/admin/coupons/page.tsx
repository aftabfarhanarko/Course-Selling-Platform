"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Calendar,
  Gift,
  Clock,
  Sparkles,
  TrendingUp,
  X,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Search,
  Tag,
  Percent,
  DollarSign,
  Hash,
} from "lucide-react";

type CouponStatus = "Active" | "Expired";
type FilterTab = "All" | "Active" | "Expired";
type DiscountType = "percent" | "fixed";

interface Coupon {
  id: number;
  code: string;
  description: string;
  status: CouponStatus;
  discountType: DiscountType;
  discountAmount: number;
  usage: number;
  maxUsage: number;
  expiry: string;
  expiryRaw: string;
}

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "ARCHITECT50",
    description: "Global Site Launch Discount",
    status: "Active",
    discountType: "percent",
    discountAmount: 50,
    usage: 724,
    maxUsage: 1000,
    expiry: "Oct 24, 2024",
    expiryRaw: "2024-10-24",
  },
  {
    id: 2,
    code: "EARLYBIRD100",
    description: "Influencer Partner Code",
    status: "Active",
    discountType: "fixed",
    discountAmount: 100,
    usage: 152,
    maxUsage: 500,
    expiry: "Dec 12, 2024",
    expiryRaw: "2024-12-12",
  },
  {
    id: 3,
    code: "SUMMER20",
    description: "Summer 2023 Campaign",
    status: "Expired",
    discountType: "percent",
    discountAmount: 20,
    usage: 2000,
    maxUsage: 2000,
    expiry: "Aug 31, 2023",
    expiryRaw: "2023-08-31",
  },
  {
    id: 4,
    code: "FLASH75",
    description: "Weekend Flash Sale",
    status: "Active",
    discountType: "percent",
    discountAmount: 75,
    usage: 89,
    maxUsage: 200,
    expiry: "Nov 30, 2024",
    expiryRaw: "2024-11-30",
  },
  {
    id: 5,
    code: "WELCOME25",
    description: "New User Welcome Offer",
    status: "Active",
    discountType: "fixed",
    discountAmount: 25,
    usage: 441,
    maxUsage: 999,
    expiry: "Jan 31, 2025",
    expiryRaw: "2025-01-31",
  },
  {
    id: 6,
    code: "BLACKFRI",
    description: "Black Friday 2023",
    status: "Expired",
    discountType: "percent",
    discountAmount: 60,
    usage: 5000,
    maxUsage: 5000,
    expiry: "Nov 25, 2023",
    expiryRaw: "2023-11-25",
  },
];

const formatExpiry = (raw: string) => {
  const d = new Date(raw);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

interface FormData {
  code: string;
  description: string;
  discountType: DiscountType;
  discountAmount: number;
  maxUsage: number;
  expiryRaw: string;
  status: CouponStatus;
}

const emptyForm = (): FormData => ({
  code: "",
  description: "",
  discountType: "percent",
  discountAmount: 0,
  maxUsage: 1000,
  expiryRaw: "",
  status: "Active",
});

function Toast({
  msg,
  type,
}: {
  msg: string;
  type: "success" | "error" | "info";
}) {
  const bg = {
    success: "bg-emerald-600",
    error: "bg-red-500",
    info: "bg-gray-900",
  }[type];
  const Icon =
    type === "success"
      ? CheckCircle
      : type === "error"
        ? AlertCircle
        : Sparkles;
  return (
    <div
      className={`fixed top-5 right-5 z-[100] text-white text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 ${bg}`}
    >
      <Icon size={15} />
      {msg}
    </div>
  );
}

function CouponModal({
  mode,
  coupon,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  coupon?: Coupon;
  onClose: () => void;
  onSave: (data: FormData) => void;
}) {
  const [form, setForm] = useState<FormData>(
    coupon
      ? {
          code: coupon.code,
          description: coupon.description,
          discountType: coupon.discountType,
          discountAmount: coupon.discountAmount,
          maxUsage: coupon.maxUsage,
          expiryRaw: coupon.expiryRaw,
          status: coupon.status,
        }
      : emptyForm(),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const set = (k: keyof FormData, v: any) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.code.trim()) e.code = "Coupon code is required.";
    if (form.discountAmount <= 0)
      e.discountAmount = "Discount must be greater than 0.";
    if (form.discountType === "percent" && form.discountAmount > 100)
      e.discountAmount = "Percentage cannot exceed 100.";
    if (form.maxUsage <= 0) e.maxUsage = "Max usage must be at least 1.";
    if (!form.expiryRaw) e.expiryRaw = "Expiry date is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {mode === "add" ? "New Coupon" : "Edit Coupon"}
            </p>
            <h2 className="text-base font-bold text-gray-900 mt-0.5">
              {mode === "add"
                ? "Create Promotion Code"
                : `Editing: ${coupon?.code}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400"
          >
            <X size={15} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Code */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Coupon Code *
            </label>
            <div className="relative">
              <Tag
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={form.code}
                onChange={(e) => set("code", e.target.value.toUpperCase())}
                placeholder="e.g. SAVE30"
                className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 font-mono tracking-widest ${errors.code ? "border-red-300" : "border-gray-200"}`}
              />
            </div>
            {errors.code && (
              <p className="text-xs text-red-500 mt-1">{errors.code}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Description
            </label>
            <input
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="e.g. Summer Campaign 2025"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Discount Type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["percent", "Percentage (%)", Percent],
                  ["fixed", "Fixed Amount ($)", DollarSign],
                ] as [DiscountType, string, any][]
              ).map(([val, label, Icon]) => (
                <button
                  key={val}
                  onClick={() => set("discountType", val)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${form.discountType === val ? "bg-blue-50 border-blue-300 text-blue-700" : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Amount + Max Usage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                {form.discountType === "percent"
                  ? "Percentage *"
                  : "Amount (USD) *"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  {form.discountType === "percent" ? "%" : "$"}
                </span>
                <input
                  type="number"
                  min="1"
                  max={form.discountType === "percent" ? 100 : undefined}
                  value={form.discountAmount || ""}
                  onChange={(e) =>
                    set("discountAmount", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0"
                  className={`w-full pl-7 pr-3 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.discountAmount ? "border-red-300" : "border-gray-200"}`}
                />
              </div>
              {errors.discountAmount && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.discountAmount}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Max Usage *
              </label>
              <div className="relative">
                <Hash
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="number"
                  min="1"
                  value={form.maxUsage || ""}
                  onChange={(e) =>
                    set("maxUsage", parseInt(e.target.value) || 0)
                  }
                  className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.maxUsage ? "border-red-300" : "border-gray-200"}`}
                />
              </div>
              {errors.maxUsage && (
                <p className="text-xs text-red-500 mt-1">{errors.maxUsage}</p>
              )}
            </div>
          </div>

          {/* Expiry */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Expiry Date *
            </label>
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                value={form.expiryRaw}
                onChange={(e) => set("expiryRaw", e.target.value)}
                className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.expiryRaw ? "border-red-300" : "border-gray-200"}`}
              />
            </div>
            {errors.expiryRaw && (
              <p className="text-xs text-red-500 mt-1">{errors.expiryRaw}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["Active", "Expired"] as CouponStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => set("status", s)}
                  className={`py-2.5 rounded-xl border text-sm font-semibold transition-colors ${form.status === s ? (s === "Active" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-gray-100 border-gray-300 text-gray-600") : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button
            onClick={() => {
              if (validate()) onSave(form);
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {mode === "add" ? (
              <>
                <Plus size={15} />
                Create Coupon
              </>
            ) : (
              <>
                <CheckCircle size={15} />
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({
  coupon,
  onClose,
  onConfirm,
}: {
  coupon: Coupon;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-gray-900 text-center mb-1">
          Delete Coupon
        </h3>
        <p className="text-sm text-gray-500 text-center mb-5 leading-relaxed">
          Delete{" "}
          <span className="font-bold text-gray-800 font-mono">
            {coupon.code}
          </span>
          ? This cannot be undone and all usage data will be lost.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      title="Copy code"
      className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${copied ? "bg-emerald-50 text-emerald-600" : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export default function Couponspage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [filter, setFilter] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);
  const nextId = useRef(initialCoupons.length + 1);

  const showToast = (
    msg: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (data: FormData) => {
    const discountValue =
      data.discountType === "percent"
        ? `${data.discountAmount}% OFF`
        : `$${data.discountAmount.toFixed(2)}`;
    const expiry = formatExpiry(data.expiryRaw);
    if (modalMode === "add") {
      setCoupons((p) => [
        {
          id: nextId.current++,
          code: data.code,
          description: data.description || "New Campaign",
          status: data.status,
          discountType: data.discountType,
          discountAmount: data.discountAmount,
          usage: 0,
          maxUsage: data.maxUsage,
          expiry,
          expiryRaw: data.expiryRaw,
        },
        ...p,
      ]);
      showToast("Coupon created successfully!", "success");
    } else if (editingCoupon) {
      setCoupons((p) =>
        p.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                code: data.code,
                description: data.description,
                status: data.status,
                discountType: data.discountType,
                discountAmount: data.discountAmount,
                maxUsage: data.maxUsage,
                expiry,
                expiryRaw: data.expiryRaw,
              }
            : c,
        ),
      );
      showToast("Coupon updated successfully!", "success");
    }
    setModalMode(null);
    setEditingCoupon(null);
  };

  const handleDelete = (coupon: Coupon) => {
    setCoupons((p) => p.filter((c) => c.id !== coupon.id));
    setDeleteTarget(null);
    showToast("Coupon deleted.", "error");
  };

  const handleReactivate = (id: number) => {
    setCoupons((p) =>
      p.map((c) => (c.id === id ? { ...c, status: "Active" } : c)),
    );
    showToast("Coupon reactivated!", "success");
  };

  const handleExpire = (id: number) => {
    setCoupons((p) =>
      p.map((c) => (c.id === id ? { ...c, status: "Expired" } : c)),
    );
    showToast("Coupon expired.", "info");
  };

  const filtered = useMemo(
    () =>
      coupons.filter((c) => {
        const matchFilter = filter === "All" || c.status === filter;
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          c.code.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q);
        return matchFilter && matchSearch;
      }),
    [coupons, filter, search],
  );

  const activeCoupons = coupons.filter((c) => c.status === "Active").length;
  const totalRedemptions = coupons.reduce((s, c) => s + c.usage, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {toast && <Toast {...toast} />}

      {modalMode && (
        <CouponModal
          mode={modalMode}
          coupon={editingCoupon ?? undefined}
          onClose={() => {
            setModalMode(null);
            setEditingCoupon(null);
          }}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          coupon={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget)}
        />
      )}

      <div className=" mx-auto p-4 md:p-6 lg:p-8">
        {/* iuwehfi */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-0.5 bg-blue-600 rounded" />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Management
              </p>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              Promotion Coupons
            </h1>
            <p className="text-sm text-gray-500 mt-1.5 max-w-xs leading-relaxed">
              Manage your active discount campaigns and architect
              high-conversion customer incentives.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingCoupon(null);
              setModalMode("add");
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm self-start shadow-sm"
          >
            <Plus size={16} /> Create New Coupon
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">
              Campaign Performance
            </p>
            <p className="text-4xl font-black text-gray-900 mb-2">84.2%</p>
            <p className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <TrendingUp size={12} /> 12% conversion boost this month
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-3">
              <Gift size={18} className="text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-gray-900">
              {totalRedemptions.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Redemptions</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Clock size={18} className="text-blue-600" />
            </div>
            <p className="text-3xl font-black text-gray-900">{activeCoupons}</p>
            <p className="text-sm text-gray-500 mt-1">Active Coupons</p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">
                Live Inventories
              </h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                {filtered.length}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search codes..."
                  className="pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 w-36"
                />
              </div>
              {/* Filter Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {(["All", "Active", "Expired"] as FilterTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${filter === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <div className="text-center py-14">
                <Tag size={28} className="mx-auto mb-2 text-gray-200" />
                <p className="text-sm text-gray-400">No coupons found.</p>
              </div>
            ) : (
              filtered.map((c) => {
                const usagePct = Math.min(100, (c.usage / c.maxUsage) * 100);
                const discountLabel =
                  c.discountType === "percent"
                    ? `${c.discountAmount}% OFF`
                    : `$${c.discountAmount.toFixed(2)}`;
                const isNearLimit = usagePct >= 80 && c.status === "Active";
                return (
                  <div
                    key={c.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Code */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-black tracking-widest font-mono ${c.status === "Expired" ? "text-gray-400" : "text-gray-900"}`}
                        >
                          {c.code}
                        </span>
                        <CopyButton code={c.code} />
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                        >
                          {c.status.toUpperCase()}
                        </span>
                        {isNearLimit && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            NEAR LIMIT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {c.description}
                      </p>
                    </div>

                    {/* Discount */}
                    <div className="sm:w-28">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        Discount
                      </p>
                      <p
                        className={`text-sm font-black ${c.status === "Expired" ? "text-gray-400" : "text-emerald-600"}`}
                      >
                        {discountLabel}
                      </p>
                    </div>

                    {/* Usage Bar */}
                    <div className="sm:w-44">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                          Usage
                        </p>
                        <span className="text-xs text-gray-500 font-medium">
                          {c.usage.toLocaleString()} /{" "}
                          {c.maxUsage.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${c.status === "Expired" ? "bg-gray-300" : isNearLimit ? "bg-amber-400" : "bg-blue-500"}`}
                          style={{ width: `${usagePct}%` }}
                        />
                      </div>
                    </div>

                    {/* Expiry */}
                    <div className="sm:w-36">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        Expiry Date
                      </p>
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Calendar size={11} className="text-gray-400" />
                        {c.expiry}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {c.status === "Active" ? (
                        <>
                          <button
                            onClick={() => {
                              setEditingCoupon(c);
                              setModalMode("edit");
                            }}
                            title="Edit"
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-600"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleExpire(c.id)}
                            title="Mark as Expired"
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 transition-colors text-gray-400 hover:text-amber-600"
                          >
                            <Clock size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleReactivate(c.id)}
                            title="Reactivate"
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 transition-colors text-gray-400 hover:text-emerald-600"
                          >
                            <RefreshCw size={14} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setDeleteTarget(c)}
                        title="Delete"
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-white/50 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors group"
          onClick={() => {
            setEditingCoupon(null);
            setModalMode("add");
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center mb-4 text-gray-300 group-hover:text-blue-400 transition-colors">
            <Sparkles size={32} />
          </div>
          <h3 className="text-base font-black text-gray-900 mb-1">
            Architect Your Next Win
          </h3>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Dynamic coupons drive 40% more repeat enrollment. Start your next
            seasonal push today.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
            <Plus size={13} /> Create New Coupon
          </span>
        </div>
      </div>
    </div>
  );
}
