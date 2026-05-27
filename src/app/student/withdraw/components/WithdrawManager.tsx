"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  useStudentWithdrawDeleteMutation,
  useStudentWithdrawRequestMutation,
  useStudentWithdrawsMyQuery,
} from "@/lib/api/student/withdraw";

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

function StatusPill({ status }: { status: string }) {
  const v = status.toLowerCase();
  const cls =
    v === "approved" || v === "paid" || v === "completed"
      ? "bg-emerald-50 text-emerald-700"
      : v === "pending" || v === "processing"
        ? "bg-amber-50 text-amber-700"
        : v === "rejected"
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

function ModalShell({
  title,
  subtitle,
  loading,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  loading?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
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
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
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
  description: string;
  confirmText: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalShell
      title={title}
      subtitle={description}
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800 font-semibold">
          This action can’t be undone.
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[12px] font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-2.5 text-[12px] font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function DetailsModal({
  item,
  onClose,
}: {
  item: UiWithdraw;
  onClose: () => void;
}) {
  return (
    <ModalShell
      title="Withdraw Details"
      subtitle="From /withdraw/my"
      onClose={onClose}
    >
      <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[420px]">
        {JSON.stringify(item.raw ?? null, null, 2)}
      </pre>
    </ModalShell>
  );
}

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

  const anyLoading = deleteState.isLoading;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
              Student
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900">
              Withdraw
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Request a withdrawal and manage your withdraw history.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 w-full sm:w-[360px]">
                  <Search className="h-4 w-4 text-gray-400" />
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

                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as StatusFilter);
                    setPage(1);
                  }}
                  className="h-[46px] rounded-2xl border border-gray-200 bg-white px-4 text-[12px] font-bold text-gray-700"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-2">
                <button
                  onClick={() => canPrev && setPage((p) => p - 1)}
                  disabled={!canPrev}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <div className="text-[12px] font-bold text-gray-700">
                  Page {page} / {totalPages}
                </div>
                <button
                  onClick={() => canNext && setPage((p) => p + 1)}
                  disabled={!canNext}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Amount", "Method", "Status", "Created", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {isFetching ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-14 text-center">
                      <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-red-600"
                    >
                      Failed to load withdraws
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-gray-500"
                    >
                      No withdraws found
                    </td>
                  </tr>
                ) : (
                  items.map((w) => (
                    <tr
                      key={String(w.id)}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-700 whitespace-nowrap">
                        {w.id}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-900 whitespace-nowrap">
                        {w.amount}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-700 whitespace-nowrap">
                        {w.method}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusPill status={w.status} />
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-600 whitespace-nowrap">
                        {w.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              setModal({ type: "details", item: w })
                            }
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              setModal({ type: "delete", item: w })
                            }
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-red-600 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
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


      {modal.type === "details" ? (
        <DetailsModal
          item={modal.item}
          onClose={() => setModal({ type: "none" })}
        />
      ) : null}

      {modal.type === "delete" ? (
        <ConfirmModal
          title="Delete Withdraw"
          description={`DELETE /withdraw/${modal.item.id}`}
          confirmText="Delete"
          loading={deleteState.isLoading}
          onClose={() => setModal({ type: "none" })}
          onConfirm={async () => {
            await deleteWithdraw(modal.item.id).unwrap();
            setModal({ type: "none" });
          }}
        />
      ) : null}

      {anyLoading ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]">
          <div className="rounded-2xl bg-gray-900 text-white px-4 py-2.5 text-[12px] font-semibold shadow-xl">
            Processing...
          </div>
        </div>
      ) : null}
    </div>
  );
}
