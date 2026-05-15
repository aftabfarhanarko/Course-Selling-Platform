"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import {
  useAdminApprovePaymentMethodMutation,
  useAdminDeletePaymentMethodMutation,
  useAdminPaymentMethodQuery,
  useAdminPaymentMethodsQuery,
  useAdminRejectPaymentMethodMutation,
} from "@/lib/api/admin/wallet";

type MethodType = "bkash" | "nagad" | "bank" | "binance";
type MethodStatus = "pending" | "approved" | "rejected";

type UiPaymentMethod = {
  id: number | string;
  type: MethodType | "unknown";
  status: MethodStatus | "unknown";
  label: string;
  account: string;
  owner: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.paymentMethods)) return payload.paymentMethods;
  if (Array.isArray(payload?.methods)) return payload.methods;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.paymentMethods))
    return payload.data.paymentMethods;
  if (Array.isArray(payload?.data?.methods)) return payload.data.methods;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function extractTotal(payload: any): number | null {
  const candidates = [
    payload?.meta?.total,
    payload?.data?.meta?.total,
    payload?.pagination?.total,
    payload?.data?.pagination?.total,
    payload?.total,
    payload?.data?.total,
  ];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

function normalizeType(value: unknown): UiPaymentMethod["type"] {
  const v = String(value ?? "")
    .toLowerCase()
    .trim();
  if (v === "bkash") return "bkash";
  if (v === "nagad") return "nagad";
  if (v === "bank") return "bank";
  if (v === "binance" || v === "binence") return "binance";
  return "unknown";
}

function normalizeStatus(value: unknown): UiPaymentMethod["status"] {
  const v = String(value ?? "")
    .toLowerCase()
    .trim();
  if (v === "pending") return "pending";
  if (v === "approved" || v === "active") return "approved";
  if (v === "rejected") return "rejected";
  return "unknown";
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

function toUi(raw: any): UiPaymentMethod | null {
  const id = raw?.id ?? raw?._id ?? raw?.paymentMethodId ?? null;
  if (!id) return null;

  const type = normalizeType(raw?.type ?? raw?.method ?? raw?.provider);
  const status = normalizeStatus(raw?.status);

  const label =
    String(raw?.label ?? raw?.name ?? raw?.title ?? type).trim() ||
    String(type).toUpperCase();

  const account =
    String(
      raw?.accountNumber ??
        raw?.account ??
        raw?.phone ??
        raw?.walletNumber ??
        raw?.number ??
        "",
    ).trim() || "—";

  const owner =
    String(
      raw?.user?.name ??
        raw?.user?.email ??
        raw?.owner?.name ??
        raw?.owner ??
        raw?.nameOnAccount ??
        "",
    ).trim() || "—";

  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);

  return {
    id,
    type,
    status,
    label,
    account,
    owner,
    createdAt,
  };
}

function StatusPill({ status }: { status: UiPaymentMethod["status"] }) {
  const cls =
    status === "approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "pending"
        ? "bg-amber-50 text-amber-700"
        : status === "rejected"
          ? "bg-red-50 text-red-700"
          : "bg-gray-50 text-gray-600";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${cls}`}
    >
      {status}
    </span>
  );
}

function TypePill({ type }: { type: UiPaymentMethod["type"] }) {
  const cls =
    type === "bkash"
      ? "bg-pink-50 text-pink-700 border border-pink-200"
      : type === "nagad"
        ? "bg-orange-50 text-orange-700 border border-orange-200"
        : type === "bank"
          ? "bg-blue-50 text-blue-700 border border-blue-200"
          : type === "binance"
            ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
            : "bg-gray-50 text-gray-700 border border-gray-200";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${cls}`}
    >
      {type}
    </span>
  );
}

