"use client";

import { Minus, Plus, Wallet } from "lucide-react";

function page() {
  const transactions = Array(5).fill(0);

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Wallet
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Manage your balance and view transaction history.
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm font-semibold opacity-90 mb-2">
          TOTAL BALANCE
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
          $2,450.50
        </h2>
        <p className="text-xs sm:text-sm opacity-90">
          Last updated: Today at 2:30 PM
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          <Plus size={18} className="text-green-600" />
          <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">
            Add Funds
          </span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          <Minus size={18} className="text-red-600" />
          <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">
            Withdraw
          </span>
        </button>
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
            Recent Transactions
          </h3>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {transactions.map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Wallet size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-zinc-900 dark:text-white">
                    Transaction {i + 1}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    2 days ago
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">
                +$50.00
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
