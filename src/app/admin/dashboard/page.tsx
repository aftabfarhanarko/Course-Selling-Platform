"use client";

import React, { useState, useEffect } from "react";
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

/* ─────────────────────── Smooth Line Chart ───────────────────────── */

const LineChart = ({ data, animated }: any) => {
  const [progress, setProgress] = useState(animated ? 0 : 1);

  if (!data || data.length === 0) return null;

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    const duration = 900;
    const raf = requestAnimationFrame(function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [data]);

  const W = 560;
  const H = 180;
  const PAD = { top: 16, right: 16, bottom: 32, left: 42 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const max = Math.max(...data.map((d: any) => d.value));
  const min = Math.min(...data.map((d: any) => d.value));
  const range = max - min || 1;

  const pts = data.map((d: any, i: any) => ({
    x: PAD.left + (i / (data.length - 1)) * innerW,
    y: PAD.top + (1 - (d.value - min) / range) * innerH,
    ...d,
  }));

  // Catmull-Rom to smooth bezier
  const smooth = (points: any) => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  const linePath = smooth(pts);

  // Area path (close below)
  const areaPath =
    linePath +
    ` L ${pts[pts.length - 1].x},${PAD.top + innerH} L ${pts[0].x},${PAD.top + innerH} Z`;

  // Y-axis grid lines (4 levels)
  const gridLines = [0, 0.33, 0.66, 1].map((t) => ({
    y: PAD.top + t * innerH,
    label: Math.round(max - t * range),
  }));

  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Clip for animation reveal */}
          <clipPath id="revealClip">
            <rect x={PAD.left} y={0} width={innerW * progress} height={H} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {gridLines.map((g, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              y1={g.y}
              x2={PAD.left + innerW}
              y2={g.y}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray={i === 0 ? "none" : "4 4"}
            />
            <text
              x={PAD.left - 8}
              y={g.y + 4}
              textAnchor="end"
              fontSize="9"
              fill="#9CA3AF"
              fontFamily="system-ui"
            >
              {g.label}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {pts.map((p: any, i: any) => (
          <text
            key={i}
            x={p.x}
            y={H - 4}
            textAnchor="middle"
            fontSize="9"
            fill="#9CA3AF"
            fontFamily="system-ui"
          >
            {p.day}
          </text>
        ))}

        {/* Area fill (clipped) */}
        <path d={areaPath} fill="url(#areaGrad)" clipPath="url(#revealClip)" />

        {/* Main line (clipped) */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
          clipPath="url(#revealClip)"
        />

        {/* Data points & hover targets */}
        {pts.map((p: any, i: any) => {
          const isHov = hovered === i;
          const visible = p.x <= PAD.left + innerW * progress;
          if (!visible) return null;
          return (
            <g key={i}>
              {/* hover area */}
              <rect
                x={p.x - 18}
                y={PAD.top}
                width={36}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "crosshair" }}
              />
              {/* vertical line on hover */}
              {isHov && (
                <line
                  x1={p.x}
                  y1={PAD.top}
                  x2={p.x}
                  y2={PAD.top + innerH}
                  stroke="#6366F1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
              )}
              {/* dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHov ? 6 : 4}
                fill={isHov ? "#4F46E5" : "#fff"}
                stroke={isHov ? "#4F46E5" : "#6366F1"}
                strokeWidth={isHov ? 0 : 2}
                style={{ transition: "r 0.15s, fill 0.15s" }}
              />
              {/* tooltip */}
              {isHov && (
                <g>
                  <rect
                    x={p.x - 28}
                    y={p.y - 34}
                    width={56}
                    height={22}
                    rx={6}
                    fill="#4F46E5"
                  />
                  <text
                    x={p.x}
                    y={p.y - 19}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#fff"
                    fontFamily="system-ui"
                  >
                    {p.value}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ──────────────────── Create Report Modal ──────────────────── */

function CreateReportModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState("revenue");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-10-31");
  const [format, setFormat] = useState("PDF");
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
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
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
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {reportTypes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-150 ${selected === r.id
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

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                Export Format
              </label>
              <div className="flex gap-2">
                {["PDF", "CSV", "Excel"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-2 rounded-xl text-[12px] font-semibold border-2 transition-all ${format === f
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

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

import { useGetAdminDashboardStatsQuery } from "@/lib/api/statsApi";
import * as Icons from "lucide-react";

export default function Dashboard() {
  const { data: statsData, isLoading } = useGetAdminDashboardStatsQuery();

  const [chartView, setChartView] = useState("Weekly");
  const [searchTx, setSearchTx] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [chartKey, setChartKey] = useState(0);

  const transactions = statsData?.transactions || [];
  const dailyData = statsData?.dailyData || [];
  const weeklyData = statsData?.weeklyData || [];
  const activities = statsData?.activities || [];
  const kpis = statsData?.kpis || { totalActiveUsers: 0, revenueMTD: "$0", completedTransactions: 0 };

  const chartData = chartView === "Daily" ? dailyData : weeklyData;

  const handleChartView = (v: string) => {
    setChartView(v);
    setChartKey((k: number) => k + 1);
  };

  const filtered = transactions.filter((t: any) => {
    const matchSearch =
      t.id.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.user.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.product.toLowerCase().includes(searchTx.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Activity;
    return <IconComponent size={14} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <>
      {showModal && <CreateReportModal onClose={() => setShowModal(false)} />}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        {/* Page Header */}
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

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            {
              icon: <Users size={17} className="text-blue-600" />,
              bg: "bg-blue-50",
              label: "Total Active Users",
              value: kpis.totalActiveUsers.toLocaleString(),
              badge: "Live",
              up: true,
            },
            {
              icon: <DollarSign size={17} className="text-emerald-600" />,
              bg: "bg-emerald-50",
              label: "Revenue",
              value: kpis.revenueMTD,
              badge: "All time",
              up: true,
            },
            {
              icon: <ShoppingCart size={17} className="text-orange-500" />,
              bg: "bg-orange-50",
              label: "Completed Transactions",
              value: kpis.completedTransactions.toLocaleString(),
              badge: "Total",
              up: true,
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`${c.bg} p-2 rounded-lg`}>{c.icon}</div>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${c.up
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

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-5">
          {/* Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h2 className="text-[13px] font-bold text-gray-900">
                  Daily Performance
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Revenue fluctuations over the period
                </p>
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
                {["Daily", "Weekly"].map((v) => (
                  <button
                    key={v}
                    onClick={() => handleChartView(v)}
                    className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-all ${chartView === v
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary row */}
            <div className="flex items-center gap-4 mb-3 px-1">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                  Peak
                </p>
                <p className="text-[15px] font-extrabold text-gray-900">
                  {Math.max(...(chartData?.length ? chartData.map((d: any) => d.value) : [0]))}
                </p>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                  Avg
                </p>
                <p className="text-[15px] font-extrabold text-gray-900">
                  {chartData?.length ? Math.round(
                    chartData.reduce((s: number, d: any) => s + d.value, 0) /
                    chartData.length,
                  ) : 0}
                </p>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                  Low
                </p>
                <p className="text-[15px] font-extrabold text-gray-900">
                  {Math.min(...(chartData?.length ? chartData.map((d: any) => d.value) : [0]))}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-500 inline-block" />
                <span className="text-[10px] text-gray-400 font-medium">
                  Revenue
                </span>
              </div>
            </div>

            <LineChart key={chartKey} data={chartData} animated />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <h2 className="text-[13px] font-bold text-gray-900 mb-3">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activities.map((act: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                      style={{ backgroundColor: act.bg || "#EFF6FF", color: act.color || "#3B82F6" }}
                    >
                      {renderIcon(act.icon)}
                    </div>
                  </div>
                  <div className="pb-4">
                    <p className="text-[12px] font-bold text-gray-900 leading-tight">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {act.desc}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                      {act.time}
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

        {/* Transactions Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3.5 border-b border-gray-100">
            <h2 className="text-[13px] font-bold text-gray-900">
              Recent High-Value Transactions
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
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

              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`p-1.5 border rounded-lg transition-colors ${filterOpen || statusFilter !== "All"
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
                    {["All", "Success", "Failed"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setStatusFilter(s);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 text-[12px] font-medium rounded-lg transition-colors ${statusFilter === s
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
                  filtered.map((tx: any, i: number) => (
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
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${tx.status === "Success"
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
            {filtered.map((tx: any, i: number) => (
              <div key={i} className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-indigo-600">
                    {tx.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tx.status === "Success"
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