function DetailsModal({
  id,
  onClose,
}: {
  id: number | string;
  onClose: () => void;
}) {
  const { data, isFetching, isError } = useAdminPaymentMethodQuery(id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              Payment Method Details
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              GET /payment-methods/:id
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-5">
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : isError ? (
            <div className="text-[12px] text-red-500 font-semibold py-4">
              Failed to load details
            </div>
          ) : (
            <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[420px]">
              {JSON.stringify(data ?? null, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  description,
  confirmText,
  loading,
  onClose,
  onConfirm,
}: {
  title: string;
  description: React.ReactNode;
  confirmText: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={26} className="text-red-500" />
        </div>
        <h3 className="text-[15px] font-extrabold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-[12px] text-gray-500 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-2.5 mt-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-red-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminWalletApiPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"" | MethodType>("");
  const [status, setStatus] = useState<"" | MethodStatus>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useAdminPaymentMethodsQuery({
    search,
    type: type || undefined,
    status: status || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const [approve, { isLoading: isApproving }] =
    useAdminApprovePaymentMethodMutation();
  const [reject, { isLoading: isRejecting }] =
    useAdminRejectPaymentMethodMutation();
  const [remove, { isLoading: isDeleting }] =
    useAdminDeletePaymentMethodMutation();

  const list = useMemo(
    () => extractList(data).map(toUi).filter(Boolean) as UiPaymentMethod[],
    [data],
  );
  const total = extractTotal(data);
  const totalPages = Math.max(
    1,
    total !== null
      ? Math.ceil(total / PAGE_SIZE)
      : Math.ceil(list.length / PAGE_SIZE) || 1,
  );

  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UiPaymentMethod | null>(
    null,
  );

  const busy = isApproving || isRejecting || isDeleting;

  return (
    <>
      {detailsId !== null ? (
        <DetailsModal id={detailsId} onClose={() => setDetailsId(null)} />
      ) : null}

      {deleteTarget ? (
        <ConfirmModal
          title="Delete payment method?"
          description={
            <>
              Delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.label}
              </span>{" "}
              ({String(deleteTarget.id)}) from{" "}
              <span className="font-semibold text-gray-800">
                /payment-methods/:id
              </span>
            </>
          }
          confirmText="Delete"
          loading={busy}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await remove(deleteTarget.id).unwrap();
            setDeleteTarget(null);
          }}
        />
      ) : null}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              Wallet · Payment Methods
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              /payment-methods (search, type, status, page, limit) +
              approve/reject/delete
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-semibold text-gray-600">
            <ShieldCheck size={14} className="text-emerald-600" />
            Admin review panel
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2.5 w-full lg:w-[360px]">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as any);
                setPage(1);
              }}
              className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white"
            >
              <option value="">All Types</option>
              <option value="bkash">bkash</option>
              <option value="nagad">nagad</option>
              <option value="bank">bank</option>
              <option value="binance">binance</option>
            </select>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setPage(1);
              }}
              className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white"
            >
              <option value="">All Status</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {[
                    "Owner",
                    "Method",
                    "Account",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load payment methods
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-gray-400"
                    >
                      No payment methods found.
                    </td>
                  </tr>
                ) : (
                  list.map((m) => (
                    <tr
                      key={String(m.id)}
                      className="hover:bg-indigo-50/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-[12px] font-bold text-gray-900">
                          {m.owner}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {String(m.id)}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <TypePill type={m.type} />
                          <span className="text-[12px] font-semibold text-gray-700">
                            {m.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-700 font-semibold">
                        {m.account}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={m.status} />
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {m.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailsId(m.id)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                            title="Details"
                          >
                            <Eye size={14} />
                          </button>

                          {m.status === "pending" ? (
                            <>
                              <button
                                disabled={busy}
                                onClick={async () => {
                                  await approve(m.id).unwrap();
                                }}
                                className="px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none"
                              >
                                Approve
                              </button>
                              <button
                                disabled={busy}
                                onClick={async () => {
                                  await reject(m.id).unwrap();
                                }}
                                className="px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none"
                              >
                                Reject
                              </button>
                            </>
                          ) : null}

                          <button
                            disabled={busy}
                            onClick={() => setDeleteTarget(m)}
                            className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-60 disabled:pointer-events-none"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[11px] text-gray-400 font-semibold">
              Page <span className="text-gray-700">{page}</span> of{" "}
              <span className="text-gray-700">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
