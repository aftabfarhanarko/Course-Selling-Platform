"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  useAdminCreatePercentageMutation,
  useAdminDeletePercentageMutation,
  useAdminPercentageQuery,
  useAdminPercentagesQuery,
  useAdminUpdatePercentageMutation,
} from "@/lib/api/admin/percentage";

// ─── API response shape ───────────────────────────────────────────────────────
// {
//   success: true,
//   statusCode: 200,
//   message: "Request successful",
//   data: [
//     { id: 2, type: "student", percentage: "10.00",
//       createdAt: "2026-05-15T19:00:54.675Z",
//       updatedAt: "2026-05-15T19:00:54.675Z" }
//   ]
// }

type ApiPercentage = {
  id: number;
  type: string;
  percentage: string; // comes as a string e.g. "10.00"
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiPercentage[];
};

type UiPercentage = {
  id: number;
  type: string;
  percentage: number | null; // parsed float
  createdAt: string;
  updatedAt: string;
  raw: ApiPercentage;
};

const PAGE_SIZE = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

/** Destructure the exact API envelope: { success, statusCode, message, data: [...] } */
function extractList(payload: any): ApiPercentage[] {
  if (!payload) return [];
  // Primary shape: { data: [...] }
  if (Array.isArray(payload?.data)) return payload.data;
  // Fallback: bare array
  if (Array.isArray(payload)) return payload;
  return [];
}

