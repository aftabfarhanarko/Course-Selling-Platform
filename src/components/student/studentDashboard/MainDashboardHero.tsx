"use client";
import { useEffect, useState } from "react";

export const MainDashboard = () => {
  const [progressData, setProgressData] = useState({
    percentage: 85,
    label: "Course Progress",
    status: "Almost there!",
  });

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
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-300 hover:shadow-md group">
        <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase font-bold">
          WELCOME BACK, ALEX
        </p>

        <h1 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold mt-3 leading-tight sm:leading-snug text-slate-900 dark:text-white">
          Fueling your journey to{" "}
          <span className="text-primary dark:text-blue-500 bg-primary/10 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg">
            precision prosperity.
          </span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-4 text-[11px] sm:text-[12.5px] leading-relaxed max-w-md">
          Track your progress, manage your earnings, and expand your portfolio  
          from your personal architectural hub.
        </p>
      </div>

      {/* RIGHT CARD - Dynamic Progress */}
      <div className="bg-primary text-primary-foreground rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-primary/20 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="text-sm sm:text-[15px] font-bold tracking-tight">    
              {progressData.label}
            </h2>
            <span className="text-[10px] sm:text-[11px] font-black bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {progressData.percentage}% Complete
            </span>
          </div>

          <p className="text-[11px] sm:text-[12.5px] text-white/90 mt-3 leading-relaxed font-medium">
            {progressData.status} You've completed {progressData.percentage}% of
            your goal.
          </p>

          {/* Progress Bar */}
          <div className="mt-5 space-y-2">
            <div className="relative bg-white/10 w-full h-2 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="absolute top-0 left-0 bg-[#4ADE80] h-full rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_12px_rgba(74,222,128,0.5)]"
                style={{ width: `${progressData.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => alert("Loading growth analytics...")}
            className="mt-6 w-full sm:w-auto bg-white text-primary font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all active:scale-95 text-[11px] sm:text-[12px] shadow-sm uppercase tracking-wider"
          >
            view your growth
          </button>
        </div>
      </div>
    </div>
  );
};
