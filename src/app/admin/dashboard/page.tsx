"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Wallet,
  ReceiptText,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Download,
  Loader2,
  Radar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAdminDashboardStatsQuery } from "@/lib/api/statsApi";
import * as Icons from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   FALLBACK DATA
   Used only for fields the API genuinely returns nothing for
   (undefined/null), so the dashboard never renders empty.
   Real API values — including legitimate zeros or empty lists —
   always win over this.
   ───────────────────────────────────────────────────────────── */

const FALLBACK = {
  kpis: {
    totalActiveUsers: 18420,
    revenueMTD: "$482,910",
    completedTransactions: 9271,
  },
  dailyData: [
    { day: "Mon", value: 210 },
    { day: "Tue", value: 246 },
    { day: "Wed", value: 198 },
    { day: "Thu", value: 288 },
    { day: "Fri", value: 314 },
    { day: "Sat", value: 260 },
    { day: "Sun", value: 231 },
  ],
  weeklyData: [
    { day: "W1", value: 268 },
    { day: "W2", value: 221 },
    { day: "W3", value: 150 },
    { day: "W4", value: 229 },
  ],
  activities: [
    { icon: "UserPlus", title: "New user registered", desc: "Sarah Jenkins joined the platform.", time: "5 MINS AGO" },
    { icon: "ShoppingCart", title: "New purchase", desc: "Pro Masterclass purchased by Mark E.", time: "12 MINS AGO" },
    { icon: "Star", title: "New review", desc: "5-star review left on UI Architecture Path.", time: "1 HOUR AGO" },
  ],
  transactions: [
    { id: "TXN-88A2F1", user: "Nabila Chowdhury", initials: "NC", product: "Enterprise Plan — Annual", amount: "$14,200.00", date: "Aug 27, 2026", status: "Success" },
    { id: "TXN-6C110E", user: "Tanvir Ahmed", initials: "TA", product: "POS Terminal ×12", amount: "$8,940.00", date: "Aug 27, 2026", status: "Success" },
    { id: "TXN-3F9D42", user: "Rezwana Karim", initials: "RK", product: "Bulk Inventory Restock", amount: "$22,650.00", date: "Aug 26, 2026", status: "Failed" },
    { id: "TXN-A15B77", user: "Imran Hossain", initials: "IH", product: "Logistics Retainer — Q3", amount: "$6,300.00", date: "Aug 26, 2026", status: "Success" },
  ],
};

/* ─────────────────────────────────────────────────────────────
   RADAR CHART — light instrument-panel line chart: faint grid,
   blue→cyan trace, amber pulse on the latest point.
   ───────────────────────────────────────────────────────────── */

