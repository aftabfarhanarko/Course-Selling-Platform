"use client";

import { BookOpen, Calendar, TrendingUp, Users, Wallet, ArrowUpRight } from "lucide-react";

export const DashBoardBalcnes = () => {
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
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-[#ECECF2] dark:border-zinc-800 p-4 sm:p-5 lg:p-6 overflow-hidden group hover:border-primary/20 dark:hover:border-primary/50 transition-all duration-300">
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
          <Wallet className="w-12 sm:w-16 h-12 sm:h-16 text-primary" strokeWidth={1.5} />
        </div>

        <p className="text-[9px] sm:text-[10px] uppercase tracking-[2px] font-bold text-[#64748B] dark:text-gray-500">
          {dashboardStats.currentBalance.label}
        </p>

        <div className="flex items-baseline gap-2 mt-4 sm:mt-5">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-black text-[#0F172A] dark:text-white leading-none">
            ${dashboardStats.currentBalance.amount.toLocaleString()}
          </h2>
          <div className="flex items-center gap-0.5 text-[#16A34A] text-[10px] sm:text-[11px] font-black bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>{dashboardStats.currentBalance.percentageChange}%</span>      
          </div>
        </div>

        <button
          onClick={() => alert("Withdrawal request initiated...")}
          className="mt-5 bg-primary hover:bg-primary/90 transition-all text-primary-foreground text-[11px] sm:text-[12px] font-bold px-5 py-2.5 rounded-xl w-full sm:w-auto shadow-sm shadow-primary/20 dark:shadow-none active:scale-95"
        >
          Withdraw funds
        </button>
      </div>

      {/* Card 2 */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-[#ECECF2] dark:border-zinc-800 p-4 sm:p-5 lg:p-6 overflow-hidden group hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all duration-300">
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
          <Users className="w-12 sm:w-16 h-12 sm:h-16 text-[#166534]" strokeWidth={1.5} />
        </div>

        <p className="text-[9px] sm:text-[10px] uppercase tracking-[2px] font-bold text-[#64748B] dark:text-gray-500">
          {dashboardStats.affiliateEarnings.label}
        </p>

        <div className="flex items-baseline gap-2 mt-4 sm:mt-5">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-black text-[#0F172A] dark:text-white leading-none">
            ${dashboardStats.affiliateEarnings.amount.toLocaleString()}
          </h2>
          <span className="text-[#16A34A] text-[10px] sm:text-[11px] font-black bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
            Lifetime
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-5 text-[11px] sm:text-[12px] text-[#64748B] dark:text-gray-500 font-medium">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <p>
            Next payout:{" "}
            <span className="font-bold text-[#1E293B] dark:text-white">
              {dashboardStats.affiliateEarnings.nextPayoutDate}
            </span>
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-[#ECECF2] dark:border-zinc-800 p-4 sm:p-5 lg:p-6 overflow-hidden sm:col-span-2 lg:col-span-1 group hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-300">
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
          <BookOpen className="w-12 sm:w-16 h-12 sm:h-16 text-[#3c578c]" strokeWidth={1.5} />
        </div>

        <p className="text-[9px] sm:text-[10px] uppercase tracking-[2px] font-bold text-[#64748B] dark:text-gray-500">
          {dashboardStats.coursesEnrolled.label}
        </p>

        <div className="flex items-baseline gap-2 mt-4 sm:mt-5">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-black text-[#0F172A] dark:text-white leading-none">
            {dashboardStats.coursesEnrolled.activeModules}
          </h2>
          <span className="text-[#64748B] dark:text-gray-400 text-[11px] sm:text-[13px] font-bold">
            Modules Active
          </span>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+20}`} alt="User" />
              </div>
            ))}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] sm:text-[10px] font-black text-primary flex-shrink-0">   
              +10
            </div>
          </div>
          <p className="text-[11px] sm:text-[12px] text-[#64748B] dark:text-gray-500 font-medium">
            {dashboardStats.coursesEnrolled.subtext}
          </p>
        </div>
      </div>
    </div>
  );
};
