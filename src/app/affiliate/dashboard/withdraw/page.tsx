"use client";

import React, { useMemo, useState } from "react";
import { HandCoins, Loader2, Plus, Clock, ShieldCheck, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetReferredEnrollmentsQuery,
  useGetAffiliateWithdrawalsQuery,
  useRequestAffiliateWithdrawalMutation,
  useDeleteAffiliateWithdrawalMutation,
} from "@/lib/api/affiliateApi";

export default function AffiliateWithdrawPage() {
  const { data: sales, isLoading: salesLoading } = useGetReferredEnrollmentsQuery();
  const { data: withdrawals, isLoading: withdrawalsLoading } = useGetAffiliateWithdrawalsQuery();

  const [requestWithdraw, { isLoading: isRequesting }] = useRequestAffiliateWithdrawalMutation();
  const [deleteRequest, { isLoading: isDeleting }] = useDeleteAffiliateWithdrawalMutation();

  const salesList = useMemo(() => {
    if (!sales) return [];
    if (Array.isArray(sales)) return sales;
    if (Array.isArray(sales?.data)) return sales.data;
    return [];
  }, [sales]);

  const withdrawalsList = useMemo(() => {
    if (!withdrawals) return [];
    if (Array.isArray(withdrawals)) return withdrawals;
    if (Array.isArray(withdrawals?.items)) return withdrawals.items;
    if (Array.isArray(withdrawals?.data)) return withdrawals.data;
    return [];
  }, [withdrawals]);

  // Determine which enrollment IDs have already been requested or approved
  const requestedEnrollmentIds = useMemo(() => {
    return new Set(
      withdrawalsList
        .map((w: any) => w?.enrollment?.id)
        .filter(Boolean)
    );
  }, [withdrawalsList]);

  const handleRequestWithdraw = async (enrollmentId: number) => {
    const toastId = toast.loading("Submitting withdrawal request...");
    try {
      await requestWithdraw({ enrollmentId }).unwrap();
      toast.success("Withdrawal request submitted successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit request", { id: toastId });
    }
  };

  const handleDeleteRequest = async (id: number) => {
    const toastId = toast.loading("Cancelling request...");
    try {
      await deleteRequest(id).unwrap();
      toast.success("Withdrawal request cancelled successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel request", { id: toastId });
    }
  };

  if (salesLoading || withdrawalsLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-zinc-500">Loading withdrawals manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1 sm:p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0">
          <HandCoins className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white leading-none">Withdrawals</h2>
          <p className="text-xs text-zinc-400 mt-1.5">Request disbursal on referred sales and track payment history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Referred Sales Eligible for Withdrawal */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-base font-black text-zinc-900 dark:text-white mb-1">Referred Sales</h3>
          <p className="text-xs text-zinc-400 mb-6">Select a completed referral sale to request commission payout.</p>

          {salesList.length === 0 ? (
            <div className="text-center py-14 text-sm text-zinc-400 font-semibold">
              No referred sales recorded yet.
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {salesList.map((sale: any) => {
                const isRequested = requestedEnrollmentIds.has(sale.id);
                return (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 px-5 py-4"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {sale?.course?.title || "Course Sale"}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Student: {sale?.student?.name || "Student"}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                        Enrolled: {sale.enrolledAt ? new Date(sale.enrolledAt).toLocaleDateString() : "—"}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-zinc-900 dark:text-white">
                        ${Number(sale.amount || 0).toFixed(2)}
                      </div>
                      <button
                        onClick={() => handleRequestWithdraw(sale.id)}
                        disabled={isRequested || isRequesting}
                        className={`mt-2 rounded-xl px-3 py-1.5 text-[10px] font-bold border transition ${
                          isRequested
                            ? "bg-zinc-100 text-zinc-400 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 cursor-not-allowed"
                            : "bg-blue-600 text-white border-blue-600 hover:brightness-105"
                        }`}
                      >
                        {isRequested ? "Requested" : "Request Payout"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Withdrawal Requests History */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-base font-black text-zinc-900 dark:text-white mb-1">Disbursal History</h3>
          <p className="text-xs text-zinc-400 mb-6">View status of submitted payout requests.</p>

          {withdrawalsList.length === 0 ? (
            <div className="text-center py-14 text-sm text-zinc-400 font-semibold">
              No withdrawals history found.
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {withdrawalsList.map((w: any) => {
                const status = String(w.status).toLowerCase();
                const canCancel = status === "pending";
                
                return (
                  <div
                    key={w.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 px-5 py-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-white">
                        Payout Request #{w.id}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Course: {w?.enrollment?.course?.title || "—"}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                        Requested: {w.createdAt ? new Date(w.createdAt).toLocaleDateString() : "—"}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-zinc-900 dark:text-white">
                        ${Number(w.totalAmount ?? w.amount ?? 0).toFixed(2)}
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          status === "approved" || status === "completed" || status === "paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : status === "rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {status.toUpperCase()}
                        </span>
                        {canCancel && (
                          <button
                            onClick={() => handleDeleteRequest(w.id)}
                            disabled={isDeleting}
                            className="p-1 rounded-lg border border-red-200 text-red-500 bg-white hover:bg-red-50 transition"
                            title="Cancel Request"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
