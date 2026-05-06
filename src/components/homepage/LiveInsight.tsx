"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { DollarSign, Landmark, Circle } from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LiveInsight = () => {
  const earnings = [
    { name: "John Doe", course: "UI Architecture Path", amount: "+$120.00" },
    { name: "Emma", course: "Agency Mastery", amount: "+$160.41" },
    { name: "Chloe", course: "UI Architecture", amount: "+$100.53" },
    { name: "John Doe", course: "UI Architecture Path", amount: "+$120.00" },
  ];

  const withdrawals = [
    { name: "Michael", status: "Withdrawal Initiated", amount: "$957.34" },
    { name: "Alex Chen", status: "Withdrawal Initiated", amount: "$300.00" },
    { name: "Alex", status: "Withdrawal Initiated", amount: "$540.62" },
    { name: "Michael", status: "Withdrawal Initiated", amount: "$169.52" },
  ];

  return (
    <section className={`py-20 bg-[#f3f4f6] ${plusJakarta.className}`}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-red-500 text-xs font-semibold mb-2">
            <Circle className="w-3 h-3 fill-red-500 stroke-none" />
            LIVE
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Live Insight
          </h2>

          <p className="text-gray-500 mt-2">
            See how users are earning and withdrawing in real-time
          </p>

          {/* Total Earnings */}
          <div className="mt-6 inline-block bg-white px-8 py-4 rounded-full shadow-md">
            <p className="text-xs text-gray-500 mb-1">
              TOTAL EARNINGS DISTRIBUTED
            </p>
            <p className="text-2xl font-bold text-blue-600">
              $12,483,035
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Earnings */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <DollarSign className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold">
                Recent Earnings
              </h3>
            </div>

            <div className="space-y-3">
              {earnings.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.course}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-green-600">
                    {item.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Withdrawals */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <Landmark className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold">
                Recent Withdrawals
              </h3>
            </div>

            <div className="space-y-3">
              {withdrawals.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.status}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">
                      {item.amount}
                    </p>
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      COMPLETED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiveInsight;