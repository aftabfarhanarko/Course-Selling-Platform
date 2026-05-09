"use client";

import React, { useState } from "react";
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
} from "lucide-react";

type CouponStatus = "Active" | "Expired";
type FilterTab = "All" | "Active" | "Expired";

interface Coupon {
  id: number;
  code: string;
  description: string;
  status: CouponStatus;
  discountLabel: string;
  discountValue: string;
  usage: number;
  maxUsage: number;
  expiry: string;
}

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "ARCHITECT50",
    description: "Global Site Launch Discount",
    status: "Active",
    discountLabel: "DISCOUNT",
    discountValue: "50% OFF",
    usage: 724,
    maxUsage: 1000,
    expiry: "Oct 24, 2024",
  },
  {
    id: 2,
    code: "EARLYBIRD100",
    description: "Influencer Partner Code",
    status: "Active",
    discountLabel: "DISCOUNT",
    discountValue: "$100.00",
    usage: 152,
    maxUsage: 500,
    expiry: "Dec 12, 2024",
  },
  {
    id: 3,
    code: "SUMMER20",
    description: "Summer 2023 Campaign",
    status: "Expired",
    discountLabel: "DISCOUNT",
    discountValue: "20% OFF",
    usage: 2000,
    maxUsage: 2000,
    expiry: "Aug 31, 2023",
  },
];

export default function Couponspage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [filter, setFilter] = useState<FilterTab>("All");
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newExpiry, setNewExpiry] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleDelete = (id: number) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast("Coupon deleted.");
  };

  const handleReactivate = (id: number) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Active" } : c))
    );
    showToast("Coupon reactivated.");
  };

  const handleCreate = () => {
    if (!newCode.trim() || !newDiscount.trim() || !newExpiry.trim()) {
      showToast("Please fill all required fields.");
      return;
    }
    const coupon: Coupon = {
      id: Date.now(),
      code: newCode.toUpperCase(),
      description: newDesc || "New Campaign",
      status: "Active",
      discountLabel: "DISCOUNT",
      discountValue: newDiscount,
      usage: 0,
      maxUsage: 1000,
      expiry: newExpiry,
    };
    setCoupons((prev) => [coupon, ...prev]);
    setShowModal(false);
    setNewCode("");
    setNewDesc("");
    setNewDiscount("");
    setNewExpiry("");
    showToast("✓ New coupon created successfully!");
  };

  const filtered = coupons.filter((c) =>
    filter === "All" ? true : c.status === filter
  );

  const activeCoupons = coupons.filter((c) => c.status === "Active").length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + c.usage, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl">
          {toast}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Create New Coupon
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. SAVE30"
                  className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Description
                </label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="e.g. Summer Campaign"
                  className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Discount Value *
                </label>
                <input
                  type="text"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  placeholder="e.g. 30% OFF or $50.00"
                  className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  placeholder="e.g. Dec 31, 2025"
                  className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-0.5 bg-blue-600 rounded" />
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Management
            </p>
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            Promotion Coupons
          </h1>
          <p className="text-sm text-gray-500 mt-1.5 max-w-xs leading-relaxed">
            Manage your active discount campaigns and architect high-conversion
            customer incentives.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm self-start"
        >
          <Plus size={16} />
          Create New Coupon
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Campaign Performance */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">
            Campaign Performance
          </p>
          <p className="text-4xl font-black text-gray-900 mb-2">84.2%</p>
          <p className="flex items-center gap-1 text-xs font-semibold text-green-600">
            <TrendingUp size={12} />
            12% conversion boost this month
          </p>
        </div>

        {/* Total Redemptions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col items-start justify-between">
          <div className="w-10 h-10 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center mb-3">
            <Gift size={18} className="text-green-600" />
          </div>
          <p className="text-3xl font-black text-gray-900">
            {totalRedemptions.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Redemptions</p>
        </div>

        {/* Active Coupons */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col items-start justify-between">
          <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center mb-3">
            <Clock size={18} className="text-blue-600" />
          </div>
          <p className="text-3xl font-black text-gray-900">{activeCoupons}</p>
          <p className="text-sm text-gray-500 mt-1">Active Coupons</p>
        </div>
      </div>

      {/* Live Inventories */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Live Inventories</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            {(["All", "Active", "Expired"] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  filter === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Coupon Rows */}
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">
              No coupons found.
            </p>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 hover:bg-gray-50/60 transition-colors"
              >
                {/* Code + Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-black tracking-widest ${
                        c.status === "Expired"
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {c.code}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        c.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {c.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>
                </div>

                {/* Discount */}
                <div className="sm:w-28">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    {c.discountLabel}
                  </p>
                  <p
                    className={`text-sm font-black ${
                      c.status === "Expired"
                        ? "text-gray-500"
                        : "text-green-600"
                    }`}
                  >
                    {c.discountValue}
                  </p>
                </div>

                {/* Usage Bar */}
                <div className="sm:w-40">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    Usage
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          c.status === "Expired" ? "bg-gray-300" : "bg-blue-600"
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            (c.usage / c.maxUsage) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {c.usage.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Expiry */}
                <div className="sm:w-36">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    Expiry Date
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <Calendar size={12} className="text-gray-400" />
                    {c.expiry}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {c.status === "Active" ? (
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                      <Pencil size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivate(c.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 transition-colors text-gray-400 hover:text-green-600"
                      title="Reactivate"
                    >
                      <RefreshCw size={15} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Architect Your Next Win */}
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-white/50">
        <div className="w-10 h-10 flex items-center justify-center mb-4 text-gray-300">
          <Sparkles size={32} />
        </div>
        <h3 className="text-base font-black text-gray-900 mb-1">
          Architect Your Next Win
        </h3>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          Dynamic coupons drive 40% more repeat enrollment. Start your next
          seasonal push today.
        </p>
      </div>
    </div>
  );
}

// export default Couponspage;