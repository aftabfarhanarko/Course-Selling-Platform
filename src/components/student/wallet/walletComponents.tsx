"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  Landmark,
  TrendingUp,
  Wallet,
  MoreHorizontal,
  Plus,
  ArrowRight,
  CircleDollarSign,
  Activity,
} from "lucide-react";

const chartData = [
  { month: "Jul", value: 35, amount: 3200 },
  { month: "Aug", value: 55, amount: 5100 },
  { month: "Sep", value: 40, amount: 3800 },
  { month: "Oct", value: 75, amount: 7200 },
  { month: "Nov", value: 60, amount: 5800 },
  { month: "Dec", value: 85, amount: 8420 },
];

const recentActivities = [
  {
    id: 1,
    title: "UI Design Masterclass",
    date: "Oct 24",
    amount: "+$199.00",
    type: "income",
    tag: "Sale",
  },
  {
    id: 2,
    title: "Bank Withdrawal",
    date: "Oct 22",
    amount: "-$1,200.00",
    type: "expense",
    tag: "Transfer",
  },
  {
    id: 3,
    title: "Affiliate Commission",
    date: "Oct 18",
    amount: "+$45.50",
    type: "income",
    tag: "Referral",
  },
  {
    id: 4,
    title: "Python Automation",
    date: "Oct 15",
    amount: "+$299.00",
    type: "income",
    tag: "Sale",
  },
];

const paymentMethods = [
  { id: 1, name: "Chase Bank", last4: "4829", type: "bank", primary: true },
  { id: 2, name: "PayPal", last4: "2341", type: "paypal", primary: false },
];

export const WalletDashboard = () => {
  const [activeMonth, setActiveMonth] = useState("Dec");
  const [period, setPeriod] = useState("6M");
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">(
    "all",
  );

  const filtered = recentActivities.filter((a) =>
    activeTab === "all" ? true : a.type === activeTab,
  );

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1447E6] flex items-center justify-center">
            <Wallet className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 dark:text-white leading-none">
              CreatorWallet
            </h1>
            <p className="text-[11px] text-zinc-400 mt-0.5">Dashboard</p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-zinc-500" />
        </button>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Available Funds */}
        <div className="col-span-2 sm:col-span-1 bg-[#1447E6] rounded-2xl p-5">
          <p className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider mb-2">
            Available
          </p>
          <h2 className="text-2xl font-bold text-white mb-1">
            $12,450
            <span className="text-sm font-normal text-blue-200 ml-1">USD</span>
          </h2>
          <p className="text-[11px] text-blue-200 mb-4">Updated just now</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all">
              Withdraw
            </button>
            <button className="flex-1 bg-white text-[#1447E6] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 transition-all">
              Add Funds
            </button>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="col-span-2 sm:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Lifetime Earnings
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
            $48,290
          </h2>
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                +12.5% this month
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-[10px] text-zinc-400 mb-1">This Month</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">
                $8,420
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-[10px] text-zinc-400 mb-1">Pending</p>
              <p className="text-sm font-bold text-amber-600">$320</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Activity Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-4">
        {/* Income Chart */}
        <div className="xl:col-span-3 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Income Performance
            </h3>
            <div className="flex items-center gap-1">
              {["3M", "6M", "1Y"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                    period === p
                      ? "bg-[#1447E6] text-white"
                      : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Selected month info */}
          <div className="mb-4">
            {chartData.find((d) => d.month === activeMonth) && (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-zinc-900 dark:text-white">
                  $
                  {chartData
                    .find((d) => d.month === activeMonth)!
                    .amount.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400">
                  {activeMonth} 2023
                </span>
              </div>
            )}
          </div>

          {/* Bars */}
          <div className="flex items-end justify-between gap-2 h-36 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2">
            {chartData.map((data) => (
              <button
                key={data.month}
                onClick={() => setActiveMonth(data.month)}
                className="flex flex-col items-center gap-1.5 flex-1 h-full group"
              >
                <div
                  className="w-full rounded-t-lg relative overflow-hidden"
                  style={{ height: "100%" }}
                >
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-300 ${
                      activeMonth === data.month
                        ? "bg-[#1447E6]"
                        : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30"
                    }`}
                    style={{ height: `${data.value}%` }}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold transition-colors ${
                    activeMonth === data.month
                      ? "text-[#1447E6]"
                      : "text-zinc-400"
                  }`}
                >
                  {data.month}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-zinc-400">Tap bar to inspect</p>
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-500" />
              <p className="text-[11px] text-emerald-600 font-semibold">
                Trend ↑
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Activity
            </h3>
            <button className="text-[11px] font-semibold text-[#1447E6] flex items-center gap-0.5 hover:underline">
              All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mb-4 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            {(["all", "income", "expense"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-[11px] font-semibold py-1.5 rounded-lg capitalize transition-all ${
                  activeTab === tab
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    activity.type === "income"
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {activity.type === "income" ? (
                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-zinc-400">
                      {activity.date}
                    </span>
                    <span className="text-[9px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                      {activity.tag}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-xs font-bold shrink-0 ${
                    activity.type === "income"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {activity.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Payment Methods
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Secure · Instant payouts worldwide
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-zinc-500 font-medium">Live</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                method.primary
                  ? "border-[#1447E6]/40 bg-blue-50/50 dark:bg-blue-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    method.primary
                      ? "bg-[#1447E6]/10"
                      : "bg-zinc-100 dark:bg-zinc-800"
                  }`}
                >
                  {method.type === "bank" ? (
                    <Landmark
                      className={`w-4.5 h-4.5 ${
                        method.primary ? "text-[#1447E6]" : "text-zinc-500"
                      }`}
                    />
                  ) : (
                    <CircleDollarSign
                      className={`w-4.5 h-4.5 ${
                        method.primary ? "text-[#1447E6]" : "text-zinc-500"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                    {method.name}
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    **** {method.last4}
                  </p>
                </div>
              </div>
              {method.primary && (
                <span className="text-[10px] font-semibold text-[#1447E6] bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                  Primary
                </span>
              )}
            </div>
          ))}

          <button className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold">Add Method</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-center">
            <p className="text-[10px] text-zinc-400 mb-1">Monthly Payout</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              $8,420
            </p>
          </div>
          <div className="text-center border-x border-zinc-100 dark:border-zinc-800">
            <p className="text-[10px] text-zinc-400 mb-1">Success Rate</p>
            <p className="text-sm font-bold text-emerald-500">99.8%</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-zinc-400 mb-1">Avg. Payout</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              1–2 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
