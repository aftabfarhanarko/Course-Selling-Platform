"use client";

import { useGetStudentDashboardStatsQuery } from "@/lib/api/statsApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const MainDashboard = () => {
  const { data, isLoading } = useGetStudentDashboardStatsQuery();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const displayName =
    String(authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "").trim() || "Student";
  const firstName = displayName.split(" ")[0];

  const progressData = data?.progressData || {
    percentage: 0,
    label: "No Active Courses",
    status: "Enroll to start learning!",
  };

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className="h-[160px] sm:h-[180px] rounded-2xl bg-slate-100 animate-pulse" />
        <div className="h-[160px] sm:h-[180px] rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">

      {/* LEFT — Welcome card */}
      <div className="relative bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 overflow-hidden group hover:shadow-md transition-all duration-300">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #4f8ef7 1px, transparent 0)", backgroundSize: "24px 24px" }} />

        <p className="text-[9px] tracking-[0.2em] text-slate-400 uppercase font-bold">
          WELCOME BACK, {firstName.toUpperCase()}
        </p>

        <h1 className="text-[18px] sm:text-[22px] font-extrabold mt-2.5 leading-snug text-slate-900">
          Fueling your journey to{" "}
          <span className="text-[#4f8ef7] bg-blue-50 px-1.5 py-0.5 rounded-lg">
            precision prosperity.
          </span>
        </h1>

        <p className="text-slate-500 mt-3 text-[11px] sm:text-[12px] leading-relaxed max-w-sm">
          Track your progress, manage your earnings, and expand your portfolio from your personal hub.
        </p>
      </div>

      {/* RIGHT — Progress card */}
      <div className="relative bg-[#4f8ef7] text-white rounded-2xl p-5 sm:p-6 overflow-hidden shadow-lg shadow-blue-400/20 group hover:shadow-blue-400/30 transition-all duration-300">
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/15 transition-all" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-2xl" />

        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[13px] sm:text-[14px] font-bold leading-tight">
              {progressData.label}
            </h2>
            <span className="shrink-0 text-[10px] font-black bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
              {progressData.percentage}% Complete
            </span>
          </div>

          <p className="text-[11px] sm:text-[12px] text-white/80 leading-relaxed">
            {progressData.status} You've completed {progressData.percentage}% of your goal.
          </p>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="relative bg-white/15 w-full h-2 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 bg-[#4ADE80] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(74,222,128,0.6)]"
                style={{ width: `${progressData.percentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => alert("Loading growth analytics...")}
            className="w-full sm:w-auto self-start bg-white text-[#4f8ef7] font-bold px-5 py-2 rounded-xl hover:bg-blue-50 active:scale-95 transition-all text-[11px] uppercase tracking-wider shadow-sm"
          >
            View Your Growth
          </button>
        </div>
      </div>
    </div>
  );
};