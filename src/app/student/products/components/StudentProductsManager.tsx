"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  ShoppingBag,
  Plus,
  X,
  Banknote,
} from "lucide-react";
import { toast } from "sonner";
import { useStudentMyProductsQuery } from "@/lib/api/student/products";
import { useStudentWithdrawRequestMutation } from "@/lib/api/student/withdraw";
import CreateProductModal from "./CreateProductModal";

type UiProduct = {
  id: number | string;
  title: string;
  category: string;
  price: string;
  status: string;
  createdAt: string;
  raw: any;
};

type StatusFilter = "all" | "pending" | "approved" | "rejected";

const PAGE_SIZE = 10;

function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.myProducts)) return payload.myProducts;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  if (Array.isArray(payload?.data?.myProducts)) return payload.data.myProducts;
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
      raw?.botName ?? raw?.title ?? raw?.name ?? raw?.productName ?? raw?.course?.title ?? "—",
    ).trim() || "—";

  const category =
    String(
      raw?.category ?? raw?.categoryName ?? raw?.course?.category ?? "—",
    ).trim() || "—";

  const priceRaw = raw?.totalAmount ?? raw?.price ?? raw?.amount ?? raw?.total ?? null;
  const price =
    priceRaw === null || priceRaw === undefined || priceRaw === ""
      ? "—"
      : String(priceRaw);

  const status =
    String(raw?.status ?? raw?.state ?? raw?.approvalStatus ?? "—").trim() ||
    "—";

  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);

  return { id, title, category, price, status, createdAt, raw };
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
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function StudentProductsManager() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState<UiProduct | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [requestWithdraw, { isLoading: isWithdrawing }] = useStudentWithdrawRequestMutation();

  const { data, isFetching, isError } = useStudentMyProductsQuery({
    search: search || undefined,
    status: status === "all" ? undefined : status,
    page,
    limit: PAGE_SIZE,
  });

  const items = useMemo(() => {
    const rawList = extractList(data);
    return rawList.map(toUi).filter(Boolean) as UiProduct[];
  }, [data]);

  const total = extractTotal(data);
  const totalPages =
    total === null
      ? Math.max(1, page)
      : Math.max(1, Math.ceil(total / PAGE_SIZE));

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
              Student
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900">
              My Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              GET /products/my (search, status, page, limit)
            </p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
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
                  <option value="approved">Approved</option>
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
                  {[
                    "Product",
                    "Category",
                    "Price",
                    "Status",
                    "Created",
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
                      Failed to load products
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-14 text-center">
                      <div className="inline-flex flex-col items-center gap-2 text-gray-500">
                        <ShoppingBag className="h-6 w-6 text-gray-300" />
                        <span className="text-[12px] font-semibold">
                          No products found
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((p) => (
                    <tr
                      key={String(p.id)}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-900 whitespace-nowrap">
                        {p.title}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-700 whitespace-nowrap">
                        {p.category}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-900 whitespace-nowrap">
                        {p.price}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusPill status={p.status} />
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-600 whitespace-nowrap">
                        {p.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {p.status.toLowerCase() === "approved" && (
                            <button
                              onClick={async () => {
                                const toastId = toast.loading("Requesting withdrawal...");
                                try {
                                  await requestWithdraw({ productId: p.id }).unwrap();
                                  toast.success("Withdrawal requested successfully!", { id: toastId });
                                } catch (e: any) {
                                  toast.error(e?.data?.message || e?.error || "Failed to request withdrawal", { id: toastId });
                                }
                              }}
                              disabled={isWithdrawing}
                              className="inline-flex items-center justify-center gap-1.5 px-3 h-9 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                              title="Withdraw Earnings"
                            >
                              <Banknote className="h-4 w-4" />
                              <span className="text-[11px]">Withdraw</span>
                            </button>
                          )}
                          <button
                            onClick={() => setDetails(p)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
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

      {details ? (
        <ModalShell
          title="Product Details"
          subtitle="Information about your product"
          onClose={() => setDetails(null)}
        >
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 lg:p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-900/30 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{details.title}</h3>
                    <p className="text-indigo-100 mt-1.5 font-semibold text-[13px]">{details.category}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 whitespace-nowrap">
                    <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-wider">{details.status}</span>
                  </div>
                </div>
                
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] sm:text-[11px] text-indigo-200 uppercase tracking-widest font-bold">Total Amount</p>
                    <p className="text-3xl sm:text-4xl font-black mt-1 tracking-tight">
                      {details.price && details.price !== "—" ? `$${details.price}` : "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] sm:text-[11px] text-indigo-200 uppercase tracking-widest font-bold">Created</p>
                    <p className="text-[12px] sm:text-[13px] font-semibold mt-1">{details.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-5 sm:p-6 border border-gray-100">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-4">System Information</h4>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <p className="text-[11px] text-gray-500 font-semibold mb-1">Product ID</p>
                   <p className="text-[13px] font-bold text-gray-900 bg-white border border-gray-200 rounded-xl px-3 py-2">
                     {details.id}
                   </p>
                 </div>
                 
                 {details.raw?.countryCodes?.length > 0 ? (
                 <div>
                   <p className="text-[11px] text-gray-500 font-semibold mb-1">Target Countries</p>
                   <div className="flex flex-wrap gap-1.5">
                     {details.raw.countryCodes.map((c: string) => (
                       <span key={c} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-sm">
                         {c}
                       </span>
                     ))}
                   </div>
                 </div>
                 ) : (
                 <div>
                   <p className="text-[11px] text-gray-500 font-semibold mb-1">Raw API Data</p>
                   <button 
                     onClick={() => alert(JSON.stringify(details.raw, null, 2))}
                     className="text-[12px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                   >
                     View JSON Payload
                   </button>
                 </div>
                 )}
               </div>
            </div>
          </div>
        </ModalShell>
      ) : null}

      <CreateProductModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
      />
    </div>
  );
}
