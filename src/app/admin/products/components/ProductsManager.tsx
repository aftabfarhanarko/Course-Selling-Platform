"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Globe,
  Loader2,
  Package,
  Plus,
  Search,
  Shield,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import {
  useAdminApproveProductMutation,
  useAdminCreateProductMutation,
  useAdminDeleteProductMutation,
  useAdminProductsQuery,
  useAdminRejectProductMutation,
} from "@/lib/api/admin/products";
import { useAdminDirectWithdrawMutation } from "@/lib/api/admin/withdraw";

type UiProduct = {
  id: number | string;
  title: string;
  owner: string;
  ownerEmail: string;
  ownerPhoto?: string;
  price: string;
  status: string;
  status: string;
  createdAt: string;
<<<<<<< HEAD
  countryCodes: string[];
=======
  userId: number;
>>>>>>> 4e23ea4 (update)
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
<<<<<<< HEAD
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
=======
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
>>>>>>> 4e23ea4 (update)
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function extractMeta(payload: any) {
  const meta =
    payload?.data?.meta ??
    payload?.meta ??
    payload?.data?.pagination ??
    payload?.pagination ??
    null;
  return {
    total: Number(meta?.total ?? 0),
    page: Number(meta?.page ?? 1),
    limit: Number(meta?.limit ?? PAGE_SIZE),
    totalPages: Number(meta?.totalPages ?? 1),
  };
}

function toUi(raw: any): UiProduct | null {
  const id = raw?.id ?? raw?._id ?? raw?.productId ?? null;
  if (!id) return null;
  const title =
<<<<<<< HEAD
    String(raw?.botName ?? raw?.title ?? raw?.name ?? "").trim() || "—";
=======
    String(
      raw?.botName ?? raw?.title ?? raw?.name ?? raw?.course?.title ?? raw?.productName ?? "",
    ).trim() || "—";

>>>>>>> 4e23ea4 (update)
  const owner =
    String(
      raw?.user?.name ?? raw?.seller?.name ?? raw?.owner?.name ?? "",
    ).trim() || "—";
  const ownerEmail =
    String(
      raw?.user?.email ?? raw?.seller?.email ?? raw?.owner?.email ?? "",
    ).trim() || "—";
  const ownerPhoto =
    raw?.user?.photo ?? raw?.seller?.photo ?? raw?.owner?.photo ?? undefined;
  const priceRaw = raw?.totalAmount ?? raw?.price ?? raw?.amount ?? null;
  const price =
    priceRaw === null || priceRaw === undefined || priceRaw === ""
      ? "—"
      : `$${Number(priceRaw).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  const status =
    String(raw?.status ?? raw?.state ?? raw?.approvalStatus ?? "—").trim() ||
    "—";
  const createdAt = formatDate(raw?.createdAt ?? raw?.created_at);
<<<<<<< HEAD
  const countryCodes: string[] = Array.isArray(raw?.countryCodes)
    ? raw.countryCodes
    : [];
  return {
    id,
    title,
    owner,
    ownerEmail,
    ownerPhoto,
    price,
    status,
    createdAt,
    countryCodes,
    raw,
  };
=======

  const userId = raw?.user?.id ?? raw?.seller?.id ?? raw?.owner?.id ?? raw?.userId ?? null;

  return { id, title, owner, price, status, createdAt, userId, raw };
>>>>>>> 4e23ea4 (update)
}

function StatusPill({ status }: { status: string }) {
  const v = status.toLowerCase();
  if (v === "approved" || v === "active")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        {status}
      </span>
    );
  if (v === "pending")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse" />
        {status}
      </span>
    );
  if (v === "paid")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
        {status}
      </span>
    );
  if (v === "rejected")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
      {status}
    </span>
  );
}

<<<<<<< HEAD
function JsonBodyModal({
=======
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

function CreateProductModal({
>>>>>>> 4e23ea4 (update)
  loading,
  onClose,
  onSubmit,
}: {
  loading: boolean;
  onClose: () => void;
  onSubmit: (body: any) => void;
}) {
<<<<<<< HEAD
  const [text, setText] = useState("{}");
=======
  const [botName, setBotName] = useState("");
  const [countryCodes, setCountryCodes] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
>>>>>>> 4e23ea4 (update)
  const [error, setError] = useState<string | null>(null);
  const submit = () => {
<<<<<<< HEAD
    try {
      const parsed = JSON.parse(text);
      setError(null);
      onSubmit(parsed);
    } catch {
      setError("Invalid JSON — please fix before submitting");
    }
=======
    if (!botName.trim()) return setError("Bot name is required.");
    if (!totalAmount || isNaN(Number(totalAmount))) return setError("Total amount must be a number.");
    
    const codes = countryCodes.split(",").map(c => c.trim()).filter(Boolean);
    
    onSubmit({
      botName,
      countryCodes: codes,
      totalAmount: Number(totalAmount),
    });
>>>>>>> 4e23ea4 (update)
  };
  return (
<<<<<<< HEAD
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-[15px] font-black text-slate-900">
              Create Product
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
              POST /products
            </p>
          </div>
=======
    <ModalShell
      title="Create Product"
      subtitle="POST /products"
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1">Bot Name</label>
          <input
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="w-full px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g. My Awesome Bot"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1">Country Codes (comma separated)</label>
          <input
            value={countryCodes}
            onChange={(e) => setCountryCodes(e.target.value)}
            className="w-full px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g. US, UK, BD"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1">Total Amount</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g. 100"
          />
        </div>
        {error ? <p className="text-[10px] text-red-500">{error}</p> : null}
        <div className="flex gap-2.5 mt-2">
>>>>>>> 4e23ea4 (update)
          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all disabled:opacity-60"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-6 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full min-h-[260px] px-4 py-3 text-[12px] border-2 rounded-2xl font-mono focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 resize-none transition-all ${error ? "border-red-300 bg-red-50/50" : "border-slate-200 bg-slate-50 hover:border-slate-300"}`}
          />
          {error && (
            <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1">
              <AlertTriangle size={11} />
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-[13px] font-bold text-slate-500 hover:bg-slate-50 transition-all disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-200 transition-all disabled:opacity-60"
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
      </div>
<<<<<<< HEAD
    </div>
=======
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
  const raw = product.raw || {};
  
  return (
    <ModalShell
      title="Product Details"
      subtitle={`ID: ${product.id}`}
      onClose={onClose}
    >
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Header Section */}
        <div className="flex items-start justify-between bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
          <div>
            <h3 className="text-[16px] font-extrabold text-gray-900">{product.title}</h3>
            <p className="text-[12px] text-gray-500 mt-1 font-medium">{product.owner}</p>
          </div>
          <StatusPill status={product.status} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Price / Amount</p>
            <p className="text-[14px] font-semibold text-gray-900">
              {product.price !== "—" ? `$${product.price}` : "Free"}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Created At</p>
            <p className="text-[13px] font-medium text-gray-900">{product.createdAt}</p>
          </div>
        </div>

        {/* Extra Information */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-extrabold text-gray-900 border-b border-gray-100 pb-2">Additional Information</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
            {raw.countryCodes && raw.countryCodes.length > 0 && (
              <div>
                <p className="text-[11px] font-bold text-gray-400 mb-1">Country Codes</p>
                <div className="flex flex-wrap gap-1.5">
                  {raw.countryCodes.map((code: string, idx: number) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg text-[10px] font-bold border border-indigo-100">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {raw.approvedByName && (
              <div>
                <p className="text-[11px] font-bold text-gray-400 mb-1">Approved By</p>
                <p className="text-[12px] font-semibold text-gray-800">{raw.approvedByName}</p>
              </div>
            )}

            {raw.approvalDate && (
              <div>
                <p className="text-[11px] font-bold text-gray-400 mb-1">Approval Date</p>
                <p className="text-[12px] font-semibold text-gray-800">{formatDate(raw.approvalDate)}</p>
              </div>
            )}
            
            {raw.rejectReason && (
              <div className="col-span-1 sm:col-span-2 bg-red-50 p-3 rounded-xl border border-red-100">
                <p className="text-[11px] font-bold text-red-600 mb-1">Reject Reason</p>
                <p className="text-[12px] font-medium text-red-800">{raw.rejectReason}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </ModalShell>
  );
}
function PaymentMethodsModal({
  product,
  onClose,
}: {
  product: UiProduct;
  onClose: () => void;
}) {
  const methods = (product.raw?.user?.paymentMethods || []).filter(
    (pm: any) => pm.status?.toLowerCase() !== "rejected"
  );

  return (
    <ModalShell
      title="Payment Methods"
      subtitle={`Owner: ${product.owner}`}
      onClose={onClose}
    >
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {methods.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-[12px] font-semibold text-gray-500">No payment methods found for this user.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {methods.map((pm: any, idx: number) => (
              <PaymentMethodCard key={idx} pm={pm} product={product} />
            ))}
          </div>
        )}
      </div>
    </ModalShell>
  );
}

function PaymentMethodCard({ pm, product }: { pm: any; product: UiProduct }) {
  const [directWithdraw, { isLoading }] = useAdminDirectWithdrawMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    try {
      setError("");
      await directWithdraw({
        studentId: product.userId,
        productId: Number(product.id),
      }).unwrap();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setError(e?.data?.message || e?.message || "Payment failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1.5">
      <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-1">
        <span className="text-[12px] font-extrabold text-indigo-700 uppercase tracking-wider">{pm.type}</span>
        <StatusPill status={pm.status || "active"} />
      </div>
      {pm.accountNumber && (
        <div className="flex justify-between items-center text-[12px]">
          <span className="font-bold text-gray-400">Account No:</span>
          <span className="font-semibold text-gray-800">{pm.accountNumber}</span>
        </div>
      )}
      {pm.accountHolderName && (
        <div className="flex justify-between items-center text-[12px]">
          <span className="font-bold text-gray-400">Holder Name:</span>
          <span className="font-semibold text-gray-800">{pm.accountHolderName}</span>
        </div>
      )}
      {pm.bankName && (
        <div className="flex justify-between items-center text-[12px]">
          <span className="font-bold text-gray-400">Bank Name:</span>
          <span className="font-semibold text-gray-800">{pm.bankName}</span>
        </div>
      )}
      {pm.branchName && (
        <div className="flex justify-between items-center text-[12px]">
          <span className="font-bold text-gray-400">Branch Name:</span>
          <span className="font-semibold text-gray-800">{pm.branchName}</span>
        </div>
      )}
      {pm.binanceId && (
        <div className="flex justify-between items-center text-[12px]">
          <span className="font-bold text-gray-400">Binance ID:</span>
          <span className="font-semibold text-gray-800">{pm.binanceId}</span>
        </div>
      )}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handlePay}
          disabled={isLoading || success || !product.userId}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 transition-colors disabled:opacity-60 disabled:pointer-events-none"
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {success ? "Payment Sent" : "Pay Directly"}
        </button>
        {error && <p className="text-[10px] text-red-500 mt-1 text-center">{error}</p>}
      </div>
    </div>
  );
}


function RejectModal({
  loading,
  onClose,
  onSubmit,
}: {
  loading: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  return (
    <ModalShell title="Reject Product" subtitle="POST /products/:id/reject" loading={loading} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1">Reason for Rejection</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[100px]"
            placeholder="Please specify a reason..."
          />
        </div>
        <div className="flex gap-2.5 mt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(reason)}
            disabled={loading || !reason.trim()}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-red-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            Reject
          </button>
        </div>
      </div>
    </ModalShell>
>>>>>>> 4e23ea4 (update)
  );
}

function ConfirmModal({
  product,
  loading,
  onClose,
  onConfirm,
}: {
  product: UiProduct;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 text-center border border-slate-100">
        <div className="w-16 h-16 rounded-3xl bg-red-50 border-2 border-red-100 flex items-center justify-center mx-auto mb-5">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <h3 className="text-[16px] font-black text-slate-900 mb-2">
          Delete product?
        </h3>
        <p className="text-[12px] text-slate-500 leading-relaxed">
          This will permanently delete{" "}
          <span className="font-bold text-slate-800">{product.title}</span>.
          This cannot be undone.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-[13px] font-bold text-slate-500 hover:bg-slate-50 transition-all disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition-all disabled:opacity-60"
          >
            {loading && <Loader2 size={13} className="animate-spin" />}Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN LIST PAGE
════════════════════════════════════════════ */
export default function ProductsManager(): React.JSX.Element {
<<<<<<< HEAD
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("all");
=======
>>>>>>> 4e23ea4 (update)
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const all = useAdminProductsQuery({
    search: search || undefined,
    status: status || undefined,
    page,
    limit: PAGE_SIZE,
  });
<<<<<<< HEAD
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
=======

  const listPayload = all.data;
  const listLoading = all.isLoading;
  const listError = all.isError;
>>>>>>> 4e23ea4 (update)

  const products = useMemo(
    () =>
      extractList(listPayload)
        .map(toUi)
        .filter((x): x is UiProduct => Boolean(x)),
    [listPayload],
  );
  const meta = useMemo(() => extractMeta(listPayload), [listPayload]);
  const totalPages = Math.max(1, meta.totalPages);

  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<UiProduct | null>(null);
  const [rejectTarget, setRejectTarget] = useState<UiProduct | null>(null);
  const [paymentTarget, setPaymentTarget] = useState<UiProduct | null>(null);

  const [createProduct, { isLoading: isCreating }] =
    useAdminCreateProductMutation();
  const [approve, { isLoading: isApproving }] =
    useAdminApproveProductMutation();
  const [reject, { isLoading: isRejecting }] =
    useAdminRejectProductMutation();
  const [remove, { isLoading: isDeleting }] = useAdminDeleteProductMutation();
<<<<<<< HEAD
  const busy = isCreating || isApproving || isDeleting;

  return (
    <>
      {createOpen && (
        <JsonBodyModal
=======

  const busy = isCreating || isApproving || isRejecting || isDeleting;

  return (
    <>
      {createOpen ? (
        <CreateProductModal
>>>>>>> 4e23ea4 (update)
          loading={isCreating}
          onClose={() => setCreateOpen(false)}
          onSubmit={async (body) => {
            await createProduct(body).unwrap();
            setCreateOpen(false);
          }}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          product={deleteTarget}
          loading={isDeleting}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await remove(deleteTarget.id).unwrap();
            setDeleteTarget(null);
          }}
        />
      )}

<<<<<<< HEAD
      <div className="min-h-screen bg-[#f5f6fa] p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-[20px] font-black text-slate-900 tracking-tight">
                Products
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Manage all products &amp; approvals
              </p>
            </div>
=======
      {rejectTarget ? (
        <RejectModal
          loading={busy}
          onClose={() => setRejectTarget(null)}
          onSubmit={async (reason) => {
            await reject({ id: rejectTarget.id, reason }).unwrap();
            setRejectTarget(null);
          }}
        />
      ) : null}

      {paymentTarget ? (
        <PaymentMethodsModal
          product={paymentTarget}
          onClose={() => setPaymentTarget(null)}
        />
      ) : null}

      {paymentTarget ? (
        <PaymentMethodsModal
          product={paymentTarget}
          onClose={() => setPaymentTarget(null)}
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
>>>>>>> 4e23ea4 (update)
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={isCreating}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-[13px] font-bold px-5 py-2.5 rounded-2xl transition-all shadow-lg shadow-violet-200 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
          >
            <Plus size={15} />
            Create Product
          </button>
        </div>

<<<<<<< HEAD
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            {
              label: "Total",
              value: meta.total,
              icon: TrendingUp,
              color: "text-violet-600",
              bg: "bg-violet-50",
              border: "border-violet-100",
            },
            {
              label: "This Page",
              value: products.length,
              icon: Package,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
              border: "border-indigo-100",
            },
            {
              label: "Pending",
              value: products.filter(
                (p) => p.status.toLowerCase() === "pending",
              ).length,
              icon: Shield,
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-100",
            },
          ].map(({ label, value, icon: Icon, color, bg, border }) => (
            <div
              key={label}
              className={`bg-white rounded-2xl border ${border} p-4 flex items-center gap-3 shadow-sm`}
            >
              <div
                className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={15} className={color} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold">
                  {label}
                </p>
                <p className="text-[18px] font-black text-slate-900 leading-none mt-0.5">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1 w-fit">
            {(["all", "my"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {t === "all" ? "All Products" : "My Products"}
              </button>
            ))}
=======
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
>>>>>>> 4e23ea4 (update)
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-64">
              <Search size={14} className="text-slate-400 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search products..."
                className="w-full text-[12px] font-semibold text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="h-9 px-3 text-[12px] font-bold border border-slate-200 rounded-xl bg-slate-50 text-slate-700 outline-none focus:border-violet-400 cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {[
                    "Product",
                    "Owner",
                    "Countries",
                    "Price",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest px-5 py-3.5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {listLoading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16">
                      <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
                        <p className="text-[12px] font-semibold">
                          Loading products...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : listError ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                          <AlertTriangle size={20} className="text-red-400" />
                        </div>
                        <p className="text-[12px] text-red-500 font-bold">
                          Failed to load products
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-3xl bg-slate-100 flex items-center justify-center">
                          <Package size={24} className="text-slate-300" />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-slate-400">
                            No products found
                          </p>
                          <p className="text-[11px] text-slate-300 mt-0.5">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr
                      key={String(p.id)}
                      className="hover:bg-violet-50/30 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                            <TrendingUp size={14} className="text-violet-500" />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-slate-900 leading-tight">
                              {p.title}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              #{p.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {p.ownerPhoto ? (
                            <img
                              src={p.ownerPhoto}
                              alt={p.owner}
                              className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-black text-slate-500">
                                {p.owner.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-[12px] font-bold text-slate-800">
                              {p.owner}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                              {p.ownerEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 flex-wrap">
                          {p.countryCodes.length === 0 ? (
                            <span className="text-[11px] text-slate-300">
                              —
                            </span>
                          ) : (
                            p.countryCodes.slice(0, 3).map((cc) => (
                              <span
                                key={cc}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200"
                              >
                                <Globe size={9} />
                                {cc}
                              </span>
                            ))
                          )}
                          {p.countryCodes.length > 3 && (
                            <span className="text-[10px] text-slate-400 font-bold">
                              +{p.countryCodes.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-[13px] font-black text-slate-900">
                          {p.price}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill status={p.status} />
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-[11px] text-slate-500 font-semibold">
                          {p.createdAt}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Navigate to details page */}
                          <button
                            onClick={() =>
                              router.push(`/admin/products/${p.id}`)
                            }
                            className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-violet-50 hover:border-violet-200 text-slate-500 hover:text-violet-600 flex items-center justify-center transition-all"
                            title="View details"
                          >
                            <Eye size={13} />
                          </button>
<<<<<<< HEAD
                          {p.status.toLowerCase() === "pending" && (
                            <button
                              disabled={busy}
                              onClick={async () => {
                                await approve(p.id).unwrap();
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold transition-all disabled:opacity-60 disabled:pointer-events-none"
                            >
                              {isApproving ? (
                                <Loader2 size={11} className="animate-spin" />
                              ) : (
                                <Check size={11} />
                              )}
                              Approve
                            </button>
                          )}
=======
                          
                          <button
                            onClick={() => setPaymentTarget(p)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-indigo-50 text-indigo-600"
                            title="Payment Methods"
                          >
                            <CreditCard size={14} />
                          </button>

                          {p.status.toLowerCase() === "pending" ? (
                            <>
                              <button
                                disabled={busy}
                                onClick={async () => {
                                  await approve(p.id).unwrap();
                                }}
                                className="px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none"
                              >
                                Approve
                              </button>
                              <button
                                disabled={busy}
                                onClick={() => setRejectTarget(p)}
                                className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-[12px] font-bold disabled:opacity-60 disabled:pointer-events-none"
                              >
                                Reject
                              </button>
                            </>
                          ) : null}

>>>>>>> 4e23ea4 (update)
                          <button
                            disabled={busy}
                            onClick={() => setDeleteTarget(p)}
                            className="w-8 h-8 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all disabled:opacity-60 disabled:pointer-events-none"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <p className="text-[11px] text-slate-400 font-semibold">
              Showing{" "}
              <span className="text-slate-700 font-black">
                {products.length}
              </span>{" "}
              of <span className="text-slate-700 font-black">{meta.total}</span>{" "}
              products · Page{" "}
              <span className="text-slate-700 font-black">{page}</span> of{" "}
              <span className="text-slate-700 font-black">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
<<<<<<< HEAD
=======

>>>>>>> 4e23ea4 (update)
        </div>
      </div>
    </>
  );
}
