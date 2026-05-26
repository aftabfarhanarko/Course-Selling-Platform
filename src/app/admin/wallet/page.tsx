"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  Users,
  Wallet,
  X,
  CreditCard,
} from "lucide-react";
import { useAdminWalletsQuery } from "@/lib/api/admin/wallet";

type UiWallet = {
  id: number | string;
  balance: string;
  user: {
    name: string;
    email: string;
    photo: string;
  };
  createdAt: string;
};

const PAGE_SIZE = 10;

function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function extractTotal(payload: any): number | null {
  const candidates = [
    payload?.data?.meta?.total,
    payload?.meta?.total,
  ];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toUi(raw: any): UiWallet | null {
  const id = raw?.id;
  if (!id) return null;
  const user = raw?.user || {};
  return {
    id,
    balance: raw?.balance ?? "0.00",
    user: {
      name: user.name || "—",
      email: user.email || "—",
      photo: user.photo || "",
    },
    createdAt: formatDate(raw?.createdAt),
  };
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src && src.startsWith("http")) {
    return (
      <img src={src} alt={name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
    );
  }
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  const colors = [
    "bg-violet-100 text-violet-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-pink-100 text-pink-700",
    "bg-amber-100 text-amber-700",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${colors[idx]}`}>
      {initials || "?"}
    </div>
  );
}

export default function AdminWalletPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useAdminWalletsQuery({
    search,
    page,
    limit: PAGE_SIZE,
  });

  const list = useMemo(() => extractList(data).map(toUi).filter(Boolean) as UiWallet[], [data]);
  const total = extractTotal(data);
  const totalPages = Math.max(1, total !== null ? Math.ceil(total / PAGE_SIZE) : Math.ceil(list.length / PAGE_SIZE) || 1);

  const totalCount = total ?? list.length;
  const totalBalance = list.reduce((acc, curr) => acc + Number(curr.balance), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50/60 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-5 sm:mb-6 gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
            <Wallet size={18} className="text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-[16px] sm:text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">
              Wallets
            </h1>
            <p className="text-[11px] sm:text-[12px] text-gray-400 mt-0.5 sm:mt-1 font-medium hidden sm:block">
              Manage user wallets and balances.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3 sm:gap-4 bg-white border border-gray-200">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-600">
            <Wallet size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Total Balance</p>
            <p className="text-[22px] font-extrabold leading-none text-gray-900">৳{totalBalance}</p>
          </div>
        </div>
        <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3 sm:gap-4 bg-white border border-gray-200">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600">
            <Users size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Total Wallets</p>
            <p className="text-[22px] font-extrabold leading-none text-gray-900">{totalCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search user name or email..."
              className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
            />
            {search && (
              <button onClick={() => { setSearch(""); setPage(1); }} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              {["User", "Balance", "Created At"].map((h) => (
                <th key={h} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-[12px] text-gray-500 font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2 text-violet-500" /> Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold">
                  Failed to load wallets
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-14 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Wallet size={20} className="text-gray-400" />
                    </div>
                    <p className="text-[12px] text-gray-400 font-semibold">No wallets found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              list.map((m) => (
                <tr key={String(m.id)} className="hover:bg-violet-50/20 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={m.user.name} src={m.user.photo} />
                      <div>
                        <p className="text-[13px] font-bold text-gray-900 leading-none mb-1">{m.user.name}</p>
                        <p className="text-[10px] text-gray-500">{m.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-[14px] font-extrabold text-emerald-600">৳{m.balance}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-[11px] font-semibold text-gray-500">{m.createdAt}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="px-4 py-3.5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-400 font-semibold">
            Showing <span className="text-gray-700">{list.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, total ?? list.length)}</span> of <span className="text-gray-700">{total ?? list.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"><ChevronLeft size={16} /></button>
            <span className="text-[12px] font-bold text-gray-600 px-1">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