/** Pull total count for pagination — tries common envelope locations */
function extractTotal(payload: any): number | null {
  const candidates = [
    payload?.data?.meta?.total,
    payload?.meta?.total,
    payload?.data?.pagination?.total,
    payload?.pagination?.total,
    payload?.data?.total,
    payload?.total,
  ];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

/** Map raw API row → UI-friendly shape */
function toUi(raw: ApiPercentage): UiPercentage {
  const pct = parseFloat(raw.percentage);
  return {
    id: raw.id,
    type: raw.type ?? "—",
    percentage: Number.isFinite(pct) ? pct : null,
    createdAt: formatDate(raw.createdAt),
    updatedAt: formatDate(raw.updatedAt),
    raw,
  };
}

// ─── Modal shell ──────────────────────────────────────────────────────────────

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

// ─── Create / Edit modal (structured fields instead of raw JSON) ──────────────

function PercentageFormModal({
  title,
  subtitle,
  loading,
  initialType,
  initialPercentage,
  onClose,
  onSubmit,
}: {
  title: string;
  subtitle: string;
  loading: boolean;
  initialType: string;
  initialPercentage: string;
  onClose: () => void;
  onSubmit: (body: { type: string; percentage: string }) => void;
}) {
  const [type, setType] = useState(initialType);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [errors, setErrors] = useState<{ type?: string; percentage?: string }>(
    {},
  );

  const validate = () => {
    const e: typeof errors = {};
    if (!type.trim()) e.type = "Type is required";
    const n = parseFloat(percentage);
    if (isNaN(n) || n < 0 || n > 100)
      e.percentage = "Must be a number between 0 and 100";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onSubmit({
      type: type.trim(),
      percentage: parseFloat(percentage).toFixed(2),
    });
  };

  return (
    <ModalShell
      title={title}
      subtitle={subtitle}
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        {/* Type field */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Type
          </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g. student, teacher, admin"
            className={`w-full px-3 py-2.5 text-[13px] border rounded-xl outline-none focus:ring-2 focus:ring-indigo-300 ${
              errors.type ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.type && (
            <p className="text-[10px] text-red-500 mt-1">{errors.type}</p>
          )}
        </div>

        {/* Percentage field */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Percentage (%)
          </label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="e.g. 10.00"
            min={0}
            max={100}
            step={0.01}
            className={`w-full px-3 py-2.5 text-[13px] border rounded-xl outline-none focus:ring-2 focus:ring-indigo-300 ${
              errors.percentage ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.percentage && (
            <p className="text-[10px] text-red-500 mt-1">{errors.percentage}</p>
          )}
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[12px] font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2.5 text-[12px] font-bold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

// ─── Delete confirm modal ──────────────────────────────────────────────────────

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
          This action can't be undone.
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
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

// ─── Details modal ────────────────────────────────────────────────────────────

function DetailsModal({ id, onClose }: { id: number; onClose: () => void }) {
  const {
    data: apiResponse,
    isFetching,
    isError,
  } = useAdminPercentageQuery(id);

  // The single-item query likely returns the same envelope: { data: {...} }
  const detail: ApiPercentage | null = apiResponse?.data ?? apiResponse ?? null;

  return (
    <ModalShell
      title="Percentage Details"
      subtitle={`GET /percentage/${id}`}
      loading={isFetching}
      onClose={onClose}
    >
      {isFetching ? (
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : isError ? (
        <div className="text-[12px] text-red-500 font-semibold py-4">
          Failed to load details
        </div>
      ) : detail ? (
        <div className="space-y-3">
          {/* Structured display */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "ID", value: detail.id },
              { label: "Type", value: detail.type },
              {
                label: "Percentage",
                value: `${parseFloat(detail.percentage).toFixed(2)}%`,
              },
              { label: "Created", value: formatDate(detail.createdAt) },
              { label: "Updated", value: formatDate(detail.updatedAt) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                  {label}
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
          {/* Raw JSON */}
          <details className="group">
            <summary className="text-[11px] text-indigo-600 font-semibold cursor-pointer select-none">
              Raw JSON
            </summary>
            <pre className="mt-2 text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[200px]">
              {JSON.stringify(detail, null, 2)}
            </pre>
          </details>
        </div>
      ) : null}
    </ModalShell>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PercentageManager() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<
    | { type: "none" }
    | { type: "details"; id: number }
    | { type: "create" }
    | { type: "edit"; item: UiPercentage }
    | { type: "delete"; item: UiPercentage }
  >({ type: "none" });

  // ── Data fetching ──────────────────────────────────────────────────────────
  const {
    data: apiResponse,
    isFetching,
    isError,
  } = useAdminPercentagesQuery({
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const [createPercentage, createState] = useAdminCreatePercentageMutation();
  const [updatePercentage, updateState] = useAdminUpdatePercentageMutation();
  const [deletePercentage, deleteState] = useAdminDeletePercentageMutation();

  // ── Destructure API response ───────────────────────────────────────────────
  // Shape: { success, statusCode, message, data: ApiPercentage[] }
  const items = useMemo<UiPercentage[]>(() => {
    const rawList = extractList(apiResponse); // pulls apiResponse.data
    return rawList.map(toUi);
  }, [apiResponse]);

  const total = extractTotal(apiResponse);
  const totalPages =
    total === null
      ? Math.max(1, page)
      : Math.max(1, Math.ceil(total / PAGE_SIZE));

  const canPrev = page > 1;
  const canNext = page < totalPages;
  const anyLoading =
    createState.isLoading || updateState.isLoading || deleteState.isLoading;

  const closeModal = () => setModal({ type: "none" });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
              Admin
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900">
              Percentage
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Create, edit, and manage commission percentages.
            </p>
          </div>
          <button
            onClick={() => setModal({ type: "create" })}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-[12px] font-black text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Percentage
          </button>
        </div>

        {/* Table card */}
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 w-full sm:w-[380px]">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by type…"
                  className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none"
                />
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <button
                  onClick={() => canPrev && setPage((p) => p - 1)}
                  disabled={!canPrev}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <span className="text-[12px] font-bold text-gray-700">
                  Page {page} / {totalPages}
                </span>
                <button
                  onClick={() => canNext && setPage((p) => p + 1)}
                  disabled={!canNext}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "ID",
                    "Type",
                    "Percentage",
                    "Created At",
                    "Updated At",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {isFetching ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-14 text-center">
                      <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-red-600"
                    >
                      Failed to load percentages
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-gray-500"
                    >
                      No percentages found
                    </td>
                  </tr>
                ) : (
                  items.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-700 whitespace-nowrap">
                        {p.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 capitalize">
                          {p.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-bold text-indigo-700 whitespace-nowrap">
                        {p.percentage === null
                          ? "—"
                          : `${p.percentage.toFixed(2)}%`}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-600 whitespace-nowrap">
                        {p.createdAt}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-600 whitespace-nowrap">
                        {p.updatedAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              setModal({ type: "details", id: p.id })
                            }
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setModal({ type: "edit", item: p })}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              setModal({ type: "delete", item: p })
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

      {/* ── Modals ── */}

      {modal.type === "details" && (
        <DetailsModal id={modal.id} onClose={closeModal} />
      )}

      {modal.type === "create" && (
        <PercentageFormModal
          title="Create Percentage"
          subtitle="POST /percentage"
          loading={createState.isLoading}
          initialType=""
          initialPercentage=""
          onClose={closeModal}
          onSubmit={async (body) => {
            await createPercentage(body).unwrap();
            closeModal();
          }}
        />
      )}

      {modal.type === "edit" && (
        <PercentageFormModal
          title="Edit Percentage"
          subtitle={`PATCH /percentage/${modal.item.id}`}
          loading={updateState.isLoading}
          initialType={modal.item.type}
          initialPercentage={String(modal.item.percentage ?? "")}
          onClose={closeModal}
          onSubmit={async (body) => {
            await updatePercentage({ id: modal.item.id, body }).unwrap();
            closeModal();
          }}
        />
      )}

      {modal.type === "delete" && (
        <ConfirmModal
          title="Delete Percentage"
          description={`DELETE /percentage/${modal.item.id}`}
          confirmText="Delete"
          loading={deleteState.isLoading}
          onClose={closeModal}
          onConfirm={async () => {
            await deletePercentage(modal.item.id).unwrap();
            closeModal();
          }}
        />
      )}

      {/* Global loading toast */}
      {anyLoading && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]">
          <div className="rounded-2xl bg-gray-900 text-white px-4 py-2.5 text-[12px] font-semibold shadow-xl">
            Processing…
          </div>
        </div>
      )}
    </div>
  );
}
