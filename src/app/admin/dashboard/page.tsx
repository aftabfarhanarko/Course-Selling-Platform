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
  X,
  Download,
  Calendar,
  BarChart2,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* ─────────────────────────── data ─────────────────────────── */

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
    id: "TX-0091824",
    user: "Sara Kim",
    initials: "SK",
    product: "Pro Bundle",
    amount: "$1,199.00",
    date: "Oct 23, 2023",
    status: "Success",
  },
  {
    id: "TX-0091825",
    user: "Mark Evans",
    initials: "ME",
    product: "Starter Pack",
    amount: "$299.00",
    date: "Oct 22, 2023",
    status: "Failed",
  },
];

const activities = [
  {
    icon: <UserPlus size={14} />,
    color: "#3B82F6",
    bg: "#EFF6FF",
    title: "New User Registered",
    desc: "Alex Rivera joined the platform",
    time: "2 MINS AGO",
  },
  {
    icon: <Tag size={14} />,
    color: "#10B981",
    bg: "#ECFDF5",
    title: "Premium Sale",
    desc: "Wealth Pack #402 purchased ($299)",
    time: "14 MINS AGO",
  },
  {
    icon: <AlertCircle size={14} />,
    color: "#EF4444",
    bg: "#FEF2F2",
    title: "Withdrawal Request",
    desc: "Admin review required for #WTR-90",
    time: "1 HOUR AGO",
  },
  {
    icon: <Settings size={14} />,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    title: "System Update",
    desc: "Node cluster automated scaling",
    time: "4 HOURS AGO",
  },
  {
    icon: <Award size={14} />,
    color: "#F59E0B",
    bg: "#FFFBEB",
    title: "Milestone Reached",
    desc: "Monthly revenue goal exceeded 110%",
    time: "YESTERDAY",
  },
];

const reportTypes = [
  {
    id: "revenue",
    label: "Revenue Report",
    icon: <DollarSign size={15} />,
    desc: "Monthly & yearly revenue breakdown",
  },
  {
    id: "users",
    label: "User Analytics",
    icon: <Users size={15} />,
    desc: "Growth, retention & churn metrics",
  },
  {
    id: "transactions",
    label: "Transaction Log",
    icon: <ShoppingCart size={15} />,
    desc: "All high-value transaction records",
  },
  {
    id: "performance",
    label: "Performance Report",
    icon: <BarChart2 size={15} />,
    desc: "System & campaign performance data",
  },
];

/* ─────────────────────── mini bar chart ───────────────────── */

