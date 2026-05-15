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

type UiPercentage = {
  id: number | string;
  name: string;
  percentage: number | null;
  createdAt: string;
  raw: any;
};

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
  if (Array.isArray(payload?.percentage)) return payload.percentage;
  if (Array.isArray(payload?.percentages)) return payload.percentages;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.percentage)) return payload.data.percentage;
  if (Array.isArray(payload?.data?.percentages))
    return payload.data.percentages;
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

function toUi(raw: any): UiPercentage | null {
  const id = raw?.id ?? raw?._id ?? raw?.percentageId ?? null;
  if (!id) return null;

  const name =
    String(raw?.name ?? raw?.title ?? raw?.label ?? "—").trim() || "—";

  const pctRaw = raw?.percentage ?? raw?.percent ?? raw?.rate ?? raw?.value;
  const percentage =
    pctRaw === undefined || pctRaw === null || pctRaw === ""
      ? null
      : Number(pctRaw);

  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);

  return {
    id,
    name,
    percentage: Number.isFinite(percentage as number)
      ? (percentage as number)
      : null,
    createdAt,
    raw,
  };
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

function JsonBodyModal({
  title,
  subtitle,
  loading,
  initialBody,
  onClose,
  onSubmit,
}: {
  title: string;
  subtitle: string;
  loading: boolean;
  initialBody: Record<string, any>;
  onClose: () => void;
  onSubmit: (body: Record<string, any>) => void;
}) {
  const [text, setText] = useState(JSON.stringify(initialBody, null, 2));
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    try {
      const parsed = JSON.parse(text);
      setError(null);
      onSubmit(parsed);
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <ModalShell
      title={title}
      subtitle={subtitle}
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-full min-h-[220px] px-3 py-2 text-[12px] border rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300 ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
        />
        {error ? <p className="text-[10px] text-red-500">{error}</p> : null}
        <div className="flex gap-2.5">
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
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Submit
          </button>
        </div>
      </div>
    </ModalShell>
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
  id,
  onClose,
}: {
  id: number | string;
  onClose: () => void;
}) {
  const { data, isFetching, isError } = useAdminPercentageQuery(id);

  return (
    <ModalShell
      title="Percentage Details"
      subtitle="GET /percentage/:id"
      loading={isFetching}
      onClose={onClose}
    >
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
    </ModalShell>
  );
}

export default function PercentageManager() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<
    | { type: "none" }
    | { type: "details"; id: number | string }
    | { type: "create" }
    | { type: "edit"; item: UiPercentage }
    | { type: "delete"; item: UiPercentage }
  >({ type: "none" });

  const { data, isFetching, isError } = useAdminPercentagesQuery({
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const [createPercentage, createState] = useAdminCreatePercentageMutation();
  const [updatePercentage, updateState] = useAdminUpdatePercentageMutation();
  const [deletePercentage, deleteState] = useAdminDeletePercentageMutation();

  const items = useMemo(() => {
    const rawList = extractList(data);
    return rawList.map(toUi).filter(Boolean) as UiPercentage[];
  }, [data]);

  const total = extractTotal(data);
  const totalPages =
    total === null
      ? Math.max(1, page)
      : Math.max(1, Math.ceil(total / PAGE_SIZE));

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const anyLoading =
    createState.isLoading || updateState.isLoading || deleteState.isLoading;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
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
                  placeholder="Search..."
                  className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2">
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
                  {["ID", "Name", "Percentage", "Created", ""].map((h) => (
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
                    <td colSpan={5} className="px-4 py-14 text-center">
                      <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-red-600"
                    >
                      Failed to load percentages
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-gray-500"
                    >
                      No percentages found
                    </td>
                  </tr>
                ) : (
                  items.map((p) => (
                    <tr
                      key={String(p.id)}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-700 whitespace-nowrap">
                        {p.id}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                        {p.name}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-bold text-indigo-700 whitespace-nowrap">
                        {p.percentage === null ? "—" : `${p.percentage}%`}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-600 whitespace-nowrap">
                        {p.createdAt}
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

      {modal.type === "details" ? (
        <DetailsModal
          id={modal.id}
          onClose={() => setModal({ type: "none" })}
        />
      ) : null}

      {modal.type === "create" ? (
        <JsonBodyModal
          title="Create Percentage"
          subtitle="POST /percentage"
          loading={createState.isLoading}
          initialBody={{ name: "Commission", percentage: 10 }}
          onClose={() => setModal({ type: "none" })}
          onSubmit={async (body) => {
            await createPercentage(body as any).unwrap();
            setModal({ type: "none" });
          }}
        />
      ) : null}

      {modal.type === "edit" ? (
        <JsonBodyModal
          title="Edit Percentage"
          subtitle={`PATCH /percentage/${modal.item.id}`}
          loading={updateState.isLoading}
          initialBody={{
            name: modal.item.name,
            percentage: modal.item.percentage ?? 0,
          }}
          onClose={() => setModal({ type: "none" })}
          onSubmit={async (body) => {
            await updatePercentage({ id: modal.item.id, body }).unwrap();
            setModal({ type: "none" });
          }}
        />
      ) : null}

      {modal.type === "delete" ? (
        <ConfirmModal
          title="Delete Percentage"
          description={`DELETE /percentage/${modal.item.id}`}
          confirmText="Delete"
          loading={deleteState.isLoading}
          onClose={() => setModal({ type: "none" })}
          onConfirm={async () => {
            await deletePercentage(modal.item.id).unwrap();
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
