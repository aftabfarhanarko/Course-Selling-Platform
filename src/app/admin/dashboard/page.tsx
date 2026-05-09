"use client";

import React, { useState } from "react";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Tag,
  AlertCircle,
  Settings,
  Award,
  ChevronRight,
  Search,
  SlidersHorizontal,
  FileText,
} from "lucide-react";

const dailyData = [
  { day: "01", value: 60 },
  { day: "05", value: 85 },
  { day: "10", value: 110 },
  { day: "15", value: 145 },
  { day: "20", value: 90 },
  { day: "25", value: 125 },
  { day: "30", value: 160 },
];

const weeklyData = [
  { day: "W1", value: 80 },
  { day: "W2", value: 130 },
  { day: "W3", value: 105 },
  { day: "W4", value: 170 },
];

const transactions = [
  {
    id: "TX-0091823",
    user: "John Doe",
    initials: "JD",
    product: "Enterprise Suite",
    amount: "$2,499.00",
    date: "Oct 24, 2023",
    status: "Success",
  },
  {
    id: "TX-0091823",
    user: "John Doe",
    initials: "JD",
    product: "Enterprise Suite",
    amount: "$2,499.00",
    date: "Oct 24, 2023",
    status: "Success",
  },
  {
    id: "TX-0091823",
    user: "John Doe",
    initials: "JD",
    product: "Enterprise Suite",
    amount: "$2,499.00",
    date: "Oct 24, 2023",
    status: "Failed",
  },
];

const activities = [
  {
    icon: <UserPlus size={16} />,
    color: "#3B82F6",
    bg: "#EFF6FF",
    title: "New User Registered",
    desc: "Alex Rivera joined the platform",
    time: "2 MINS AGO",
  },
  {
    icon: <Tag size={16} />,
    color: "#10B981",
    bg: "#ECFDF5",
    title: "Premium Sale",
    desc: "Wealth Pack #402 purchased ($299)",
    time: "14 MINS AGO",
  },
  {
    icon: <AlertCircle size={16} />,
    color: "#EF4444",
    bg: "#FEF2F2",
    title: "Withdrawal Request",
    desc: "Admin review required for #WTR-90",
    time: "1 HOUR AGO",
  },
  {
    icon: <Settings size={16} />,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    title: "System Update",
    desc: "Node cluster automated scaling",
    time: "4 HOURS AGO",
  },
  {
    icon: <Award size={16} />,
    color: "#F59E0B",
    bg: "#FFFBEB",
    title: "Milestone Reached",
    desc: "Monthly revenue goal exceeded 110%",
    time: "YESTERDAY",
  },
];

const BarChart = ({ data }: { data: { day: string; value: number }[] }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-44 w-full">
      {data.map((d, i) => {
        const height = (d.value / max) * 100;
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-1 flex-1 min-w-0"
          >
            <div className="w-full flex flex-col justify-end" style={{ height: "160px" }}>
              <div
                className="w-full rounded-t-md transition-all duration-500"
                style={{
                  height: `${height}%`,
                  background:
                    i === data.length - 1
                      ? "#4F46E5"
                      : i % 2 === 0
                        ? "#C7D2FE"
                        : "#A5B4FC",
                  minHeight: "8px",
                }}
              />
            </div>
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {data.length > 5 ? `DAY ${d.day}` : d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function Dashboard() {
  const [chartView, setChartView] = useState<"Daily" | "Weekly">("Weekly");
  const [searchTx, setSearchTx] = useState("");

  const chartData = chartView === "Daily" ? dailyData : weeklyData;

  const filtered = transactions.filter(
    (t) =>
      t.id.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.user.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.product.toLowerCase().includes(searchTx.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-3 lg:p-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back! Here's what's happening.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-fit">
          <FileText size={16} />
          Create Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={11} /> +12%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">Total Active Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">24,892</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="bg-green-50 p-2 rounded-lg">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={11} /> +28%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">Total Revenue (MTD)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$142,500.42</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between">
            <div className="bg-orange-50 p-2 rounded-lg">
              <ShoppingCart size={20} className="text-orange-500" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              <TrendingDown size={11} /> -2.4%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">Completed Transactions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">8,210</p>
        </div>
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Daily Performance
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Revenue fluctuations over the last 30 days
              </p>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
              {(["Daily", "Weekly"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setChartView(v)}
                  className={`text-xs font-medium px-3 py-1 rounded-md transition-all ${chartView === v
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <BarChart data={chartData} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: a.bg, color: a.color }}
                >
                  {a.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-tight">
                    {a.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {a.desc}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-medium tracking-wide">
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 border border-gray-200 text-sm text-indigo-600 font-medium py-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1">
            View All Logs <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Recent High-Value Transactions
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search hash..."
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 w-44"
              />
            </div>
            <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={15} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Transaction ID", "User", "Product", "Amount", "Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((tx, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-indigo-600">
                    {tx.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {tx.initials}
                      </div>
                      <span className="text-gray-800">{tx.user}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{tx.product}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">
                    {tx.amount}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{tx.date}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${tx.status === "Success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                        }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-100">
          {filtered.map((tx, i) => (
            <div key={i} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-indigo-600">
                  {tx.id}
                </span>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${tx.status === "Success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                    }`}
                >
                  {tx.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                  {tx.initials}
                </div>
                <span className="text-sm text-gray-800">{tx.user}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{tx.product}</span>
                <span className="font-bold text-gray-900">{tx.amount}</span>
              </div>
              <p className="text-xs text-gray-400">{tx.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}