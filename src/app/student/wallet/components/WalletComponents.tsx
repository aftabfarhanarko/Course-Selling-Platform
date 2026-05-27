"use client";

import React, { useMemo } from "react";
import { Loader2, Wallet, X, TrendingUp, Clock, CreditCard as CardIcon } from "lucide-react";
import { useStudentWalletMyQuery } from "@/lib/api/student/wallet";

function extractRoot(payload: any): any {
  if (!payload) return null;
  return payload?.data ?? payload?.wallet ?? payload;
}

function extractArray(payload: any, keys: string[]): any[] {
  for (const key of keys) {
    const parts = key.split(".");
    let cur: any = payload;
    for (const p of parts) cur = cur?.[p];
    if (Array.isArray(cur)) return cur;
  }
  return [];
}

function extractNumber(payload: any, keys: string[]): number | null {
  for (const key of keys) {
    const parts = key.split(".");
    let cur: any = payload;
    for (const p of parts) cur = cur?.[p];
    const n = Number(cur);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function extractString(payload: any, keys: string[]): string {
  for (const key of keys) {
    const parts = key.split(".");
    let cur: any = payload;
    for (const p of parts) cur = cur?.[p];
    if (typeof cur === "string" && cur.trim()) return cur;
  }
  return "";
}

function formatMoney(amount: number | null, currency: string): string {
  const val = amount === null ? 0 : amount;
  const c = currency || "$";
  return `${c}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const WalletDashboard = () => {
  const { data, isFetching, isError } = useStudentWalletMyQuery();

  const root = useMemo(() => extractRoot(data), [data]);

  const currency = useMemo(
    () =>
      extractString(root, [
        "currency",
        "balance.currency",
        "available.currency",
        "data.currency",
      ]) || "",
    [root],
  );

  const available = useMemo(
    () =>
      extractNumber(root, [
        "available",
        "availableBalance",
        "available_amount",
        "balance.available",
        "balance",
        "currentBalance",
        "amount",
      ]),
    [root],
  );

  const pending = useMemo(
    () =>
      extractNumber(root, [
        "pending",
        "pendingAmount",
        "pending_amount",
        "balance.pending",
      ]),
    [root],
  );

  const lifetime = useMemo(
    () =>
      extractNumber(root, [
        "lifetime",
        "lifetimeEarnings",
        "totalEarnings",
        "earnings.total",
      ]),
    [root],
  );

  const paymentMethods = useMemo(
    () =>
      extractArray(root, [
        "paymentMethods",
        "methods",
        "payment_methods",
        "data.paymentMethods",
        "data.methods",
      ]),
    [root],
  );

  const activities = useMemo(
    () =>
      extractArray(root, [
        "activities",
        "transactions",
        "history",
        "data.activities",
        "data.transactions",
        "data.history",
      ]),
    [root],
  );

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1447E6] flex items-center justify-center">
            <Wallet className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 dark:text-white leading-none">
              Wallet
            </h1>
            <p className="text-[11px] text-zinc-400 mt-0.5">My Wallet Dashboard</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#1447E6] to-[#0A2E99] rounded-3xl p-6 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-100 mb-3">
              <Wallet className="w-4 h-4" />
              <p className="text-[12px] font-bold uppercase tracking-widest">
                Available Balance
              </p>
            </div>
            <div className="text-4xl font-black tracking-tight mt-1">
              {isFetching ? (
                <span className="inline-flex items-center gap-2 text-lg font-semibold text-blue-200">
                  <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                </span>
              ) : isError ? (
                <span className="text-lg font-semibold text-red-300">
                  Error
                </span>
              ) : (
                formatMoney(available, currency)
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-500 mb-3">
            <Clock className="w-4 h-4" />
            <p className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
              Pending
            </p>
          </div>
          <div className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
            {isFetching ? (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : isError ? (
              <span className="text-sm font-semibold text-red-500">
                Error
              </span>
            ) : (
              formatMoney(pending, currency)
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center gap-2 text-emerald-500 mb-3">
            <TrendingUp className="w-4 h-4" />
            <p className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
              Lifetime Earnings
            </p>
          </div>
          <div className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
            {isFetching ? (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : isError ? (
              <span className="text-sm font-semibold text-red-500">
                Error
              </span>
            ) : (
              formatMoney(lifetime, currency)
            )}
          </div>
        </div>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="mt-4 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
            Payment Methods
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-100 dark:divide-zinc-800">
              <thead className="bg-zinc-50 dark:bg-zinc-950">
                <tr>
                  {["Name", "Type", "Account", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                {paymentMethods.map((m: any, idx: number) => (
                  <tr key={String(m?.id ?? m?._id ?? idx)}>
                    <td className="px-4 py-3 text-[12px] font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                      {String(m?.name ?? m?.title ?? m?.label ?? "—")}
                    </td>
                    <td className="px-4 py-3 text-[12px] font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">
                      {String(m?.type ?? "—")}
                    </td>
                    <td className="px-4 py-3 text-[12px] font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">
                      {String(
                        m?.account ??
                        m?.accountNumber ??
                        m?.number ??
                        m?.walletNumber ??
                        "—",
                      )}
                    </td>
                    <td className="px-4 py-3 text-[12px] font-semibold text-zinc-700 dark:text-zinc-200 whitespace-nowrap">
                      {String(m?.status ?? "—")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {activities.length > 0 ? (
        <div className="mt-4 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
            Activity
          </h3>
          <div className="mt-4 space-y-2">
            {activities.slice(0, 20).map((a: any, idx: number) => (
              <div
                key={String(a?.id ?? a?._id ?? idx)}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="text-[12px] font-bold text-zinc-900 dark:text-white truncate">
                    {String(
                      a?.title ?? a?.name ?? a?.type ?? a?.status ?? "Activity",
                    )}
                  </div>
                  <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 truncate">
                    {String(a?.date ?? a?.createdAt ?? a?.created_at ?? "—")}
                  </div>
                </div>
                <div className="text-[12px] font-extrabold text-zinc-900 dark:text-white whitespace-nowrap">
                  {a?.amount !== undefined && a?.amount !== null
                    ? String(a.amount)
                    : a?.value !== undefined && a?.value !== null
                      ? String(a.value)
                      : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