const BarChart = ({ data }: { data: { day: string; value: number }[] }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1.5 h-44 w-full pt-2">
      {data.map((d, i) => {
        const height = (d.value / max) * 100;
        const isLast = i === data.length - 1;
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-1 flex-1 min-w-0 group cursor-pointer"
          >
            <div
              className="w-full flex flex-col justify-end"
              style={{ height: "148px" }}
            >
              <div
                className="w-full rounded-t-md transition-all duration-500 group-hover:opacity-90"
                style={{
                  height: `${height}%`,
                  background: isLast
                    ? "linear-gradient(180deg,#6366F1,#4F46E5)"
                    : i % 2 === 0
                      ? "#C7D2FE"
                      : "#A5B4FC",
                  minHeight: "6px",
                  boxShadow: isLast
                    ? "0 4px 12px rgba(99,102,241,.35)"
                    : "none",
                }}
              />
            </div>
            <span className="text-[9px] text-gray-400 font-medium tracking-wide whitespace-nowrap">
              {data.length > 5 ? d.day : d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ──────────────────── Create Report Modal ──────────────────── */

function CreateReportModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string>("revenue");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-10-31");
  const [format, setFormat] = useState<"PDF" | "CSV" | "Excel">("PDF");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <FileText size={17} className="text-white" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-gray-900 leading-tight">
                Create Report
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Generate and export platform data
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {!done ? (
          <div className="px-6 py-5 space-y-5">
            {/* Report Type */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {reportTypes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                      selected === r.id
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex-shrink-0 ${selected === r.id ? "text-indigo-600" : "text-gray-400"}`}
                    >
                      {r.icon}
                    </span>
                    <div>
                      <p
                        className={`text-[12px] font-semibold leading-tight ${selected === r.id ? "text-indigo-700" : "text-gray-700"}`}
                      >
                        {r.label}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                        {r.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                Date Range
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Calendar
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-gray-700"
                  />
                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  to
                </span>
                <div className="relative flex-1">
                  <Calendar
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full h-9 pl-8 pr-3 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                Export Format
              </label>
              <div className="flex gap-2">
                {(["PDF", "CSV", "Excel"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-2 rounded-xl text-[12px] font-semibold border-2 transition-all ${
                      format === f
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[13px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Generating…
                  </>
                ) : (
                  <>
                    <Download size={14} /> Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Success state */
          <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-1">
              <CheckCircle2 size={36} className="text-emerald-500" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-900">
              Report Ready!
            </h3>
            <p className="text-[12px] text-gray-500 max-w-xs leading-relaxed">
              Your{" "}
              <span className="font-semibold text-indigo-600">
                {reportTypes.find((r) => r.id === selected)?.label}
              </span>{" "}
              has been generated as{" "}
              <span className="font-semibold">{format}</span> for the selected
              date range.
            </p>
            <div className="flex gap-2 mt-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDone(false);
                  setLoading(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                <Download size={13} /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── Dashboard Page ───────────────────── */

export default function Dashboard() {
  const [chartView, setChartView] = useState<"Daily" | "Weekly">("Weekly");
  const [searchTx, setSearchTx] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Success" | "Failed"
  >("All");

  const chartData = chartView === "Daily" ? dailyData : weeklyData;

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.user.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.product.toLowerCase().includes(searchTx.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      {showModal && <CreateReportModal onClose={() => setShowModal(false)} />}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight leading-tight">
              Dashboard
            </h1>
            <p className="text-[12px] text-gray-400 mt-0.5 font-medium">
              Welcome back, Admin · Here's what's happening today.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 w-fit"
          >
            <FileText size={14} />
            Create Report
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            {
              icon: <Users size={17} className="text-blue-600" />,
              bg: "bg-blue-50",
              label: "Total Active Users",
              value: "24,892",
              badge: "+12%",
              up: true,
            },
            {
              icon: <DollarSign size={17} className="text-emerald-600" />,
              bg: "bg-emerald-50",
              label: "Revenue (MTD)",
              value: "$142,500",
              badge: "+28%",
              up: true,
            },
            {
              icon: <ShoppingCart size={17} className="text-orange-500" />,
              bg: "bg-orange-50",
              label: "Completed Transactions",
              value: "8,210",
              badge: "-2.4%",
              up: false,
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`${c.bg} p-2 rounded-lg`}>{c.icon}</div>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    c.up
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {c.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {c.badge}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                {c.label}
              </p>
              <p className="text-[22px] font-extrabold text-gray-900 mt-0.5 tracking-tight">
                {c.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Chart + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-5">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
              <div>
                <h2 className="text-[13px] font-bold text-gray-900">
                  Daily Performance
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Revenue fluctuations over the period
                </p>
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
                {(["Daily", "Weekly"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setChartView(v)}
                    className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-all ${
                      chartView === v
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
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <h2 className="text-[13px] font-bold text-gray-900 mb-3">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-2.5 group cursor-pointer">
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: a.bg, color: a.color }}
                  >
                    {a.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-gray-800 leading-tight">
                      {a.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                      {a.desc}
                    </p>
                    <p className="text-[9px] text-gray-300 mt-0.5 font-bold tracking-widest">
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border border-gray-200 text-[12px] text-indigo-600 font-semibold py-2 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1 active:scale-95">
              View All Logs <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* ── Transactions Table ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3.5 border-b border-gray-100">
            <h2 className="text-[13px] font-bold text-gray-900">
              Recent High-Value Transactions
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search hash, user…"
                  value={searchTx}
                  onChange={(e) => setSearchTx(e.target.value)}
                  className="pl-7 pr-3 py-1.5 text-[12px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 w-44 transition-all"
                />
              </div>

              {/* Filter toggle */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`p-1.5 border rounded-lg transition-colors ${
                    filterOpen || statusFilter !== "All"
                      ? "border-indigo-400 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 hover:bg-gray-50 text-gray-500"
                  }`}
                >
                  <SlidersHorizontal size={14} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10 min-w-[130px]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
                      Status
                    </p>
                    {(["All", "Success", "Failed"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setStatusFilter(s);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 text-[12px] font-medium rounded-lg transition-colors ${
                          statusFilter === s
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Export */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors active:scale-95"
              >
                <Download size={12} /> Export
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    "Transaction ID",
                    "User",
                    "Product",
                    "Amount",
                    "Date",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-2.5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-[12px] text-gray-400"
                    >
                      No transactions match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((tx, i) => (
                    <tr
                      key={i}
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      <td className="px-4 py-3 text-[12px] font-bold text-indigo-600">
                        {tx.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                            {tx.initials}
                          </div>
                          <span className="text-[12px] text-gray-800 font-medium">
                            {tx.user}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {tx.product}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-900">
                        {tx.amount}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-400">
                        {tx.date}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            tx.status === "Success"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {filtered.map((tx, i) => (
              <div key={i} className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-indigo-600">
                    {tx.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tx.status === "Success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                    {tx.initials}
                  </div>
                  <span className="text-[12px] text-gray-800 font-medium">
                    {tx.user}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">
                    {tx.product}
                  </span>
                  <span className="text-[13px] font-extrabold text-gray-900">
                    {tx.amount}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {tx.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
