'use client'

import React from 'react'
import {
  TrendingUp,
  ShoppingBag,
  Landmark,
  ArrowRight
} from 'lucide-react'

export const DashboardRecentActivity = () => {

  // static data - later will come from backend
  const recentActivities = [
    {
      id: 1,
      title: 'Affiliate Commission',
      subtitle: 'From user @lucas_digital',
      amount: '+$124.00',
      type: 'income',
      icon: TrendingUp,
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#16A34A]'
    },

    {
      id: 2,
      title: 'Course Purchase',
      subtitle: 'The Advanced Wealth Strategy',
      amount: '-$499.00',
      type: 'expense',
      icon: ShoppingBag,
      iconBg: 'bg-[#DBEAFE]',
      iconColor: 'text-[#2563EB]'
    },

    {
      id: 3,
      title: 'Wallet Withdrawal',
      subtitle: 'Completed to Bank Account',
      amount: '-$1,200.00',
      type: 'withdraw',
      icon: Landmark,
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#16A34A]'
    }
  ]

  // continue learning data
  const continueLearning = {
    title: 'High-Frequency Income Architecting',
    module: 'Module 4: Scaling your referral network to 5-figures.',
    progress: 65
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5">

      {/* Left Side */}
      <div className="bg-[#F5F7FF] rounded-2xl p-7">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[30px] font-bold text-[#111827]">
            Recent Activity
          </h2>

          <button className="text-[#1447E6] text-sm font-semibold hover:underline">
            View All History
          </button>
        </div>

        {/* Activities */}
        <div className="mt-7 space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activity.icon

            return (
              <div
                key={activity.id}
                className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between"
              >

                {/* left */}
                <div className="flex items-center gap-4">

                  {/* icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.iconBg}`}
                  >
                    <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                  </div>

                  {/* text */}
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111827]">
                      {activity.title}
                    </h3>

                    <p className="text-sm text-[#6B7280] mt-0.5">
                      {activity.subtitle}
                    </p>
                  </div>
                </div>

                {/* amount */}
                <p
                  className={`text-[18px] font-bold ${
                    activity.type === 'income'
                      ? 'text-[#16A34A]'
                      : activity.type === 'withdraw'
                      ? 'text-[#DC2626]'
                      : 'text-[#374151]'
                  }`}
                >
                  {activity.amount}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-[#E8EDFF] rounded-2xl p-7 flex flex-col justify-between min-h-[420px]">

        {/* top */}
        <div>
          <h2 className="text-[30px] font-bold text-[#111827]">
            Continue Learning
          </h2>
        </div>

        {/* bottom */}
        <div>

          <h3 className="text-[32px] leading-[42px] font-bold text-[#111827] max-w-[320px]">
            {continueLearning.title}
          </h3>

          <p className="text-[#6B7280] text-[16px] mt-4 leading-7">
            {continueLearning.module}
          </p>

          {/* footer */}
          <div className="flex items-center justify-between mt-8">

            <p className="text-[#1447E6] font-semibold text-sm">
              {continueLearning.progress}% Completed
            </p>

            <button className="w-11 h-11 rounded-full bg-[#1447E6] flex items-center justify-center hover:bg-[#0f3fd0] transition-all">
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}