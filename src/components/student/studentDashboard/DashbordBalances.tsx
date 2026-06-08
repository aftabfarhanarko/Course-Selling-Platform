"use client";

import { useGetStudentDashboardStatsQuery } from "@/lib/api/statsApi";
import { RiArrowUpLine } from "react-icons/ri";
import { LuWallet, LuUsers, LuBookOpen, LuCalendarDays } from "react-icons/lu";

export const DashBoardBalances = () => {
  const { data, isLoading } = useGetStudentDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[140px] rounded-2xl bg-slate-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const stats = data?.dashboardStats || {
    currentBalance: {
      amount: 0,
      currency: "USD",
      percentageChange: 0,
      label: "CURRENT WALLET BALANCE",
    },
    affiliateEarnings: {
      amount: 0,
      currency: "USD",
      lifetime: true,
      nextPayoutDate: "End of Month",
      label: "TOTAL AFFILIATE EARNINGS",
    },
    coursesEnrolled: {
      activeModules: 0,
      label: "TOTAL COURSES ENROLLED",
      subtext: "Total active courses",
    },
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {/* Card 1 — Wallet */}
      <div className="relative bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 overflow-hidden group hover:shadow-md hover:border-blue-200 transition-all duration-300">
        <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
          <LuWallet className="w-14 h-14 text-[#4f8ef7]" />
        </div>

        <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-slate-400">
          {stats.currentBalance.label}
        </p>

        <div className="flex items-baseline gap-2 mt-3">
          <h2 className="text-[24px] sm:text-[26px] font-black text-slate-900 leading-none">
            ${stats.currentBalance.amount.toLocaleString()}
          </h2>
          <div className="flex items-center gap-0.5 text-emerald-600 text-[10px] font-black bg-emerald-50 px-1.5 py-0.5 rounded-full">
            <RiArrowUpLine className="w-3 h-3" />
            <span>{stats.currentBalance.percentageChange}%</span>
          </div>
        </div>

        <button className="mt-4 bg-[#4f8ef7] hover:bg-[#3d7ef0] text-white text-[11px] font-bold px-4 py-2 rounded-xl w-full transition-all active:scale-95 shadow-sm shadow-blue-400/20">
          Withdraw Funds
        </button>
      </div>

      {/* Card 2 — Affiliate */}
      <div className="relative bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 overflow-hidden group hover:shadow-md hover:border-emerald-200 transition-all duration-300">
        <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
          <LuUsers className="w-14 h-14 text-emerald-600" />
        </div>

        <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-slate-400">
          {stats.affiliateEarnings.label}
        </p>

        <div className="flex items-baseline gap-2 mt-3">
          <h2 className="text-[24px] sm:text-[26px] font-black text-slate-900 leading-none">
            ${stats.affiliateEarnings.amount.toLocaleString()}
          </h2>
          <span className="text-emerald-600 text-[10px] font-black bg-emerald-50 px-1.5 py-0.5 rounded-full">
            Lifetime
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-4 text-[11px] text-slate-500 font-medium">
          <LuCalendarDays className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
          <p>
            Next payout:{" "}
            <span className="font-bold text-slate-800">
              {stats.affiliateEarnings.nextPayoutDate}
            </span>
          </p>
        </div>
      </div>

      {/* Card 3 — Courses */}
      <div className="relative bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 overflow-hidden group hover:shadow-md hover:border-indigo-200 transition-all duration-300">
        <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
          <LuBookOpen className="w-14 h-14 text-indigo-500" />
        </div>

        <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-slate-400">
          {stats.coursesEnrolled.label}
        </p>

        <div className="flex items-baseline gap-2 mt-3">
          <h2 className="text-[24px] sm:text-[26px] font-black text-slate-900 leading-none">
            {stats.coursesEnrolled.activeModules}
          </h2>
          <span className="text-slate-500 text-[12px] font-bold">
            Modules Active
          </span>
        </div>

        <div className="flex items-center gap-2.5 mt-4">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white overflow-hidden flex-shrink-0"
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`}
                  alt="User"
                  className="w-full h-full"
                />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-[9px] font-black text-[#4f8ef7] flex-shrink-0">
              +10
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {stats.coursesEnrolled.subtext}
          </p>
        </div>
      </div>
    </div>
  );
};
