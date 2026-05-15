"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
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
  useAdminApproveProductMutation,
  useAdminCreateProductMutation,
  useAdminDeleteProductMutation,
  useAdminMyProductsQuery,
  useAdminProductsQuery,
} from "@/lib/api/admin/products";

type Tab = "all" | "my";

type UiProduct = {
  id: number | string;
  title: string;
  owner: string;
  price: string;
  status: string;
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
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.data?.products))
    return payload.data.data.products;
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

function toUi(raw: any): UiProduct | null {
  const id = raw?.id ?? raw?._id ?? raw?.productId ?? raw?.courseId ?? null;
  if (!id) return null;

  const title =
    String(
      raw?.title ?? raw?.name ?? raw?.course?.title ?? raw?.productName ?? "",
    ).trim() || "—";

  const owner =
    String(
      raw?.user?.name ??
        raw?.user?.email ??
        raw?.seller?.name ??
        raw?.seller?.email ??
        raw?.seller ??
        raw?.owner?.email ??
        raw?.owner ??
        "",
    ).trim() || "—";

  const priceRaw = raw?.price ?? raw?.amount ?? raw?.total ?? null;
  const price =
    priceRaw === null || priceRaw === undefined || priceRaw === ""
      ? "—"
      : String(priceRaw);

  const status =
    String(raw?.status ?? raw?.state ?? raw?.approvalStatus ?? "—").trim() ||
    "—";

  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);

  return { id, title, owner, price, status, createdAt, raw };
}

function StatusPill({ status }: { status: string }) {
  const v = status.toLowerCase();
  const cls =
    v === "approved" || v === "active"
      ? "bg-emerald-50 text-emerald-700"
      : v === "pending"
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
          className={`w-full min-h-[240px] px-3 py-2 text-[12px] border rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300 ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
        />
        {error ? <p className="text-[10px] text-red-500">{error}</p> : null}
        <div className="flex gap-2.5">
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
            Submit
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function DetailsModal({
  product,
  onClose,
}: {
  product: UiProduct;
  onClose: () => void;
}) {
  return (
    <ModalShell
      title="Product Details"
      subtitle="From list payload"
      onClose={onClose}
    >
      <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[420px]">
        {JSON.stringify(product.raw ?? null, null, 2)}
      </pre>
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
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsManager(): React.JSX.Element {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const all = useAdminProductsQuery({
    search: search || undefined,
    status: status || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const my = useAdminMyProductsQuery(
    {
      search: search || undefined,
      status: status || undefined,
      page,
      limit: PAGE_SIZE,
    },
    { skip: tab !== "my" },
  );

  const listPayload = tab === "my" ? my.data : all.data;
  const listLoading = tab === "my" ? my.isLoading : all.isLoading;
  const listError = tab === "my" ? my.isError : all.isError;

  const products = useMemo(() => {
    const list = extractList(listPayload);
    return list.map(toUi).filter((x): x is UiProduct => Boolean(x));
  }, [listPayload]);

  const totalFromApi = extractTotal(listPayload);
  const totalPages = Math.max(
    1,
    totalFromApi ? Math.ceil(totalFromApi / PAGE_SIZE) : 1,
  );

  const [createOpen, setCreateOpen] = useState(false);
  const [details, setDetails] = useState<UiProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UiProduct | null>(null);

  const [createProduct, { isLoading: isCreating }] =
    useAdminCreateProductMutation();
  const [approve, { isLoading: isApproving }] =
    useAdminApproveProductMutation();
  const [remove, { isLoading: isDeleting }] = useAdminDeleteProductMutation();

  const busy = isCreating || isApproving || isDeleting;

  return (
    <>
      {createOpen ? (
        <JsonBodyModal
          title="Create Product"
          subtitle="POST /products"
          loading={isCreating}
          initialBody={{}}
          onClose={() => setCreateOpen(false)}
          onSubmit={async (body) => {
            await createProduct(body).unwrap();
            setCreateOpen(false);
          }}
        />
      ) : null}

      {details ? (
        <DetailsModal product={details} onClose={() => setDetails(null)} />
      ) : null}

      {deleteTarget ? (
        <ConfirmModal
          title="Delete product?"
          description={
            <>
              Delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.title}
              </span>{" "}
              via{" "}
              <span className="font-semibold text-gray-800">
                DELETE /products/:id
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
              Products
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              POST /products · POST /products/:id/approve · GET /products
              (search,status,page,limit) · GET /products/my
              (search,status,page,limit) · DELETE /products/:id
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={isCreating}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:pointer-events-none"
          >
            <Plus size={14} /> Create Product
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 mb-4 flex items-center gap-2 w-fit">
          <button
            onClick={() => {
              setTab("all");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-[12px] font-bold ${tab === "all" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
          >
            All Products
          </button>
          <button
            onClick={() => {
              setTab("my");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-[12px] font-bold ${tab === "my" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
          >
            My Products
          </button>
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
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
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
                    "Product",
                    "Owner",
                    "Price",
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
                {listLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10">
                      <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                      </div>
                    </td>
                  </tr>
                ) : listError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                    >
                      Failed to load products
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[12px] text-gray-400"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr
                      key={String(p.id)}
                      className="hover:bg-indigo-50/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-[12px] font-bold text-gray-900">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {String(p.id)}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-700 font-semibold">
                        {p.owner}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-700 font-semibold">
                        {p.price}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={p.status} />
                      </td>
                      <td className="px-4 py-3 text-[12px] text-gray-500">
                        {p.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetails(p)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                            title="Details"
                          >
                            <Eye size={14} />
                          </button>

                          {p.status.toLowerCase() === "pending" ? (
                            <button
                              disabled={busy}
                              onClick={async () => {
                                await approve(p.id).unwrap();
                              }}
                              className="px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none"
                            >
                              Approve
                            </button>
                          ) : null}

                          <button
                            disabled={busy}
                            onClick={() => setDeleteTarget(p)}
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

          <div className="px-4 py-3 border-t border-gray-50 text-[11px] text-gray-400 font-semibold flex items-center gap-2">
            <AlertTriangle size={14} /> Create product body backend format diye
            JSON box e paste kore submit korlei hobe.
          </div>
        </div>
      </div>
    </>
  );
}
