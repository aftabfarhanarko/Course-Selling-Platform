"use client";

import { DashboardRecentActivity } from "../../components/student/studentDashboard/DashboardRecentActivity";
import { DashBoardBalcnes } from "../../components/student/studentDashboard/DashbordBalances";
import { MainDashboard } from "../../components/student/studentDashboard/MainDashboardHero";

function page() {
  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8 bg-slate-50/50 dark:bg-zinc-950 min-h-screen pb-10">
      <MainDashboard />
      <DashBoardBalcnes />
      <DashboardRecentActivity />
    </div>
  );
}

export default page;
