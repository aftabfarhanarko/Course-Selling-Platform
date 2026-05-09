"use client";
import { useEffect, useState } from "react";

export const MainDashboard = () => {
  // Static array data - later will come from backend
  const [progressData, setProgressData] = useState({
    percentage: 85,
    label: "Course Progress",
    status: "Almost there!",
  });

  // simulator for fetching dynamic data from backend
  useEffect(() => {
    const fetchProgressFromBackend = async () => {
      const backendData = {
        percentage: 65,
        label: "Module 3: Advanced Topics",
        status: "Keep going!",
      };

      setProgressData(backendData);
    };

    fetchProgressFromBackend();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
      {/* LEFT CARD */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase">
          Welcome Back, Alex
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 leading-tight sm:leading-snug">
          Fueling your journey to{" "}
          <span className="text-blue-600 dark:text-blue-400">
            precision prosperity.
          </span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed">
          Track your progress, manage your earnings, and expand your portfolio
          from your personal architectural hub.
        </p>
      </div>

      {/* RIGHT CARD - Dynamic Progress from Array/Backend Value */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold truncate">
            {progressData.label}
          </h2>
          <span className="text-[11px] sm:text-xs bg-white/20 px-2 sm:px-3 py-1 rounded-full w-fit">
            {progressData.percentage}% Complete
          </span>
        </div>

        {/* Dynamic status text based on percentage */}
        <p className="text-xs sm:text-sm text-blue-100 mt-2 sm:mt-3 leading-relaxed">
          {progressData.status} You've completed {progressData.percentage}% of
          your goal.
        </p>

        {/* Progress Bar */}
        <div className="mt-3 sm:mt-4 space-y-2">
          <div className="relative bg-blue-900/30 w-full h-2 sm:h-2.5 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bg-[#69FF87] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressData.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-4 sm:mt-6 w-full sm:w-auto bg-white text-blue-600 font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-gray-100 transition-colors text-sm">
          view your growth
        </button>
      </div>
    </div>
  );
};
