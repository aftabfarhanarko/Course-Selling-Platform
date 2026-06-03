'use client'

import React from 'react'
import {
  TrendingUp,
  ShoppingBag,
  Landmark,
  ArrowRight,
  MoreVertical
} from 'lucide-react'
import { useGetStudentDashboardStatsQuery } from "@/lib/api/statsApi";

export const DashboardRecentActivity = () => {
  const { data, isLoading } = useGetStudentDashboardStatsQuery();

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center text-gray-500">Loading activity...</div>;
  }

  const activities = data?.activities || [];
  const continueLearning = data?.continueLearning || {
    title: 'Explore our courses',
    module: 'Visit the store to start learning.',
    progress: 0
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'ShoppingBag': return ShoppingBag;
      case 'Landmark': return Landmark;
      default: return TrendingUp;
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 sm:gap-5 lg:gap-6">

      {/* Recent Activity */}
      <div className="bg-[#F8FAFF] dark:bg-zinc-900/50 rounded-2xl p-5 sm:p-6 lg:p-7 border border-[#E2E8F0] dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6 sm:mb-8">        
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Recent Activity
          </h2>
          <button className="text-primary text-[11px] sm:text-[12px] font-bold hover:underline uppercase tracking-wider">
            View All History
          </button>
        </div>

        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-8">No recent activity.</div>
          ) : activities.map((activity: any) => {
            const Icon = getIcon(activity.icon);
            return (
              <div
                key={activity.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between border border-transparent hover:border-slate-100 dark:hover:border-zinc-800 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center ${activity.iconBg} transition-transform group-hover:scale-110`}>
                    <Icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${activity.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-[13px] sm:text-[14.5px] font-bold text-slate-900 dark:text-white">
                      {activity.title}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-slate-500 dark:text-gray-400 font-medium">
                      {activity.subtitle}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-[14px] sm:text-[16px] font-black ${       
                    activity.type === 'income' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'
                  }`}>
                    {activity.amount}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Continue Learning */}
      <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[350px] border border-primary/10 dark:border-primary/20 group transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
            Continue Learning
          </h2>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl sm:text-[28px] lg:text-[32px] leading-tight font-black text-slate-900 dark:text-white tracking-tight">
            {continueLearning.title}
          </h3>
          <p className="text-slate-500 dark:text-gray-400 text-[13px] sm:text-[14px] mt-4 leading-relaxed font-medium">
            {continueLearning.module}
          </p>

          <div className="flex items-center justify-between mt-8">
            <div className="flex flex-col">
               <p className="text-primary font-black text-[11px] sm:text-[12px] uppercase tracking-wider">
                {continueLearning.progress}% Completed
              </p>
              <div className="w-32 h-1.5 bg-primary/10 dark:bg-primary/20 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${continueLearning.progress}%` }}></div>
              </div>
            </div>

            <button
              onClick={() => alert("Redirecting to course player...")}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 active:scale-90"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
