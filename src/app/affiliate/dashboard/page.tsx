"use client";

import React, { useMemo } from "react";
import { Activity, DollarSign, Package, Copy, ExternalLink, Loader2 } from "lucide-react";
import { useGetAffiliateDashboardQuery } from "@/lib/api/affiliateApi";
import { toast } from "sonner";
import Image from "next/image";

export default function AffiliateDashboard() {
  const { data: stats, isLoading, isError } = useGetAffiliateDashboardQuery();

  const statsList = useMemo(() => {
    if (!stats) return [];
    if (Array.isArray(stats)) return stats;
    if (Array.isArray(stats?.data)) return stats.data;
    if (Array.isArray(stats?.items)) return stats.items;
    return [];
  }, [stats]);

  const totals = useMemo(() => {
    return statsList.reduce(
      (acc: { totalIncome: number; totalSales: number }, item: any) => {
        acc.totalIncome += Number(item.totalIncome) || 0;
        acc.totalSales += Number(item.totalEnrollments) || 0;
        return acc;
      },
      { totalIncome: 0, totalSales: 0 }
    );
  }, [statsList]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Referral link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-zinc-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-red-500 font-bold">Failed to load affiliate statistics.</p>
          <p className="text-xs text-zinc-400">Please make sure the backend server is running correctly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1 sm:p-4">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Affiliate Dashboard</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Monitor your referred sales, copy promotional links, and track your revenue.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Income */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-xs font-black uppercase text-zinc-400 dark:text-zinc-500">Total Income</h3>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl">
              <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              ${totals.totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] font-bold text-emerald-600 mt-1">
              All-time commissions earned
            </p>
          </div>
        </div>

        {/* Products Sold */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-xs font-black uppercase text-zinc-400 dark:text-zinc-500">Total Referrals</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-2xl">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              {totals.totalSales}
            </div>
            <p className="text-[11px] font-bold text-blue-600 mt-1">
              Successful student enrollments
            </p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-xs font-black uppercase text-zinc-400 dark:text-zinc-500">Promotable Courses</h3>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl">
              <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              {statsList.length}
            </div>
            <p className="text-[11px] font-bold text-indigo-600 mt-1">
              Published courses available for promotion
            </p>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
        <div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white">Your Promotional Campaigns</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Copy referral links to share with your audience and start earning.</p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-100 dark:divide-zinc-800">
            <thead className="bg-zinc-50 dark:bg-zinc-950">
              <tr>
                {["Course", "Price", "Referrals", "Earnings", "Referral Link"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-left text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {statsList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-400">
                    No courses available for affiliate promotion at this moment.
                  </td>
                </tr>
              ) : (
                statsList.map((item: any) => (
                  <tr key={item.courseId} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 relative rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                          {item.courseThumbnail ? (
                            <Image
                              src={item.courseThumbnail}
                              alt={item.courseTitle}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-black text-zinc-400">
                              NO IMG
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-[240px]">
                          <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                            {item.courseTitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm font-black text-zinc-950 dark:text-zinc-100 whitespace-nowrap">
                      {item.totalEnrollments}
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      ${Number(item.totalIncome).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-medium bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-zinc-600 dark:text-zinc-300 max-w-[200px] truncate select-all">
                          {item.affiliateLink}
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.affiliateLink)}
                          className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition"
                          title="Copy Link"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
