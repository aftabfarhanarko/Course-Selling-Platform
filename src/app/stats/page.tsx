"use client";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  DollarSign,
  GraduationCap,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useGetStatsQuery } from "@/lib/api/statsApi";

type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: string;
  hint: string;
};

type TopCourse = {
  title: string;
  category: string;
  price: string;
  students: number;
  revenue: string;
  rating: number;
};

type Source = {
  name: string;
  pct: number;
};

function formatPct(pct: number) {
  return `${pct}%`;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  ShoppingCart,
  Users,
  GraduationCap,
};

export default function StatsPage() {
  const { data, isLoading, isError } = useGetStatsQuery();

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <p className="text-slate-500 font-bold">
          {isError ? "Failed to load stats." : "Loading stats..."}
        </p>
      </div>
    );
  }

  const { kpis, salesTrend, topCourses, sources } = data;
  const maxSales = Math.max(...salesTrend.map((d) => d.value));

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm border border-slate-200">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Platform Analytics
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Stats
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Course sales, revenue, and growth overview for your course-selling
              platform.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
              <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                Range
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                Last 7 days
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
              <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                Updated
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">Today</p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = ICONS[kpi.icon];
            const isUp = kpi.trend === "up";
            const DeltaIcon = isUp ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={kpi.label}
                className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                      {kpi.label}
                    </p>
                    <p className="mt-2 text-2xl font-black text-slate-900">
                      {kpi.value}
                    </p>
                  </div>
                  <div className="h-11 w-11 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Icon className="h-5 w-5 text-blue-700" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                      isUp
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    <DeltaIcon className="h-4 w-4" />
                    {kpi.delta}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {kpi.hint}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Sales Trend
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Completed purchases over the last 7 days
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 border border-blue-100">
                <BadgeCheck className="h-4 w-4" />
                Healthy growth
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-3 items-end h-44">
              {salesTrend.map((d) => {
                const h = Math.max(8, Math.round((d.value / maxSales) * 160));
                return (
                  <div
                    key={d.label}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200"
                      style={{ height: 170 }}
                    >
                      <div
                        className="w-full rounded-2xl bg-gradient-to-b from-blue-600 to-blue-500"
                        style={{ height: h }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
                <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                  Conversion
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">3.9%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
                <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                  Avg. Order
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">$38.20</p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
                <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                  Refunds
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">0.7%</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-black text-slate-900">
              Traffic Sources
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Where your students come from
            </p>

            <div className="mt-6 space-y-4">
              {sources.map((s) => (
                <div key={s.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">
                      {s.name}
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      {formatPct(s.pct)}
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-[11px] font-black tracking-widest text-blue-700 uppercase">
                Tip
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Add more affiliates to grow referrals and reduce ad cost.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">Top Courses</h2>
              <p className="mt-1 text-sm text-slate-600">
                Best performing courses by revenue
              </p>
            </div>
            <Link
              href="/courses"
              className="text-sm font-bold text-blue-700 hover:underline"
            >
              View all courses
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
                    Course
                  </th>
                  <th className="pb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
                    Category
                  </th>
                  <th className="pb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
                    Price
                  </th>
                  <th className="pb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
                    Students
                  </th>
                  <th className="pb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
                    Revenue
                  </th>
                  <th className="pb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {topCourses.map((c) => (
                  <tr
                    key={c.title}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-4 pr-4">
                      <div className="font-black text-slate-900">{c.title}</div>
                      <div className="mt-1 text-xs font-semibold text-slate-500">
                        Updated weekly
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {c.category}
                      </span>
                    </td>
                    <td className="py-4 pr-4 font-bold text-slate-800">
                      {c.price}
                    </td>
                    <td className="py-4 pr-4 font-bold text-slate-800">
                      {c.students.toLocaleString()}
                    </td>
                    <td className="py-4 pr-4 font-black text-slate-900">
                      {c.revenue}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-black text-slate-900">
                          {c.rating.toFixed(1)}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm">
            <h2 className="text-xl font-black">Next Growth Move</h2>
            <p className="mt-2 text-sm text-white/80 max-w-xl">
              Launch a limited-time bundle and push it via affiliate partners to
              maximize revenue.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                <p className="text-[11px] font-black tracking-widest text-white/70 uppercase">
                  Bundle Price
                </p>
                <p className="mt-1 text-lg font-black">$99</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                <p className="text-[11px] font-black tracking-widest text-white/70 uppercase">
                  Target
                </p>
                <p className="mt-1 text-lg font-black">+1,000 sales</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                <p className="text-[11px] font-black tracking-widest text-white/70 uppercase">
                  Est. Rev
                </p>
                <p className="mt-1 text-lg font-black">$99k</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-black text-slate-900">Highlights</h2>
            <p className="mt-1 text-sm text-slate-600">
              Quick snapshot of platform health
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                  Best Day
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">Sunday</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Highest conversions in the week
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                  Support
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">98.4%</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Ticket resolution rate
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                  Reviews
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">4.7/5</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Average course rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
