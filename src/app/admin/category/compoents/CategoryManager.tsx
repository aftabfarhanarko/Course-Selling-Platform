// CategoryManagerPage.tsx
"use client";

import React, { useMemo, useState } from "react";
import { FolderOpen, Plus, Search, X } from "lucide-react";
import {
  useAdminCategoriesQuery,
  useAdminCreateCategoryMutation,
  useAdminDeleteCategoryMutation,
  useAdminRestoreCategoryMutation,
  useAdminUpdateCategoryMutation,
} from "@/lib/api/admin/category";

import { Status, UiCategory } from "./types";
import { extractItems, extractMeta, normalizeCategory } from "./utils";
import { StatCards } from "./StatCards";
import { CategoryFormModal } from "./CategoryFormModal";
import { ConfirmModal } from "./ConfirmModal";
import { DetailsModal } from "./DetailsModal";
import { CategoryTable } from "./CategoryTable";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 10;

export default function CategoryManager(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | Status>("");
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

  const categories = useMemo(
    () =>
      extractItems(data)
        .map(normalizeCategory)
        .filter((x): x is UiCategory => Boolean(x)),
    [data],
  );

  const meta = useMemo(() => extractMeta(data), [data]);

  const filtered = useMemo(
    () =>
      statusFilter
        ? categories.filter((c) => c.status === statusFilter)
        : categories,
    [categories, statusFilter],
  );

  const totalPages =
    meta.totalPages || Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated =
    meta.total > 0
      ? filtered
      : filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const total = meta.total || categories.length;
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
      {/* ── Modals ── */}
      {createOpen && (
        <CategoryFormModal
          loading={isCreating}
          onClose={() => setCreateOpen(false)}
          onSubmit={async (payload) => {
            await createCategory(payload).unwrap();
            setCreateOpen(false);
          }}
        />
      )}
      {edit && (
        <CategoryFormModal
          initial={edit}
          loading={isUpdating}
          onClose={() => setEdit(null)}
          onSubmit={async (payload) => {
            await updateCategory({ id: edit.id, ...payload }).unwrap();
            setEdit(null);
          }}
        />
      )}
      {detailsId !== null && (
        <DetailsModal id={detailsId} onClose={() => setDetailsId(null)} />
      )}
      {restore && (
        <ConfirmModal
          title="Restore category?"
          description={
            <>
              Restore{" "}
              <span className="font-bold text-gray-800">{restore.name}</span>{" "}
              and mark it as active?
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
      )}
      {remove && (
        <ConfirmModal
          title="Delete category?"
          description={
            <>
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-800">{remove.name}</span>?
              This can be restored later.
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
      )}

      {/* ── Page content ── */}
      <div className="min-h-screen  p-3 sm:p-5 lg:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
              <FolderOpen size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-[20px] sm:text-[22px] font-black text-gray-900 tracking-tight">
                Category Management
              </h1>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Manage course categories, slugs, photos and SEO metadata.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={isCreating}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[13px] font-bold px-5 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-60 w-full sm:w-auto"
          >
            <Plus size={15} /> Add Category
          </button>
        </div>

        <StatCards total={total} active={active} deleted={deleted} />

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search categories…"
              className="w-full text-[13px] font-semibold text-gray-700 placeholder:text-gray-300 outline-none bg-transparent"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
              >
                <X size={13} />
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setPage(1);
            }}
            className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full sm:w-auto"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <CategoryTable
              isLoading={isLoading}
              isError={isError}
              categories={paginated}
              onView={(c) => setDetailsId(c.id)}
              onEdit={setEdit}
              onRestore={setRestore}
              onDelete={setRemove}
            />
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            totalItems={meta.total || filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
