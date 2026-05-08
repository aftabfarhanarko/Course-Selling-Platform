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
} from "lucide-react";

const transactions = [
    {
        id: "#TRX-892102",
        user: "Alex Rivera",
        initials: "AR",
        avatarBg: "#FEE2E2",
        avatarColor: "#EF4444",
        amount: "$450.00",
        rawAmount: 450,
        type: "CREDIT",
        timestamp: "Oct 24, 2023 • 14:22",
    },
    {
        id: "#TRX-892101",
        user: "Sarah Jenkins",
        initials: "SJ",
        avatarBg: "#F3F4F6",
        avatarColor: "#6B7280",
        amount: "-$1,200.00",
        rawAmount: -1200,
        type: "DEBIT",
        timestamp: "Oct 24, 2023 • 12:05",
    },
    {
        id: "#TRX-892099",
        user: "John Doe",
        initials: "JD",
        avatarBg: "#EEF2FF",
        avatarColor: "#6366F1",
        amount: "$85.20",
        rawAmount: 85.2,
        type: "CREDIT",
        timestamp: "Oct 23, 2023 • 09:44",
    },
    {
        id: "#TRX-892084",
        user: "Michael Chen",
        initials: "MC",
        avatarBg: "#F0FDF4",
        avatarColor: "#16A34A",
        amount: "$2,500.00",
        rawAmount: 2500,
        type: "CREDIT",
        timestamp: "Oct 22, 2023 • 17:10",
    },
];

export default function Walletpage() {
    const [adjustType, setAdjustType] = useState<"Credit" | "Debit">("Credit");
    const [userSearch, setUserSearch] = useState("");
    const [amount, setAmount] = useState("0.00");
    const [reason, setReason] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [toast, setToast] = useState("");

    const handleApply = () => {
        if (!userSearch.trim()) {
            setToast("Please enter a username or Wallet ID.");
            setTimeout(() => setToast(""), 3000);
            return;
        }
        if (!parseFloat(amount) || parseFloat(amount) <= 0) {
            setToast("Please enter a valid amount.");
            setTimeout(() => setToast(""), 3000);
            return;
        }
        setToast(
            `✓ ${adjustType} of $${parseFloat(amount).toFixed(2)} applied to "${userSearch}"`
        );
        setTimeout(() => setToast(""), 4000);
        setUserSearch("");
        setAmount("0.00");
        setReason("");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans relative">
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl max-w-sm">
                    {toast}
                </div>
            )}

            {/* Top Row: Balance Card + Trust Protocol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Balance Card */}
                <div className="bg-blue-600 rounded-2xl p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">
                        Total Managed Balance
                    </p>
                    <p className="text-4xl font-bold tracking-tight mb-5">
                        $1,284,590.00
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <div className="bg-blue-500/60 rounded-xl px-4 py-2.5">
                            <p className="text-xs text-blue-200 uppercase tracking-wide font-semibold mb-1">
                                System Credits
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-base font-bold">+$42.5k</span>
                                <span className="flex items-center gap-0.5 text-xs text-blue-200">
                                    <TrendingUp size={11} /> 12%
                                </span>
                            </div>
                        </div>
                        <div className="bg-blue-500/60 rounded-xl px-4 py-2.5">
                            <p className="text-xs text-blue-200 uppercase tracking-wide font-semibold mb-1">
                                Manual Adjustments
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-base font-bold">-$12.2k</span>
                                <span className="flex items-center gap-0.5 text-xs text-blue-200">
                                    <TrendingDown size={11} /> 4%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Protocol */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center mb-3">
                            <ShieldCheck size={20} className="text-green-600" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">
                            Trust Protocol
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            All manual adjustments are logged with immutable timestamps and
                            admin ID tracking for full audit compliance.
                        </p>
                    </div>
                    <button className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        View Audit Log <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* Bottom Row: Manual Adjustment + Transaction History */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Manual Adjustment Form */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900">
                        Manual Adjustment
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 mb-6">
                        Add or remove funds from a specific user account.
                    </p>

                    {/* User Search */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            User Search
                        </label>
                        <div className="relative">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Username or Wallet ID"
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    {/* Adjustment Type Toggle */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Adjustment Type
                        </label>
                        <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                            {(["Credit", "Debit"] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setAdjustType(t)}
                                    className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${adjustType === t
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Amount (USD)
                        </label>
                        <div className="relative">
                            <DollarSign
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Reason / Reference
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Explain the reason for this manual entry..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                        />
                    </div>

                    <button
                        onClick={handleApply}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-colors text-sm"
                    >
                        Apply Transaction
                    </button>
                </div>

                {/* Transaction History */}
                <div className="md:col-span-3 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Transaction History
                            </h2>
                            <p className="text-sm text-gray-400 mt-0.5">
                                Real-time ledger of all wallet activities.
                            </p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                            <SlidersHorizontal size={16} />
                        </button>
                    </div>

                    {/* Table */}
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    {["TXN ID", "User", "Amount", "Type", "Timestamp"].map(
                                        (h) => (
                                            <th
                                                key={h}
                                                className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 first:pr-2"
                                            >
                                                {h}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3.5 pr-2">
                                            <span className="text-blue-600 font-semibold text-xs">
                                                {tx.id}
                                            </span>
                                        </td>
                                        <td className="py-3.5 pr-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                                    style={{
                                                        background: tx.avatarBg,
                                                        color: tx.avatarColor,
                                                    }}
                                                >
                                                    {tx.initials}
                                                </div>
                                                <span className="font-medium text-gray-800 whitespace-nowrap">
                                                    {tx.user}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 pr-4">
                                            <span
                                                className={`font-semibold ${tx.rawAmount < 0
                                                        ? "text-red-500"
                                                        : "text-gray-900"
                                                    }`}
                                            >
                                                {tx.amount}
                                            </span>
                                        </td>
                                        <td className="py-3.5 pr-4">
                                            <span
                                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${tx.type === "CREDIT"
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-600"
                                                    }`}
                                            >
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="py-3.5 text-gray-400 text-xs whitespace-nowrap">
                                            {tx.timestamp}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-1 mt-6">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        {[1, 2, 3].map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === p
                                        ? "bg-blue-600 text-white"
                                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                            ...
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}