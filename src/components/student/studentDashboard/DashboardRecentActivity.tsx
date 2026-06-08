"use client";

import React from "react";
import { useGetStudentDashboardStatsQuery } from "@/lib/api/statsApi";
import { RiArrowRightLine } from "react-icons/ri";
import { TbTrendingUp, TbShoppingBag, TbBuildingBank } from "react-icons/tb";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "TrendingUp":
      return TbTrendingUp;
    case "ShoppingBag":
      return TbShoppingBag;
    case "Landmark":
      return TbBuildingBank;
    default:
      return TbTrendingUp;
  }
};

export const DashboardRecentActivity = () => {
  const { data, isLoading } = useGetStudentDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 sm:gap-4">
        <div className="h-[280px] rounded-2xl bg-slate-100 animate-pulse" />
        <div className="h-[280px] rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  const activities = data?.activities || [];
  const continueLearning = data?.continueLearning || {
    title: "Explore our courses",
    module: "Visit the store to start learning.",
    progress: 0,
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 sm:gap-4">
      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-[15px] sm:text-[16px] font-black text-slate-900">
            Recent Activity
          </h2>
          <button className="text-[#4f8ef7] text-[10px] font-bold hover:underline uppercase tracking-wider">
            View All History →
          </button>
        </div>

        <div className="space-y-2">
          {activities.length === 0 ? (
            <div className="text-center text-slate-400 text-[12px] py-10 bg-slate-50 rounded-xl">
              No recent activity yet.
            </div>
          ) : (
            activities.map((activity: any) => {
              const Icon = getIcon(activity.icon);
              return (
                <div
                  key={activity.id}
                  className="flex items-center justify-between bg-slate-50 hover:bg-blue-50/50 rounded-xl px-3.5 py-3 transition-all duration-200 group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${activity.iconBg} flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[12px] sm:text-[13px] font-bold text-slate-900 truncate">
                        {activity.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                        {activity.subtitle}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-[13px] sm:text-[14px] font-black shrink-0 ml-2 ${
                      activity.type === "income"
                        ? "text-emerald-600"
                        : "text-slate-900"
                    }`}
                  >
                    {activity.amount}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Continue Learning */}
      <div className="relative bg-[#4f8ef7] rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-lg shadow-blue-400/15 group hover:shadow-blue-400/25 transition-all duration-300 min-h-[240px]">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -mr-18 -mt-18 blur-3xl group-hover:bg-white/15 transition-all" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-2xl" />

        <div className="relative z-10">
          <h2 className="text-[15px] sm:text-[16px] font-black text-white">
            Continue Learning
          </h2>
        </div>

        <div className="relative z-10 mt-4">
          <h3 className="text-[20px] sm:text-[24px] font-black text-white leading-tight tracking-tight">
            {continueLearning.title}
          </h3>
          <p className="text-white/75 text-[11px] sm:text-[12px] mt-2 leading-relaxed">
            {continueLearning.module}
          </p>

          <div className="flex items-center justify-between mt-5 gap-3">
            <div className="flex-1">
              <p className="text-white/80 font-bold text-[10px] uppercase tracking-wider">
                {continueLearning.progress}% Completed
              </p>
              <div className="w-full h-1.5 bg-white/20 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-[#4ADE80] rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                  style={{ width: `${continueLearning.progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => alert("Redirecting to course player...")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 active:scale-90 transition-all shadow-md flex-shrink-0"
            >
              <RiArrowRightLine className="w-4 h-4 sm:w-5 sm:h-5 text-[#4f8ef7]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
