"use client";

import { Copy, Share2, TrendingUp, Users } from "lucide-react";

function page() {
  const referrals = Array(4).fill(0);

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Affiliate Program
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Earn commissions by referring friends and colleagues.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[
          { label: "Total Referrals", value: "45", icon: Users },
          { label: "Commission Earned", value: "$1,250", icon: TrendingUp },
          { label: "Conversion Rate", value: "32%", icon: Share2 },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                  {stat.label}
                </p>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Referral Link */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4">
          Your Referral Link
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            value="https://course-platform.com/ref/alex-rivera-123"
            readOnly
            className="flex-1 px-4 py-2 sm:py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm"
          />
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors whitespace-nowrap text-sm">
            <Copy size={16} />
            Copy
          </button>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
            Recent Referrals
          </h3>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {referrals.map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  U{i + 1}
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-zinc-900 dark:text-white">
                    User {i + 1}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    Joined 5 days ago
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm sm:text-base font-semibold text-emerald-600">
                  +$50
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Commission
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
