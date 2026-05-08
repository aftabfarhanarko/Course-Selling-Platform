"use client";
import { useState, useEffect } from "react";
import {
  DollarSign,
  UserPlus,
  Users,
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  UserCheck,
  RotateCcw,
  Settings,
  ChevronRight,
  BarChart2,
  Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Period = "today" | "7days" | "30days";

interface KPI {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  change: string;
  up: boolean;
  sparkline: number[];
}

interface Bar {
  label: string;
  val: number;
  disp: string;
}

interface Category {
  name: string;
  pct: number;
  color: string;
}

interface ActivityRow {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  name: string;
  user: string;
  amount: string;
  amtType: "positive" | "negative" | "neutral";
  status: "COMPLETED" | "ACTIVE" | "PENDING" | "AUTOMATED";
  time: string;
}

interface PeriodData {
  kpis: KPI[];
  bars: Bar[];
  categories: Category[];
  topPerformer: string;
  activity: ActivityRow[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const makeData = (): Record<Period, PeriodData> => ({
  today: {
    kpis: [
      { icon: <DollarSign size={18} />, iconBg: "#dbeafe", iconColor: "#2563eb", label: "Total Revenue",     value: "$142,580", change: "+12.5%", up: true,  sparkline: [40,55,45,60,52,70,65] },
      { icon: <UserPlus size={18} />,   iconBg: "#dcfce7", iconColor: "#16a34a", label: "New Subscriptions", value: "1,284",    change: "+8.2%",  up: true,  sparkline: [30,42,38,55,48,62,58] },
      { icon: <Users size={18} />,      iconBg: "#fef9c3", iconColor: "#ca8a04", label: "Active Users",      value: "42,903",   change: "+5.1%",  up: true,  sparkline: [55,58,54,60,63,61,66] },
      { icon: <RefreshCcw size={18} />, iconBg: "#fee2e2", iconColor: "#dc2626", label: "Refund Rate",       value: "0.82%",    change: "-0.4%",  up: false, sparkline: [22,18,25,20,17,19,16] },
    ],
    bars: [
      { label: "WK 01", val: 28000,  disp: "$28K"  },
      { label: "WK 02", val: 35000,  disp: "$35K"  },
      { label: "WK 03", val: 52000,  disp: "$52K"  },
      { label: "WK 04", val: 48000,  disp: "$48K"  },
    ],
    categories: [
      { name: "Masterclasses",   pct: 45, color: "#3b82f6" },
      { name: "1-on-1 Coaching", pct: 30, color: "#22c55e" },
      { name: "SaaS Tools",      pct: 15, color: "#f59e0b" },
      { name: "E-books",         pct: 10, color: "#a78bfa" },
    ],
    topPerformer: "Wealth Design Masterclass",
    activity: [
      { icon: <ShoppingCart size={15} />, iconBg: "#dbeafe", iconColor: "#2563eb", name: "Masterclass Purchase", user: "Alex Rivera",    amount: "+$499.00",   amtType: "positive", status: "COMPLETED", time: "2 mins ago"  },
      { icon: <UserCheck size={15} />,    iconBg: "#dcfce7", iconColor: "#16a34a", name: "New Sub: Pro Plan",    user: "Sarah Chen",     amount: "+$89.00/mo", amtType: "positive", status: "ACTIVE",    time: "14 mins ago" },
      { icon: <RotateCcw size={15} />,    iconBg: "#fee2e2", iconColor: "#dc2626", name: "Refund Requested",     user: "Marcus Johnson", amount: "-$120.00",   amtType: "negative", status: "PENDING",   time: "42 mins ago" },
      { icon: <Settings size={15} />,     iconBg: "#ede9fe", iconColor: "#7c3aed", name: "System Update",        user: "System",         amount: "—",          amtType: "neutral",  status: "AUTOMATED", time: "1 hr ago"    },
    ],
  },
  "7days": {
    kpis: [
      { icon: <DollarSign size={18} />, iconBg: "#dbeafe", iconColor: "#2563eb", label: "Total Revenue",     value: "$874,320", change: "+18.3%", up: true,  sparkline: [50,62,58,75,70,85,82] },
      { icon: <UserPlus size={18} />,   iconBg: "#dcfce7", iconColor: "#16a34a", label: "New Subscriptions", value: "7,861",    change: "+11.4%", up: true,  sparkline: [35,50,44,65,58,72,68] },
      { icon: <Users size={18} />,      iconBg: "#fef9c3", iconColor: "#ca8a04", label: "Active Users",      value: "58,102",   change: "+9.7%",  up: true,  sparkline: [60,64,62,68,72,70,76] },
      { icon: <RefreshCcw size={18} />, iconBg: "#fee2e2", iconColor: "#dc2626", label: "Refund Rate",       value: "1.04%",    change: "+0.2%",  up: false, sparkline: [18,22,20,26,23,28,25] },
    ],
    bars: [
      { label: "MON", val: 110000, disp: "$110K" },
      { label: "TUE", val: 135000, disp: "$135K" },
      { label: "WED", val: 98000,  disp: "$98K"  },
      { label: "THU", val: 172000, disp: "$172K" },
      { label: "FRI", val: 190000, disp: "$190K" },
      { label: "SAT", val: 88000,  disp: "$88K"  },
      { label: "SUN", val: 81320,  disp: "$81K"  },
    ],
    categories: [
      { name: "Masterclasses",   pct: 42, color: "#3b82f6" },
      { name: "1-on-1 Coaching", pct: 33, color: "#22c55e" },
      { name: "SaaS Tools",      pct: 17, color: "#f59e0b" },
      { name: "E-books",         pct: 8,  color: "#a78bfa" },
    ],
    topPerformer: "Advanced Income Bootcamp",
    activity: [
      { icon: <ShoppingCart size={15} />, iconBg: "#dbeafe", iconColor: "#2563eb", name: "Bulk Masterclass Sale", user: "Jordan Lee",   amount: "+$2,499.00",  amtType: "positive", status: "COMPLETED", time: "1 hr ago"   },
      { icon: <UserCheck size={15} />,    iconBg: "#dcfce7", iconColor: "#16a34a", name: "New Sub: Elite Plan",   user: "Priya Sharma", amount: "+$199.00/mo", amtType: "positive", status: "ACTIVE",    time: "3 hrs ago"  },
      { icon: <RotateCcw size={15} />,    iconBg: "#fee2e2", iconColor: "#dc2626", name: "Refund Approved",       user: "Tom Walsh",    amount: "-$89.00",     amtType: "negative", status: "COMPLETED", time: "5 hrs ago"  },
      { icon: <Settings size={15} />,     iconBg: "#ede9fe", iconColor: "#7c3aed", name: "Promo Campaign Live",   user: "System",       amount: "—",           amtType: "neutral",  status: "AUTOMATED", time: "8 hrs ago"  },
      { icon: <ShoppingCart size={15} />, iconBg: "#dbeafe", iconColor: "#2563eb", name: "E-book Bundle",         user: "Dana Kim",     amount: "+$79.00",     amtType: "positive", status: "COMPLETED", time: "12 hrs ago" },
    ],
  },
  "30days": {
    kpis: [
      { icon: <DollarSign size={18} />, iconBg: "#dbeafe", iconColor: "#2563eb", label: "Total Revenue",     value: "$3.24M",  change: "+24.1%", up: true,  sparkline: [45,58,55,72,68,88,85] },
      { icon: <UserPlus size={18} />,   iconBg: "#dcfce7", iconColor: "#16a34a", label: "New Subscriptions", value: "31,450",  change: "+19.8%", up: true,  sparkline: [40,56,52,70,65,82,78] },
      { icon: <Users size={18} />,      iconBg: "#fef9c3", iconColor: "#ca8a04", label: "Active Users",      value: "112,500", change: "+14.3%", up: true,  sparkline: [62,66,64,72,75,74,80] },
      { icon: <RefreshCcw size={18} />, iconBg: "#fee2e2", iconColor: "#dc2626", label: "Refund Rate",       value: "0.91%",   change: "-0.6%",  up: false, sparkline: [24,20,22,18,16,17,14] },
    ],
    bars: [
      { label: "WK 1", val: 680000, disp: "$680K" },
      { label: "WK 2", val: 820000, disp: "$820K" },
      { label: "WK 3", val: 910000, disp: "$910K" },
      { label: "WK 4", val: 830000, disp: "$830K" },
    ],
    categories: [
      { name: "Masterclasses",   pct: 48, color: "#3b82f6" },
      { name: "1-on-1 Coaching", pct: 28, color: "#22c55e" },
      { name: "SaaS Tools",      pct: 14, color: "#f59e0b" },
      { name: "E-books",         pct: 10, color: "#a78bfa" },
    ],
    topPerformer: "Passive Income Blueprint",
    activity: [
      { icon: <ShoppingCart size={15} />, iconBg: "#dbeafe", iconColor: "#2563eb", name: "Enterprise License",  user: "Apex Corp",     amount: "+$12,000",    amtType: "positive", status: "COMPLETED", time: "2 days ago"  },
      { icon: <UserCheck size={15} />,    iconBg: "#dcfce7", iconColor: "#16a34a", name: "New Sub: Team Plan",  user: "Bright Studio", amount: "+$599.00/mo", amtType: "positive", status: "ACTIVE",    time: "3 days ago"  },
      { icon: <RotateCcw size={15} />,    iconBg: "#fee2e2", iconColor: "#dc2626", name: "Chargeback Filed",    user: "Unknown",       amount: "-$499.00",    amtType: "negative", status: "PENDING",   time: "5 days ago"  },
      { icon: <Settings size={15} />,     iconBg: "#ede9fe", iconColor: "#7c3aed", name: "Monthly Report Gen", user: "System",        amount: "—",           amtType: "neutral",  status: "AUTOMATED", time: "7 days ago"  },
      { icon: <ShoppingCart size={15} />, iconBg: "#dbeafe", iconColor: "#2563eb", name: "Coaching Bundle",    user: "Nina Patel",    amount: "+$1,299.00",  amtType: "positive", status: "COMPLETED", time: "10 days ago" },
    ],
  },
});

// ─── Sparkline ────────────────────────────────────────────────────────────────

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const W = 72, H = 32;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * H;
    return `${x},${y}`;
  });
  const id = `sg${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M0,${H} L${pts.join("L")} L${W},${H} Z`} fill={`url(#${id})`} />
      <path d={`M${pts.join("L")}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─── Status config ────────────────────────────────────────────────────────────

const SS: Record<string, { bg: string; color: string; dot: string }> = {
  COMPLETED: { bg: "bg-green-100", color: "text-green-700", dot: "bg-green-500" },
  ACTIVE:    { bg: "bg-blue-100", color: "text-blue-700", dot: "bg-blue-500" },
  PENDING:   { bg: "bg-amber-100", color: "text-amber-700", dot: "bg-amber-500" },
  AUTOMATED: { bg: "bg-purple-100", color: "text-purple-700", dot: "bg-purple-500" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Analyticspage() {
  const [period, setPeriod] = useState<Period>("today");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const DATA = makeData();
  const d = DATA[period];
  const maxBar = Math.max(...d.bars.map(b => b.val));

  const PERIODS: { key: Period; label: string }[] = [
    { key: "today",  label: "Today"        },
    { key: "7days",  label: "Last 7 Days"  },
    { key: "30days", label: "Last 30 Days" },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Performance Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time insights for the IncomeArchitect ecosystem.</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto">
          {PERIODS.map(p => (
            <button
              key={p.key}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                period === p.key
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }`}
              onClick={() => setPeriod(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {d.kpis.map(k => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: k.iconBg, color: k.iconColor }}
              >
                {k.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  k.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {k.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {k.change}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-black tracking-tight text-slate-900 font-mono">
                  {k.value}
                </div>
                <div className="text-xs font-medium text-slate-500 mt-1">
                  {k.label}
                </div>
              </div>
              <Sparkline data={k.sparkline} color={k.iconColor} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-5 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-base font-bold text-slate-900">Revenue Growth</div>
              <div className="text-xs text-slate-500 mt-1">Gross sales per period</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <div className="w-2 h-2 rounded-full bg-blue-600" /> Gross Sales
            </div>
          </div>

          <div className="relative h-44 flex items-end gap-2 sm:gap-4 pb-8">
            {/* Grid lines */}
            {[33, 66].map(p => (
              <div
                key={p}
                className="absolute left-0 right-0 border-t border-dashed border-slate-200 pointer-events-none"
                style={{ bottom: `calc(32px + ${1.36 * p}px)` }}
              />
            ))}

            {d.bars.map((b, i) => {
              const h = mounted ? Math.round((b.val / maxBar) * 136) : 0;
              const isHovered = hoveredBar === i;
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                     onMouseEnter={() => setHoveredBar(i)}
                     onMouseLeave={() => setHoveredBar(null)}>
                  
                  {isHovered && (
                    <div className="absolute -top-10 bg-slate-900 text-white text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap font-mono shadow-lg z-10 transition-opacity">
                      {b.disp}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  )}
                  
                  <div
                    className="w-full max-w-[44px] rounded-t-lg transition-all duration-500 ease-out"
                    style={{
                      height: h,
                      background: isHovered
                        ? "linear-gradient(180deg, #3b82f6, #6366f1)"
                        : "linear-gradient(180deg, #bfdbfe, #c7d2fe)",
                    }}
                  />
                  <span className="absolute bottom-0 text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <div className="text-base font-bold text-slate-900">Sales by Category</div>
            <div className="text-xs text-slate-500 mt-1">Revenue breakdown</div>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            {d.categories.map(c => (
              <div key={c.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] font-semibold text-slate-900">{c.name}</span>
                  <span className="text-xs font-bold text-slate-600 font-mono">{c.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-inner">
              <Star size={18} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-blue-400">Top Performer</div>
              <div className="text-sm font-bold text-blue-700 mt-0.5">{d.topPerformer}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-base font-bold text-slate-900">Recent Activity</div>
            <div className="text-xs text-slate-500 mt-1">{d.activity.length} transactions</div>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            View All <ChevronRight size={14} />
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 px-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">Transaction / Action</th>
                <th className="pb-3 px-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">User</th>
                <th className="pb-3 px-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">Amount</th>
                <th className="pb-3 px-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">Status</th>
                <th className="pb-3 px-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {d.activity.map((r, i) => {
                const s = SS[r.status];
                return (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: r.iconBg, color: r.iconColor }}
                        >
                          {r.icon}
                        </div>
                        <span className="text-[13px] font-semibold text-slate-900">{r.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[13px] font-medium text-slate-600">{r.user}</td>
                    <td className={`py-3 px-4 text-[13px] font-bold font-mono ${
                      r.amtType === "positive" ? "text-blue-600" :
                      r.amtType === "negative" ? "text-red-600" : "text-slate-500"
                    }`}>
                      {r.amount}
                    </td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {r.status}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[12px] text-slate-500 font-mono">{r.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="sm:hidden flex flex-col gap-3">
          {d.activity.map((r, i) => {
            const s = SS[r.status];
            return (
              <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: r.iconBg, color: r.iconColor }}
                  >
                    {r.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-slate-900 truncate">{r.name}</div>
                    <div className="text-xs text-slate-500 truncate">{r.user}</div>
                  </div>
                  <div className={`text-[13px] font-bold font-mono shrink-0 ${
                    r.amtType === "positive" ? "text-blue-600" :
                    r.amtType === "negative" ? "text-red-600" : "text-slate-500"
                  }`}>
                    {r.amount}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200/60 pt-3 mt-1">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.color}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {r.status}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{r.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}