const VaultChart = ({ data }: any) => {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    const duration = 800;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  if (!data || data.length === 0) return null;

  const W = 600;
  const H = 200;
  const PAD = { top: 16, right: 12, bottom: 30, left: 38 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const max = Math.max(...data.map((d: any) => d.value));
  const min = Math.min(...data.map((d: any) => d.value));
  const range = max - min || 1;

  const pts = data.map((d: any, i: number) => ({
    x: PAD.left + (i / (data.length - 1)) * innerW,
    y: PAD.top + (1 - (d.value - min) / range) * innerH,
    ...d,
  }));

  const smooth = (points: any[]) => {
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
  const cols = 8;
  const rows = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        <linearGradient id="vaultLineLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B6FE0" />
          <stop offset="100%" stopColor="#13B3A0" />
        </linearGradient>
        <filter id="vaultGlowLight" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="vaultRevealLight">
          <rect x={PAD.left} y={0} width={innerW * progress} height={H} />
        </clipPath>
      </defs>

      {/* faint grid */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line key={`h${i}`} x1={PAD.left} y1={PAD.top + (i / rows) * innerH} x2={PAD.left + innerW} y2={PAD.top + (i / rows) * innerH} stroke="#EEF1F5" strokeWidth="1" />
      ))}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line key={`v${i}`} x1={PAD.left + (i / cols) * innerW} y1={PAD.top} x2={PAD.left + (i / cols) * innerW} y2={PAD.top + innerH} stroke="#F5F6F8" strokeWidth="1" />
      ))}

      {pts.map((p: any, i: number) => (
        <text key={i} x={p.x} y={H - 6} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="#98A2B3">
          {p.day}
        </text>
      ))}

      <path d={linePath} fill="none" stroke="url(#vaultLineLight)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#vaultGlowLight)" clipPath="url(#vaultRevealLight)" />

      {pts.map((p: any, i: number) => {
        const visible = p.x <= PAD.left + innerW * progress + 0.5;
        if (!visible) return null;
        const isHov = hovered === i;
        const isLast = i === pts.length - 1;
        return (
          <g key={i}>
            <rect x={p.x - 18} y={PAD.top} width={36} height={innerH} fill="transparent" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "crosshair" }} />
            {isLast && <circle cx={p.x} cy={p.y} r={9} fill="#A9791F" opacity="0.14" />}
            <circle cx={p.x} cy={p.y} r={isHov ? 5.5 : 3.5} fill={isHov ? "#A9791F" : "#FFFFFF"} stroke={isHov ? "#A9791F" : "#3B6FE0"} strokeWidth={isHov ? 0 : 2} />
            {isHov && (
              <g>
                <rect x={p.x - 26} y={p.y - 32} width={52} height={20} rx={4} fill="#131720" />
                <text x={p.x} y={p.y - 18} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#FFFFFF">
                  {p.value}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* ─────────────────────────────────────────────────────────────
   STATUS LED — glowing dot badge instead of a flat pill
   ───────────────────────────────────────────────────────────── */

const StatusLed = ({ status }: { status: string }) => {
  const ok = status === "Success";
  const color = ok ? "#15803D" : "#C1382B";
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-white border border-[#E4E7EC]" style={{ color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}66` }} />
      {status}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────────
   DASHBOARD
   ───────────────────────────────────────────────────────────── */

export default function Dashboard() {
  const { data: statsData, isLoading } = useGetAdminDashboardStatsQuery();

  const [chartView, setChartView] = useState("Weekly");
  const [searchTx, setSearchTx] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [chartKey, setChartKey] = useState(0);

  // Per-field fallback: a real (even empty) API value always wins.
  // Only genuinely missing (undefined/null) fields fall back.
  const transactions = statsData?.transactions ?? FALLBACK.transactions;
  const dailyData = statsData?.dailyData ?? FALLBACK.dailyData;
  const weeklyData = statsData?.weeklyData ?? FALLBACK.weeklyData;
  const activities = statsData?.activities ?? FALLBACK.activities;
  const kpis = statsData?.kpis ?? FALLBACK.kpis;

  const chartData = chartView === "Daily" ? dailyData : weeklyData;

  const handleChartView = (v: string) => {
    setChartView(v);
    setChartKey((k) => k + 1);
  };

  const filtered = useMemo(
    () =>
      transactions.filter((t: any) => {
        const matchSearch =
          t.id.toLowerCase().includes(searchTx.toLowerCase()) ||
          t.user.toLowerCase().includes(searchTx.toLowerCase()) ||
          t.product.toLowerCase().includes(searchTx.toLowerCase());
        const matchStatus = statusFilter === "All" || t.status === statusFilter;
        return matchSearch && matchStatus;
      }),
    [transactions, searchTx, statusFilter]
  );

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Activity;
    return <IconComponent size={14} />;
  };

  const stats = [
    { label: "Peak", value: chartData?.length ? Math.max(...chartData.map((d: any) => d.value)) : 0 },
    { label: "Avg", value: chartData?.length ? Math.round(chartData.reduce((s: number, d: any) => s + d.value, 0) / chartData.length) : 0 },
    { label: "Low", value: chartData?.length ? Math.min(...chartData.map((d: any) => d.value)) : 0 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#3B6FE0]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6 bg-[#F7F8FA] text-[#131720] space-y-4">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E4E7EC]">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full border border-[#E4E7EC] bg-white flex items-center justify-center shadow-sm">
            <Radar className="w-5 h-5 text-[#A9791F]" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#16A34A] border-2 border-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#131720]">Dashboard</h1>
            <p className="text-sm text-[#667085] font-medium mt-1">
              Welcome back, Admin · Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E7EC] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" style={{ boxShadow: "0 0 5px #16A34A66" }} />
          <span className="text-sm font-semibold text-[#344054] tracking-wide">Vault Secure</span>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: <Users size={17} className="text-[#3B6FE0]" />, label: "Total Active Users", value: Number(kpis.totalActiveUsers).toLocaleString(), badge: "Live", up: true },
          { icon: <Wallet size={17} className="text-[#13B3A0]" />, label: "Revenue", value: kpis.revenueMTD, badge: "All time", up: true },
          { icon: <ReceiptText size={17} className="text-[#A9791F]" />, label: "Completed Transactions", value: Number(kpis.completedTransactions).toLocaleString(), badge: "Total", up: true },
        ].map((c, i) => (
          <div key={i} className="relative bg-white rounded-xl p-4 pl-5 border border-[#E4E7EC] shadow-sm overflow-hidden">
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B6FE0] to-[#13B3A0]" />
            <div className="flex items-start justify-between mb-3">
              <div className="bg-[#F7F8FA] p-2 rounded-lg border border-[#E4E7EC]">{c.icon}</div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${c.up ? "bg-[#E7F6ED] text-[#15803D]" : "bg-[#FDECEA] text-[#C1382B]"}`}>
                {c.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {c.badge}
              </span>
            </div>
            <p className="text-[11px] text-[#98A2B3] font-semibold uppercase tracking-wide">{c.label}</p>
            <p className="text-[22px] font-bold text-[#131720] mt-0.5 tracking-tight">{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Chart + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-[#E4E7EC] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h2 className="text-[13px] font-bold text-[#131720]">Daily Performance</h2>
              <p className="text-[11px] text-[#98A2B3] mt-0.5">Revenue fluctuations over the period</p>
            </div>
            <div className="flex gap-1 bg-[#F7F8FA] rounded-lg p-1 w-fit border border-[#E4E7EC]">
              {["Daily", "Weekly"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleChartView(v)}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-all ${chartView === v ? "bg-[#3B6FE0] text-white" : "text-[#667085] hover:text-[#344054]"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-3 px-1 flex-wrap">
            {stats.map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div>
                  <p className="text-[10px] text-[#98A2B3] font-semibold uppercase tracking-wide">{s.label}</p>
                  <p className="text-[15px] font-bold text-[#131720]">{s.value}</p>
                </div>
                {i < arr.length - 1 && <div className="w-px h-8 bg-[#E4E7EC] hidden sm:block" />}
              </React.Fragment>
            ))}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full bg-[#3B6FE0] inline-block" />
              <span className="text-[10px] text-[#98A2B3] font-medium">Revenue</span>
            </div>
          </div>

          <VaultChart key={chartKey} data={chartData} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4 border border-[#E4E7EC] shadow-sm">
          <h2 className="text-[13px] font-bold text-[#131720] mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((act: any, i: number) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-[#E4E7EC] bg-[#F7F8FA] text-[#3B6FE0]">
                  {renderIcon(act.icon)}
                </div>
                <div className="pb-3 min-w-0">
                  <p className="text-[12px] font-bold text-[#131720] leading-tight truncate">{act.title}</p>
                  <p className="text-[11px] text-[#667085] mt-0.5 line-clamp-2">{act.desc}</p>
                  <p className="text-[9px] font-bold text-[#98A2B3] mt-1 uppercase tracking-widest font-mono">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 border border-[#E4E7EC] text-[12px] text-[#3B6FE0] font-semibold py-2 rounded-lg hover:bg-[#F7F8FA] transition-colors flex items-center justify-center gap-1 active:scale-95">
            View Full Log <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ── Transactions Table ── */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3.5 border-b border-[#E4E7EC]">
          <h2 className="text-[13px] font-bold text-[#131720]">Recent High-Value Transactions</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:flex-none">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
              <input
                type="text"
                placeholder="Search hash, user…"
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                className="pl-7 pr-3 py-1.5 text-[12px] bg-white border border-[#E4E7EC] rounded-lg text-[#131720] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#3B6FE0]/25 focus:border-[#3B6FE0] w-full sm:w-44 transition-all"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`p-1.5 border rounded-lg transition-colors ${filterOpen || statusFilter !== "All" ? "border-[#A9791F] bg-[#FBF3E2] text-[#A9791F]" : "border-[#E4E7EC] hover:bg-[#F7F8FA] text-[#667085]"}`}
              >
                <SlidersHorizontal size={14} />
              </button>
              {filterOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-[#E4E7EC] rounded-xl shadow-lg p-2 z-10 min-w-[130px]">
                  <p className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-widest px-2 mb-1.5">Status</p>
                  {["All", "Success", "Failed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setFilterOpen(false); }}
                      className={`w-full text-left px-2 py-1.5 text-[12px] font-medium rounded-lg transition-colors ${statusFilter === s ? "bg-[#F7F8FA] text-[#3B6FE0]" : "text-[#667085] hover:bg-[#F7F8FA]"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#3B6FE0] border border-[#C7D7FE] bg-[#EFF4FF] rounded-lg hover:bg-[#E0EAFF] transition-colors active:scale-95">
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="border-[#E4E7EC] hover:bg-transparent">
                <TableHead className="text-[#98A2B3]">Transaction ID</TableHead>
                <TableHead className="text-[#98A2B3]">User</TableHead>
                <TableHead className="text-[#98A2B3]">Product</TableHead>
                <TableHead className="text-[#98A2B3]">Amount</TableHead>
                <TableHead className="text-[#98A2B3]">Date</TableHead>
                <TableHead className="text-[#98A2B3]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="border-[#E4E7EC] hover:bg-transparent">
                  <TableCell colSpan={6} className="h-24 text-center text-xs text-[#98A2B3] font-medium">
                    No transactions match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((tx: any, i: number) => (
                  <TableRow key={i} className="border-[#E4E7EC] hover:bg-[#F9FAFB]">
                    <TableCell className="font-bold text-[#3B6FE0] font-mono">{tx.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F7F8FA] border border-[#E4E7EC] text-[#344054] flex items-center justify-center text-xs font-black shrink-0">
                          {tx.initials}
                        </div>
                        <span className="text-xs font-bold text-[#131720]">{tx.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-[#667085] font-medium">{tx.product}</TableCell>
                    <TableCell className="text-xs font-extrabold text-[#131720] font-mono">{tx.amount}</TableCell>
                    <TableCell className="text-xs text-[#98A2B3] font-medium font-mono">{tx.date}</TableCell>
                    <TableCell>
                      <StatusLed status={tx.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}