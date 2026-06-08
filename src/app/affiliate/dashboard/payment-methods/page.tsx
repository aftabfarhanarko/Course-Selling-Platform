"use client";

import React, { useMemo, useState } from "react";
import {
  CreditCard,
  Loader2,
  Plus,
  Trash2,
  Banknote,
  Smartphone,
  Building2,
  User,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetAffiliatePaymentMethodsQuery,
  useCreateAffiliatePaymentMethodMutation,
} from "@/lib/api/affiliateApi";

/* ── helpers ── */
const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  bkash: Smartphone,
  nagad: Smartphone,
  bank: Building2,
};

const statusIcon: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  approved: CheckCircle2,
  completed: CheckCircle2,
  paid: CheckCircle2,
  pending: Clock3,
  processing: Clock3,
  rejected: XCircle,
};

const statusColor = (status: string, isDark = false): string => {
  const s = status.toLowerCase();
  if (s === "approved" || s === "completed" || s === "paid")
    return isDark
      ? "bg-emerald-950/30 text-emerald-400 border-emerald-800"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s === "pending" || s === "processing")
    return isDark
      ? "bg-amber-950/30 text-amber-400 border-amber-800"
      : "bg-amber-50 text-amber-700 border-amber-200";
  if (s === "rejected")
    return isDark
      ? "bg-red-950/30 text-red-400 border-red-800"
      : "bg-red-50 text-red-700 border-red-200";
  return isDark
    ? "bg-zinc-800 text-zinc-400 border-zinc-700"
    : "bg-zinc-50 text-zinc-600 border-zinc-200";
};

export default function AffiliatePaymentMethodsPage() {
  const {
    data: methodsData,
    isLoading: methodsLoading,
    isError,
  } = useGetAffiliatePaymentMethodsQuery();
  const [createMethod, { isLoading: isCreating }] =
    useCreateAffiliatePaymentMethodMutation();

  const [createType, setCreateType] = useState<string>("bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [nameOnAccount, setNameOnAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");

  /* extract list */
  const methodsList = useMemo(() => {
    if (!methodsData) return [];
    if (Array.isArray(methodsData)) return methodsData;
    if (Array.isArray(methodsData?.items)) return methodsData.items;
    if (Array.isArray(methodsData?.data)) return methodsData.data;
    return [];
  }, [methodsData]);

  const canSubmit =
    accountNumber.trim().length > 0 && nameOnAccount.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const toastId = toast.loading("Adding payment method...");

    try {
      const payload: any = {
        type: createType,
        accountNumber,
        accountHolderName: nameOnAccount,
      };

      if (createType === "bank") {
        payload.bankName = bankName;
        payload.branchName = branchName;
      }

      await createMethod(payload).unwrap();
      toast.success("Payment method added successfully!", { id: toastId });

      setAccountNumber("");
      setNameOnAccount("");
      setBankName("");
      setBranchName("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add payment method", {
        id: toastId,
      });
    }
  };

  /* loading */
  if (methodsLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center space-y-4">
          <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
            <Loader2 className="relative h-12 w-12 animate-spin text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            Loading payment methods…
          </p>
        </div>
      </div>
    );
  }

  /* error */
  if (isError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center space-y-3 max-w-sm mx-auto">
          <div className="inline-flex p-3 rounded-full bg-red-50">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-red-600 font-bold text-lg">
            Unable to load payment methods
          </p>
          <p className="text-sm text-slate-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-3 lg:p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── Header ── */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl shadow-lg shadow-indigo-500/20">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Payment Methods
            </h1>
          </div>
          <p className="text-slate-500 ml-0 sm:ml-14 max-w-2xl">
            Manage your bKash, Nagad, or bank accounts for commission payouts.
          </p>
        </div>

        {/* ── Two‑column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left – Add form (always on top on mobile) */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-indigo-600" />
                  Add Payout Method
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter correct account details to receive payouts.
                </p>
              </div>

              <div className="space-y-4">
                {/* Type */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Account Type
                  </label>
                  <select
                    value={createType}
                    onChange={(e) => setCreateType(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  >
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="bank">Bank Account</option>
                  </select>
                </div>

                {/* Account number */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    {createType === "bank"
                      ? "Account Number"
                      : "Wallet / Phone Number"}
                  </label>
                  <input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder={
                      createType === "bank"
                        ? "e.g. 123456789012"
                        : "e.g. 017XXXXXXXX"
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                </div>

                {/* Name on account */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Name on Account
                  </label>
                  <input
                    value={nameOnAccount}
                    onChange={(e) => setNameOnAccount(e.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                </div>

                {/* Bank‑only fields */}
                {createType === "bank" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Bank Name
                      </label>
                      <input
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="e.g. Dutch Bangla Bank"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        Branch Name
                      </label>
                      <input
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        placeholder="e.g. Mirpur Branch"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isCreating}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 text-sm font-bold disabled:opacity-60 disabled:pointer-events-none hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.98]"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Adding…
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" /> Submit Method
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right – List of methods */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mb-4">
                <Banknote className="h-4 w-4 text-indigo-600" />
                Payout Accounts
              </h3>

              {methodsList.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex p-4 rounded-full bg-slate-100 mb-4">
                    <CreditCard className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">
                    No payout methods configured yet.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Add your first account using the form on the left.
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop table (hidden on mobile) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100">
                          {["Type", "Account", "Owner", "Status"].map(
                            (heading) => (
                              <th
                                key={heading}
                                className="py-3 px-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400"
                              >
                                {heading}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {methodsList.map((m: any, idx: number) => {
                          const status = String(
                            m?.status ?? "pending",
                          ).toLowerCase();
                          const TypeIcon =
                            typeIcon[String(m.type).toLowerCase()] ??
                            CreditCard;

                          return (
                            <tr
                              key={m.id ?? idx}
                              className="hover:bg-slate-50/50 transition-colors"
                            >
                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600">
                                  <TypeIcon className="h-3.5 w-3.5" />
                                  {String(m.type).toUpperCase()}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-sm font-bold text-slate-700 whitespace-nowrap">
                                {m.accountNumber || m.account || "—"}
                              </td>
                              <td className="py-4 px-4 text-sm font-bold text-slate-700 whitespace-nowrap">
                                {m.accountHolderName || "—"}
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColor(status)}`}
                                >
                                  {status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards (visible only on small screens) */}
                  <div className="md:hidden space-y-4">
                    {methodsList.map((m: any, idx: number) => {
                      const status = String(
                        m?.status ?? "pending",
                      ).toLowerCase();
                      const TypeIcon =
                        typeIcon[String(m.type).toLowerCase()] ?? CreditCard;

                      return (
                        <div
                          key={m.id ?? idx}
                          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200">
                                <TypeIcon className="h-4 w-4 text-indigo-600" />
                              </div>
                              <span className="text-sm font-bold text-slate-800">
                                {String(m.type).toUpperCase()}
                              </span>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColor(status)}`}
                            >
                              {status}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-slate-400" />
                              <span className="font-bold text-slate-700">
                                {m.accountNumber || m.account || "—"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-slate-400" />
                              <span className="font-bold text-slate-700">
                                {m.accountHolderName || "—"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
