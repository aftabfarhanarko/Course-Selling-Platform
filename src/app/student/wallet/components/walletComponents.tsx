"use client";

import React, { useMemo, useState } from "react";
import { Eye, Loader2, Wallet, X } from "lucide-react";
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
  if (amount === null) return "—";
  const c = currency || "";
  return c ? `${amount} ${c}` : String(amount);
}

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-extrabold text-zinc-900 dark:text-white">
              {title}
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export const WalletDashboard = () => {
  const { data, isFetching, isError } = useStudentWalletMyQuery();
  const [apiOpen, setApiOpen] = useState(false);

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
            <p className="text-[11px] text-zinc-400 mt-0.5">GET /wallet/my</p>
          </div>
        </div>

        <button
          onClick={() => setApiOpen(true)}
          className="w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          title="View API"
        >
          <Eye className="w-4 h-4 text-zinc-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Available
          </p>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {isFetching ? (
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : isError ? (
              <span className="text-[12px] font-semibold text-red-600">Error</span>
            ) : (
              formatMoney(available, currency)
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Pending
          </p>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {isFetching ? (
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : isError ? (
              <span className="text-[12px] font-semibold text-red-600">Error</span>
            ) : (
              formatMoney(pending, currency)
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Lifetime
          </p>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {isFetching ? (
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : isError ? (
              <span className="text-[12px] font-semibold text-red-600">Error</span>
            ) : (
              formatMoney(lifetime, currency)
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              API Data
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">Raw response</p>
          </div>
          <button
            onClick={() => setApiOpen(true)}
            className="text-[11px] font-semibold text-[#1447E6] hover:underline"
          >
            Full View
          </button>
        </div>

        <div className="mt-4">
          {isFetching ? (
            <div className="flex items-center gap-2 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : isError ? (
            <div className="text-[12px] font-semibold text-red-600">
              Failed to load wallet data
            </div>
          ) : (
            <pre className="text-[11px] text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 overflow-auto max-h-[260px]">
              {JSON.stringify(data ?? null, null, 2)}
            </pre>
          )}
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
                    {String(
                      a?.date ?? a?.createdAt ?? a?.created_at ?? "—",
                    )}
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

      {apiOpen ? (
        <ModalShell
          title="Wallet API Response"
          subtitle="GET /wallet/my"
          onClose={() => setApiOpen(false)}
        >
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 py-10 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : isError ? (
            <div className="py-6 text-[12px] font-semibold text-red-600">
              Failed to load wallet data
            </div>
          ) : (
            <pre className="text-[11px] text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 overflow-auto max-h-[520px]">
              {JSON.stringify(data ?? null, null, 2)}
            </pre>
          )}
        </ModalShell>
      ) : null}
    </div>
  );
};
