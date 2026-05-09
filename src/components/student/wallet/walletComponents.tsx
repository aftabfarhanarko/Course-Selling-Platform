"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  Landmark,
  TrendingUp,
} from "lucide-react";

import Image from "next/image";

export const WalletDashboard = () => {
  const chartData = [
    { month: "Jul", value: 35 },
    { month: "Aug", value: 55 },
    { month: "Sep", value: 40 },
    { month: "Oct", value: 75 },
    { month: "Nov", value: 60 },
    { month: "Dec", value: 85 },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Sale - UI Design Masterclass",
      date: "Oct 24, 2023",
      amount: "+$199.00",
      type: "income",
    },
    {
      id: 2,
      title: "Withdrawal to Bank",
      date: "Oct 22, 2023",
      amount: "-$1,200.00",
      type: "expense",
    },
    {
      id: 3,
      title: "Affiliate Commission",
      date: "Oct 18, 2023",
      amount: "+$45.50",
      type: "income",
    },
    {
      id: 4,
      title: "Sale - Python Automation",
      date: "Oct 15, 2023",
      amount: "+$299.00",
      type: "income",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* top cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* left side */}
        <div className="space-y-6">
          {/* Available Funds */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Available Funds
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-6 break-words">
              $12,450.00{" "}
              <span className="text-sm sm:text-base font-medium text-zinc-400">
                USD
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="w-full sm:w-auto bg-[#1447E6] hover:bg-[#0f3bc2] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300">
                Withdraw Funds
              </button>

              <button className="w-full sm:w-auto border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300">
                Add Funds
              </button>
            </div>
          </div>

          {/* Income Performance */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Income Performance
              </h3>

              <button className="w-fit flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                Last 6 Months
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-end justify-between gap-2 sm:gap-4 h-52 border-b border-zinc-100 dark:border-zinc-800 pb-2 overflow-x-auto">
              {chartData.map((data) => (
                <div
                  key={data.month}
                  className="flex flex-col items-center gap-2 flex-1 min-w-[40px]"
                >
                  <div
                    className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-t-xl relative overflow-hidden"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-xl transition-all duration-500"
                      style={{ height: `${data.value}%` }}
                    />
                  </div>

                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="space-y-6">
          {/* Total Earnings */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Total Lifetime Earnings
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-4 break-words">
              $48,290.32
            </h2>

            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 w-fit px-3 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-emerald-600" />

              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                +12.5% from last month
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Recent Activity
              </h3>

              <button className="text-sm font-semibold text-[#1447E6] hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-5">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      activity.type === "income"
                        ? "bg-emerald-100 dark:bg-emerald-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}
                  >
                    {activity.type === "income" ? (
                      <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    )}
                  </div>

                  <div className="flex-1 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {activity.title}
                      </p>

                      <p
                        className={`text-sm font-bold ${
                          activity.type === "income"
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {activity.amount}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* methods section */}
      <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
        
        {/* blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 sm:p-8 lg:p-12 items-center">
          
          {/* left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                Secure Payment Methods
              </p>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
              Fast Payouts,
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Global Reach.
              </span>
            </h1>

            <p className="mt-5 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Connect your preferred payment method to receive your earnings
              instantly. We support direct bank transfers, PayPal, and major
              crypto wallets worldwide with enterprise-level security.
            </p>

            {/* cards */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              
              {/* bank card */}
              <div className="flex-1 group flex items-center justify-between bg-white dark:bg-zinc-900 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Landmark className="w-6 h-6 text-blue-500" />
                  </div>

                  <div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold text-sm sm:text-base">
                      Chase Bank
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                      **** 4829
                    </p>
                  </div>
                </div>
              </div>

              {/* button */}
              <div className="flex items-center">
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300">
                  + Add Method
                </button>
              </div>
            </div>
          </div>

          {/* right image */}
          <div className="relative flex justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-md">
              <Image
                alt="card image"
                width={500}
                height={320}
                src={"/images/Container.png"}
                className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />

              {/* floating box */}
              <div className="absolute -top-3 sm:-top-5 -left-2 sm:-left-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-zinc-500 text-xs">
                  Monthly Payout
                </p>

                <h3 className="text-zinc-900 dark:text-white text-lg sm:text-xl font-bold">
                  $8,420
                </h3>
              </div>

              {/* floating box */}
              <div className="absolute -bottom-3 sm:-bottom-5 -right-2 sm:-right-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-zinc-500 text-xs">
                  Success Rate
                </p>

                <h3 className="text-emerald-500 text-lg sm:text-xl font-bold">
                  99.8%
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};