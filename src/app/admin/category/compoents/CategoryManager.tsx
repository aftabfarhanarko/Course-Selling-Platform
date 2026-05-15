"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  useAdminCategoriesQuery,
  useAdminCreateCategoryMutation,
  useAdminDeleteCategoryMutation,
  useAdminRestoreCategoryMutation,
  useAdminUpdateCategoryMutation,
  useLazyAdminCategoryQuery,
} from "@/lib/api/admin/course";

type Status = "Active" | "Deleted";

type UiCategory = {
  id: number | string;
  name: string;
  description?: string;
  status: Status;
  createdAt?: string;
};

const PAGE_SIZE = 10;

function extractCategories(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.categories)) return payload.data.categories;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.data?.categories))
    return payload.data.data.categories;
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

function normalizeStatus(raw: any): Status {
  const deleted =
    Boolean(raw?.isDeleted) ||
    Boolean(raw?.deletedAt) ||
    String(raw?.status ?? "").toLowerCase() === "deleted";
  return deleted ? "Deleted" : "Active";
}

function formatDate(value: unknown): string | undefined {
  if (!value) return undefined;
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function normalizeCategory(raw: any): UiCategory | null {
  const id = raw?.id ?? raw?._id ?? raw?.categoryId ?? null;
  const name = String(raw?.name ?? raw?.title ?? "").trim();
  if (!id || !name) return null;

  const description =
    typeof raw?.description === "string" && raw.description.trim().length > 0
      ? raw.description.trim()
      : undefined;

  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);

  return {
    id,
    name,
    description,
    status: normalizeStatus(raw),
    createdAt,
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
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
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

function CategoryFormModal({
  initial,
  loading,
  onClose,
  onSubmit,
}: {
  initial?: UiCategory | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string; description?: string }) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Category name is required";
    return e;
  };

  const submit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSubmit({
      name: name.trim(),
      description:
        description.trim().length > 0 ? description.trim() : undefined,
    });
  };

  return (
    <ModalShell
      title={initial ? "Edit Category" : "Create Category"}
      subtitle={initial ? "PATCH /category/:id" : "POST /category"}
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
          />
          {errors.name ? (
            <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Description{" "}
            <span className="text-gray-300 normal-case font-normal">
              (optional)
            </span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[90px] px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            {initial ? "Save" : "Create"}
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
  confirmTone,
  loading,
  onClose,
  onConfirm,
}: {
  title: string;
  description: React.ReactNode;
  confirmText: string;
  confirmTone: "danger" | "primary";
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const btn =
    confirmTone === "danger"
      ? "bg-red-500 hover:bg-red-600 shadow-red-200"
      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200";

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
            className={`flex-1 py-2.5 rounded-xl text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg transition-colors disabled:opacity-60 disabled:pointer-events-none ${btn}`}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailsModal({
  id,
  onClose,
}: {
  id: number | string;
  onClose: () => void;
}) {
  const [trigger, { data, isFetching, isError }] = useLazyAdminCategoryQuery();

  React.useEffect(() => {
    trigger(id);
  }, [id, trigger]);

  return (
    <ModalShell
      title="Category Details"
      subtitle="GET /category/:id"
      loading={isFetching}
      onClose={onClose}
    >
      {isFetching ? (
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-8">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : isError ? (
        <div className="text-[12px] text-red-500 font-semibold py-4">
          Failed to load details
        </div>
      ) : (
        <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[320px]">
          {JSON.stringify(data ?? null, null, 2)}
        </pre>
      )}
    </ModalShell>
  );
}

export default function CategoryManager(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | Status>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useAdminCategoriesQuery({
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const [createCategory, { isLoading: isCreating }] =
    useAdminCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useAdminUpdateCategoryMutation();
  const [restoreCategory, { isLoading: isRestoring }] =
    useAdminRestoreCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useAdminDeleteCategoryMutation();

  const categories = useMemo(() => {
    const list = extractCategories(data);
    return list
      .map(normalizeCategory)
      .filter((x): x is UiCategory => Boolean(x));
  }, [data]);

  const filtered = useMemo(() => {
    if (!status) return categories;
    return categories.filter((c) => c.status === status);
  }, [categories, status]);

  const totalFromApi = extractTotal(data);
  const totalPages = Math.max(
    1,
    totalFromApi !== null
      ? Math.ceil(totalFromApi / PAGE_SIZE)
      : Math.ceil(filtered.length / PAGE_SIZE) || 1,
  );

  const safePage = Math.min(page, totalPages);
  const paginated =
    totalFromApi !== null
      ? filtered
      : filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const total = categories.length;
  const active = categories.filter((c) => c.status === "Active").length;
  const deleted = categories.filter((c) => c.status === "Deleted").length;

  const [createOpen, setCreateOpen] = useState(false);
  const [edit, setEdit] = useState<UiCategory | null>(null);
  const [detailsId, setDetailsId] = useState<number | string | null>(null);
  const [restore, setRestore] = useState<UiCategory | null>(null);
  const [remove, setRemove] = useState<UiCategory | null>(null);

  const busy = isCreating || isUpdating || isRestoring || isDeleting;

  return (
    <>
      {createOpen ? (
        <CategoryFormModal
          loading={isCreating}
          onClose={() => setCreateOpen(false)}
          onSubmit={async (payload) => {
            await createCategory(payload).unwrap();
            setCreateOpen(false);
          }}
        />
      ) : null}

      {edit ? (
        <CategoryFormModal
          initial={edit}
          loading={isUpdating}
          onClose={() => setEdit(null)}
          onSubmit={async (payload) => {
            await updateCategory({ id: edit.id, ...payload }).unwrap();
            setEdit(null);
          }}
        />
      ) : null}

      {detailsId !== null ? (
        <DetailsModal id={detailsId} onClose={() => setDetailsId(null)} />
      ) : null}

      {restore ? (
        <ConfirmModal
          title="Restore category?"
          description={
            <>
              Restore{" "}
              <span className="font-semibold text-gray-800">
                {restore.name}
              </span>{" "}
              via{" "}
              <span className="font-semibold text-gray-800">
                /category/:id/restore
              </span>
            </>
          }
          confirmText="Restore"
          confirmTone="primary"
          loading={busy}
          onClose={() => setRestore(null)}
          onConfirm={async () => {
            await restoreCategory(restore.id).unwrap();
            setRestore(null);
          }}
        />
      ) : null}

      {remove ? (
        <ConfirmModal
          title="Delete category?"
          description={
            <>
              Delete{" "}
              <span className="font-semibold text-gray-800">{remove.name}</span>{" "}
              via{" "}
              <span className="font-semibold text-gray-800">
                DELETE /category/:id
              </span>
            </>
          }
          confirmText="Delete"
          confirmTone="danger"
          loading={busy}
          onClose={() => setRemove(null)}
          onConfirm={async () => {
            await deleteCategory(remove.id).unwrap();
            setRemove(null);
          }}
        />
      ) : null}

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              Category Management
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              GET /category (search,page,limit) · GET /category/:id · POST
              /category · PATCH /category/:id · DELETE /category/:id · PATCH
              /category/:id/restore
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={isCreating}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:pointer-events-none"
          >
            <Plus size={14} /> Create Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-indigo-200">
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
              Total Categories
            </p>
            <p className="mt-1 text-[26px] font-extrabold">{total}</p>
          </div>
          <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              Active
            </p>
            <p className="mt-1 text-[26px] font-extrabold text-gray-900">
              {active}
            </p>
          </div>
          <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
              Deleted
            </p>
            <p className="mt-1 text-[26px] font-extrabold text-gray-900">
              {deleted}
            </p>
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
              placeholder="Search category..."
              className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setPage(1);
              }}
              className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Deleted">Deleted</option>
            </select>
            <button
              onClick={() => setPage(1)}
              className="h-9 px-3 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
            >
              <RotateCcw size={14} /> Reset Page
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  {["Name", "Created", "Status", "Actions"].map((h) => (
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
                    <td colSpan={4} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading
                        categories...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load categories
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-10 text-center text-[12px] text-gray-400"
                    >
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((c) => (
                    <tr
                      key={String(c.id)}
                      className="hover:bg-indigo-50/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-[12px] font-bold text-gray-900 truncate">
                            {c.name}
                          </p>
                          {c.description ? (
                            <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                              {c.description}
                            </p>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {c.createdAt ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            c.status === "Active"
                              ? "inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"
                              : "inline-flex items-center gap-1.5 text-[12px] font-semibold text-amber-600"
                          }
                        >
                          <span
                            className={
                              c.status === "Active"
                                ? "w-1.5 h-1.5 rounded-full bg-emerald-500"
                                : "w-1.5 h-1.5 rounded-full bg-amber-500"
                            }
                          />
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailsId(c.id)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                            title="Details"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() => setEdit(c)}
                            className="p-2 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>

                          {c.status === "Deleted" ? (
                            <button
                              onClick={() => setRestore(c)}
                              className="p-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700"
                              title="Restore"
                            >
                              <RotateCcw size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setRemove(c)}
                              className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
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
              Page <span className="text-gray-700">{safePage}</span> of{" "}
              <span className="text-gray-700">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
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
