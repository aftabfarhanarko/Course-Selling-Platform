"use client";

import { DashboardRecentActivity } from "../../../components/student/studentDashboard/DashboardRecentActivity";
import { DashBoardBalcnes } from "../../../components/student/studentDashboard/DashbordBalances";
import { MainDashboard } from "../../../components/student/studentDashboard/MainDashboardHero";

function page() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <MainDashboard />
      <DashBoardBalcnes />
      <DashboardRecentActivity />
    </div>
  );
}

export default page;
