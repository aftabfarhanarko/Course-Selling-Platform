"use client";
import { DashboardRecentActivity } from "../../../components/student/studentDashboard/dashboardRecentActivity";
import { DashBoardBalcnes } from "../../../components/student/studentDashboard/dashbordBalances";
import { MainDashboard } from "../../../components/student/studentDashboard/mainDashboardHero";


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
