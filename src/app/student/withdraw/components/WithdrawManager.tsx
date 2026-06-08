"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowDownCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Hash,
  Info,
  Loader2,
  Search,
  Tag,
  Trash2,
  X,
  Banknote,
} from "lucide-react";
import {
  useStudentWithdrawDeleteMutation,
  useStudentWithdrawsMyQuery,
} from "@/lib/api/student/withdraw";

// ─── Types ──────────────────────────────────────────────────────────────

type UiWithdraw = {
  id: number | string;
  amount: string;
  method: string;
  status: string;
  createdAt: string;
  raw: any;
};

type StatusFilter =
  | "all"
  | "pending"
  | "approved"
  | "rejected"
  | "processing"
  | "paid"
  | "completed";

const PAGE_SIZE = 10;

// ─── Helpers ────────────────────────────────────────────────────────────

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

function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.withdraws)) return payload.withdraws;
  if (Array.isArray(payload?.withdrawals)) return payload.withdrawals;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.withdraws)) return payload.data.withdraws;
  if (Array.isArray(payload?.data?.withdrawals))
    return payload.data.withdrawals;
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

function toUi(raw: any): UiWithdraw | null {
  const id = raw?.id ?? raw?._id ?? raw?.withdrawId ?? raw?.requestId ?? null;
  if (!id) return null;

  const amountRaw =
    raw?.amount ??
    raw?.requestedAmount ??
    raw?.requestAmount ??
    raw?.total ??
    raw?.value ??
    null;
  const amount =
    amountRaw === null || amountRaw === undefined || amountRaw === ""
      ? "—"
      : String(amountRaw);

  const method =
    String(raw?.method ?? raw?.paymentMethod ?? raw?.channel ?? "—").trim() ||
    "—";

  const status =
    String(raw?.status ?? raw?.state ?? raw?.approvalStatus ?? "—").trim() ||
    "—";

  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);

  return { id, amount, method, status, createdAt, raw };
}

// ─── Status Badge (compact) ─────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const v = status.toLowerCase();
  const cls =
    v === "approved" || v === "paid" || v === "completed"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : v === "pending" || v === "processing"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : v === "rejected"
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${cls}`}
    >
      {status}
    </span>
  );
}

// ─── Details Modal (compact) ────────────────────────────────────────────

function DetailsModal({
  item,
  onClose,
}: {
  item: UiWithdraw;
  onClose: () => void;
}) {
  const fields = useMemo(() => {
    if (!item.raw) return [];
    const result: { label: string; value: string }[] = [];
    const flatten = (obj: any, prefix = "") => {
      for (const [key, val] of Object.entries(obj)) {
        const label = prefix ? `${prefix} › ${key}` : key;
        if (val && typeof val === "object" && !Array.isArray(val)) {
          flatten(val, label);
        } else {
          result.push({ label, value: String(val ?? "—") });
        }
      }
    };
    flatten(item.raw);
    return result;
  }, [item.raw]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowDownCircle className="h-4 w-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-gray-900">
              Withdraw Details
            </h2>
            <span className="text-[10px] font-mono text-gray-400">
              #{String(item.id).slice(0, 8)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
        <div className="p-4 space-y-1 overflow-y-auto">
          {fields.map((f, i) => (
            <div
              key={i}
              className="flex justify-between gap-4 py-1.5 border-b border-gray-50 text-xs"
            >
              <span className="font-medium text-gray-500 truncate">
                {f.label}
              </span>
              <span className="font-mono text-gray-800 text-right break-all">
                {f.value}
              </span>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold bg-gray-900 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Confirm Modal (compact) ────────────────────────────────────────────

function ConfirmModal({
  title,
  description,
  confirmText,
  loading,
  onClose,
  onConfirm,
}: {
  title: string;
  description: string;
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
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-600">{description}</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-200 bg-white py-2 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 rounded-lg bg-red-600 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60 flex items-center justify-center gap-1"
            >
              {loading && <Loader2 className="h-3 w-3 animate-spin" />}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component (compact & clean) ───────────────────────────────────

export default function WithdrawManager() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<
    | { type: "none" }
    | { type: "details"; item: UiWithdraw }
    | { type: "delete"; item: UiWithdraw }
  >({ type: "none" });

  const { data, isFetching, isError } = useStudentWithdrawsMyQuery({
    search: search || undefined,
    status: status === "all" ? undefined : status,
    page,
    limit: PAGE_SIZE,
  });

  const [deleteWithdraw, deleteState] = useStudentWithdrawDeleteMutation();

  const items = useMemo(() => {
    const rawList = extractList(data);
    return rawList.map(toUi).filter(Boolean) as UiWithdraw[];
  }, [data]);

  const total = extractTotal(data);
  const totalPages =
    total === null
      ? Math.max(1, page)
      : Math.max(1, Math.ceil(total / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto ">
        {/* Simplified header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-emerald-600" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Withdrawals
            </h1>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600">
              Student
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            <span>Secure transactions</span>
          </div>
        </div>

        {/* Table card */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border-b border-gray-100">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by ID, method..."
                className="w-full rounded-lg border border-gray-200 py-1.5 pl-8 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X size={12} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as StatusFilter);
                setPage(1);
              }}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium"
            >
              <option value="all">All status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => canPrev && setPage((p) => p - 1)}
                disabled={!canPrev}
                className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium disabled:opacity-40"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <span className="text-xs text-gray-600 px-2">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => canNext && setPage((p) => p + 1)}
                disabled={!canNext}
                className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium disabled:opacity-40"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["ID", "Amount", "Method", "Status", "Created", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isFetching ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-10 text-center">
                      <Loader2 className="inline h-4 w-4 animate-spin text-gray-400" />
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-10 text-center text-xs text-red-500"
                    >
                      Failed to load withdrawals
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-10 text-center text-xs text-gray-400"
                    >
                      No withdrawals found
                    </td>
                  </tr>
                ) : (
                  items.map((w) => (
                    <tr
                      key={String(w.id)}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2.5 text-xs font-mono text-gray-500">
                        #{String(w.id).slice(0, 8)}
                      </td>
                      <td className="px-3 py-2.5 text-xs font-bold text-gray-900">
                        {w.amount}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-gray-600">
                        {w.method}
                      </td>
                      <td className="px-3 py-2.5">
                        <StatusBadge status={w.status} />
                      </td>
                      <td className="px-3 py-2.5 text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {w.createdAt}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() =>
                              setModal({ type: "details", item: w })
                            }
                            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-indigo-600"
                            title="Details"
                          >
                            <Info className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setModal({ type: "delete", item: w })
                            }
                            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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

      {/* Modals */}
      {modal.type === "details" && (
        <DetailsModal
          item={modal.item}
          onClose={() => setModal({ type: "none" })}
        />
      )}
      {modal.type === "delete" && (
        <ConfirmModal
          title="Delete withdrawal"
          description={`Request #${String(modal.item.id).slice(0, 8)} will be permanently removed.`}
          confirmText="Delete"
          loading={deleteState.isLoading}
          onClose={() => setModal({ type: "none" })}
          onConfirm={async () => {
            await deleteWithdraw(modal.item.id).unwrap();
            setModal({ type: "none" });
          }}
        />
      )}
    </div>
  );
}
