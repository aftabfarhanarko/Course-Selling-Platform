"use client";

import { AlertCircle, Building2, CreditCard, HandCoins } from "lucide-react";

function page() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Withdraw Funds
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Request a withdrawal from your account balance.
        </p>
      </div>

      {/* Available Balance */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <HandCoins size={20} className="text-emerald-600" />
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            AVAILABLE BALANCE
          </p>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
          $12,450.50
        </p>
      </div>

      {/* Withdrawal Methods */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-3 sm:mb-4">
          Select Withdrawal Method
        </h3>

        {[
          {
            icon: CreditCard,
            title: "Bank Transfer",
            desc: "Direct bank account transfer",
          },
          {
            icon: Building2,
            title: "Wallet Payment",
            desc: "Digital wallet transfer",
          },
        ].map((method, i) => (
          <label
            key={i}
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <input type="radio" name="method" className="mt-1" />
            <div className="flex items-center gap-3 flex-1">
              <method.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm sm:text-base font-medium text-zinc-900 dark:text-white">
                  {method.title}
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  {method.desc}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Withdrawal Amount */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 mb-6 sm:mb-8">
        <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Withdrawal Amount
        </label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-zinc-900 dark:text-white">
            $
          </span>
          <input
            type="number"
            placeholder="0.00"
            className="flex-1 px-3 py-2 sm:py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
          Minimum: $10 | Maximum: $12,450.50
        </p>
      </div>

      {/* Info Alert */}
      <div className="flex gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
        <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
          Withdrawals are typically processed within 1-3 business days. A small
          processing fee may apply.
        </p>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-sm">
        Request Withdrawal
      </button>
    </div>
  );
}

export default page;
