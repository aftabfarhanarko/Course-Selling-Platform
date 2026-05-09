"use client";

import { BookOpen, Calendar, TrendingUp, Users, Wallet } from "lucide-react";

export const DashBoardBalcnes = () => {
  // static data - later will come from backend
  const dashboardStats = {
    currentBalance: {
      amount: 12450.0,
      currency: "USD",
      percentageChange: 12,
      label: "CURRENT WALLET BALANCE",
    },

    affiliateEarnings: {
      amount: 4820.5,
      currency: "USD",
      lifetime: true,
      nextPayoutDate: "Oct 15",
      label: "TOTAL AFFILIATE EARNINGS",
    },

    coursesEnrolled: {
      activeModules: 18,
      label: "TOTAL COURSES ENROLLED",
      subtext: "Students in your cohorts",
    },
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {/* Card 1 */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-[#ECECF2] dark:border-zinc-800 p-4 sm:p-5 lg:p-7 overflow-hidden">
        {/* watermark icon */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 opacity-[0.08]">
          <Wallet
            className="w-12 sm:w-16 h-12 sm:h-16 text-[#1E3A8A]"
            strokeWidth={1.5}
          />
        </div>

        {/* title */}
        <p className="text-[9px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold text-[#6B7280] dark:text-gray-400">
          {dashboardStats.currentBalance.label}
        </p>

        {/* amount */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 sm:mt-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] dark:text-white leading-none">
            ${dashboardStats.currentBalance.amount.toLocaleString()}
          </h2>

          <div className="flex items-center gap-1 text-[#16A34A] text-xs sm:text-sm font-semibold mt-1 sm:mt-0">
            <TrendingUp className="w-3 h-3" />
            <span>{dashboardStats.currentBalance.percentageChange}%</span>
          </div>
        </div>

        {/* button */}
        <button className="mt-4 sm:mt-6 bg-[#1447E6] hover:bg-[#0f3fd0] transition-all text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full w-full sm:w-auto">
          Withdraw funds
        </button>
      </div>

      {/* Card 2 */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-[#ECECF2] dark:border-zinc-800 p-4 sm:p-5 lg:p-7 overflow-hidden">
        {/* watermark icon */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 opacity-[0.08]">
          <Users
            className="w-12 sm:w-16 h-12 sm:h-16 text-[#166534]"
            strokeWidth={1.5}
          />
        </div>

        {/* title */}
        <p className="text-[9px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold text-[#6B7280] dark:text-gray-400">
          {dashboardStats.affiliateEarnings.label}
        </p>

        {/* amount */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 sm:mt-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] dark:text-white leading-none">
            ${dashboardStats.affiliateEarnings.amount.toLocaleString()}
          </h2>

          <span className="text-[#16A34A] text-xs sm:text-sm font-semibold mt-1 sm:mt-0">
            Lifetime
          </span>
        </div>

        {/* payout */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-4 sm:mt-5 text-[13px] sm:text-[15px] text-[#6B7280] dark:text-gray-400">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <p>
            Next payout:{" "}
            <span className="font-semibold text-[#111827] dark:text-white">
              {dashboardStats.affiliateEarnings.nextPayoutDate}
            </span>
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-[#ECECF2] dark:border-zinc-800 p-4 sm:p-5 lg:p-7 overflow-hidden sm:col-span-2 lg:col-span-1">
        {/* watermark icon */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 opacity-[0.08]">
          <BookOpen
            className="w-12 sm:w-16 h-12 sm:h-16 text-[#3c578c]"
            strokeWidth={1.5}
          />
        </div>

        {/* title */}
        <p className="text-[9px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold text-[#6B7280] dark:text-gray-400">
          {dashboardStats.coursesEnrolled.label}
        </p>

        {/* amount */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 sm:mt-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] dark:text-white leading-none">
            {dashboardStats.coursesEnrolled.activeModules}
          </h2>

          <span className="text-[#4B5563] dark:text-gray-400 text-xs sm:text-[15px] mt-1 sm:mt-0">
            Modules Active
          </span>
        </div>

        {/* users */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-300 border-2 border-white dark:border-zinc-900 flex-shrink-0"></div>

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-400 border-2 border-white dark:border-zinc-900 flex-shrink-0"></div>

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E0E7FF] border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] sm:text-[10px] font-semibold text-[#1447E6] flex-shrink-0">
              +10
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400">
            {dashboardStats.coursesEnrolled.subtext}
          </p>
        </div>
      </div>
    </div>
  );
};
