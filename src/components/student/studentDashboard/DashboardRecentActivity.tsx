'use client'

import React, { useState } from 'react'
import {
  TrendingUp,
  ShoppingBag,
  Landmark,
  ArrowRight,
  MoreVertical
} from 'lucide-react'

export const DashboardRecentActivity = () => {
  const [activities] = useState([
    {
      id: 1,
      title: 'Affiliate Commission',
      subtitle: 'From user @lucas_digital',
      amount: '+$124.00',
      type: 'income',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 2,
      title: 'Course Purchase',
      subtitle: 'The Advanced Wealth Strategy',
      amount: '-$499.00',
      type: 'expense',
      icon: ShoppingBag,
      iconBg: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 3,
      title: 'Wallet Withdrawal',
      subtitle: 'Completed to Bank Account',
      amount: '-$1,200.00',
      type: 'withdraw',
      icon: Landmark,
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    }
  ]);

  const continueLearning = {
    title: 'High-Frequency Income Architecting',
    module: 'Module 4: Scaling your referral network to 5-figures.',
    progress: 65
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 sm:gap-5 lg:gap-6">    

      {/* Recent Activity */}
      <div className="bg-[#F8FAFF] dark:bg-zinc-900/50 rounded-2xl p-5 sm:p-6 lg:p-7 border border-[#E2E8F0] dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Recent Activity
          </h2>
          <button className="text-[#2563EB] text-[11px] sm:text-[12px] font-bold hover:underline uppercase tracking-wider">
            View All History
          </button>
        </div>

        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activity.icon
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
      <div className="bg-[#EEF2FF] dark:bg-indigo-950/30 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[350px] border border-[#E0E7FF] dark:border-indigo-900/50 group transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
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
               <p className="text-[#2563EB] font-black text-[11px] sm:text-[12px] uppercase tracking-wider">
                {continueLearning.progress}% Completed
              </p>
              <div className="w-32 h-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${continueLearning.progress}%` }}></div>
              </div>
            </div>

            <button 
              onClick={() => alert("Redirecting to course player...")}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-[#1D4ED8] transition-all shadow-lg shadow-blue-500/30 active:scale-90"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
