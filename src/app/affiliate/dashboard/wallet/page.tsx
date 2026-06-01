"use client";

import React, { useMemo } from "react";
import { Loader2, Wallet, Clock, TrendingUp, CreditCard } from "lucide-react";
import { useGetAffiliateWalletQuery, useGetAffiliateWithdrawalsQuery } from "@/lib/api/affiliateApi";

export default function AffiliateWalletPage() {
  const { data: walletData, isLoading: walletLoading, isError: walletError } = useGetAffiliateWalletQuery();
  const { data: withdrawData, isLoading: withdrawLoading } = useGetAffiliateWithdrawalsQuery();

  const balance = walletData?.balance !== undefined ? Number(walletData.balance) : 0;

  // Calculate pending and completed withdrawals
  const withdrawStats = useMemo(() => {
    if (!withdrawData) return { pending: 0, completed: 0 };
    
    let list: any[] = [];
    if (Array.isArray(withdrawData)) list = withdrawData;
    else if (Array.isArray(withdrawData?.items)) list = withdrawData.items;
    else if (Array.isArray(withdrawData?.data)) list = withdrawData.data;

    return list.reduce(
      (acc, item: any) => {
        const amt = Number(item.totalAmount ?? item.amount) || 0;
        const status = String(item.status).toLowerCase();
        if (status === "pending" || status === "processing") {
          acc.pending += amt;
        } else if (status === "approved" || status === "completed" || status === "paid") {
          acc.completed += amt;
        }
        return acc;
      },
      { pending: 0, completed: 0 }
    );
  }, [withdrawData]);

  const activities = useMemo(() => {
    if (!withdrawData) return [];
    let list: any[] = [];
    if (Array.isArray(withdrawData)) list = withdrawData;
    else if (Array.isArray(withdrawData?.items)) list = withdrawData.items;
    else if (Array.isArray(withdrawData?.data)) list = withdrawData.data;
    return list;
  }, [withdrawData]);

  if (walletLoading || withdrawLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-zinc-500">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1 sm:p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white leading-none">My Wallet</h2>
          <p className="text-xs text-zinc-400 mt-1.5">Manage your affiliate wallet, view balances, and track earnings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-6 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-blue-100">
                <Wallet className="w-4 h-4" />
                <p className="text-[10px] font-black uppercase tracking-wider">Available Balance</p>
              </div>
              <div className="text-4xl font-black tracking-tight mt-3">
                ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <p className="text-[11px] text-blue-200 font-semibold mt-4">
              Funds ready for instant withdrawal
            </p>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-500">
              <Clock className="w-4 h-4" />
              <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Pending Withdrawals</p>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white mt-3">
              ${withdrawStats.pending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 font-semibold mt-4">
            Awaiting admin approval
          </p>
        </div>

        {/* Lifetime Earnings Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
              <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Withdrawn Earnings</p>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white mt-3">
              ${withdrawStats.completed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 font-semibold mt-4">
            Total funds successfully disbursed
          </p>
        </div>
      </div>

      {/* Activity / Transactions Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
        <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4">Recent Wallet Activity</h3>
        
        {activities.length === 0 ? (
          <div className="text-center py-10 text-sm text-zinc-400 font-semibold">
            No recent wallet activity found.
          </div>
        ) : (
          <div className="space-y-3">
            {activities.slice(0, 10).map((a: any, idx: number) => {
              const amount = Number(a?.studentAmount ?? a?.totalAmount ?? a?.amount ?? 0);
              const status = String(a?.status ?? "—").toUpperCase();
              
              return (
                <div
                  key={String(a?.id ?? idx)}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 px-5 py-4 hover:shadow-sm transition-shadow"
                >
                  <div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-white">
                      Withdrawal Disbursal
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      {a.createdAt ? new Date(a.createdAt).toLocaleString() : "—"}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-zinc-900 dark:text-white">
                      ${amount.toFixed(2)}
                    </div>
                    <span className={`inline-block text-[10px] font-bold rounded-full px-2 py-0.5 mt-1 ${
                      status === "APPROVED" || status === "COMPLETED" || status === "PAID"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : status === "PENDING"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                        : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                    }`}>
                      {status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
