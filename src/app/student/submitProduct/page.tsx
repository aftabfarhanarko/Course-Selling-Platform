"use client";

import {
  Upload,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
  TrendingUp,
  ShoppingBag,
  Star,
  ChevronDown,
  ImagePlus,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { useState, useRef, useId } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "approved" | "pending" | "rejected";
type Category =
  | "Software"
  | "eBook"
  | "Course"
  | "Template"
  | "Plugin"
  | "Other";

interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  commission: number;
  status: Status;
  sales: number;
  rating: number;
  submittedAt: string;
  thumbnail?: string;
  description: string;
  affiliateLink: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "PRD-001",
    name: "FunnelPro Suite",
    category: "Software",
    price: 297,
    commission: 50,
    status: "approved",
    sales: 142,
    rating: 4.8,
    submittedAt: "2025-04-10",
    description:
      "All-in-one funnel builder with drag-and-drop editor and analytics dashboard.",
    affiliateLink: "https://funnelpro.io/ref/abc123",
  },
  {
    id: "PRD-002",
    name: "Crypto Mastery Blueprint",
    category: "eBook",
    price: 47,
    commission: 70,
    status: "pending",
    sales: 0,
    rating: 0,
    submittedAt: "2025-05-01",
    description:
      "Step-by-step guide to crypto trading for beginners and intermediates.",
    affiliateLink: "https://cryptomastery.io/ref/abc123",
  },
  {
    id: "PRD-003",
    name: "Email Empire Course",
    category: "Course",
    price: 197,
    commission: 60,
    status: "approved",
    sales: 89,
    rating: 4.6,
    submittedAt: "2025-03-22",
    description: "Build and monetize a 6-figure email list from scratch.",
    affiliateLink: "https://emailempire.io/ref/abc123",
  },
  {
    id: "PRD-004",
    name: "Landing Page Pack",
    category: "Template",
    price: 79,
    commission: 40,
    status: "rejected",
    sales: 0,
    rating: 0,
    submittedAt: "2025-04-28",
    description: "20 high-converting landing page templates for Webflow.",
    affiliateLink: "https://landingpack.io/ref/abc123",
  },
  {
    id: "PRD-005",
    name: "SEO Rocket Plugin",
    category: "Plugin",
    price: 149,
    commission: 45,
    status: "approved",
    sales: 214,
    rating: 4.9,
    submittedAt: "2025-02-14",
    description: "WordPress plugin for automated on-page SEO optimization.",
    affiliateLink: "https://seorocket.io/ref/abc123",
  },
];

const CATEGORIES: Category[] = [
  "Software",
  "eBook",
  "Course",
  "Template",
  "Plugin",
  "Other",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genId() {
  return `PRD-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

function today() {
  return new Date().toISOString().split("T")[0];
}

const STATUS_META: Record<
  Status,
  { label: string; icon: React.ReactNode; pill: string }
> = {
  approved: {
    label: "Approved",
    icon: <CheckCircle2 size={13} />,
    pill: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  },
  pending: {
    label: "Pending",
    icon: <Clock size={13} />,
    pill: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  },
  rejected: {
    label: "Rejected",
    icon: <XCircle size={13} />,
    pill: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800",
  },
};

function StatusPill({ status }: { status: Status }) {
  const m = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${m.pill}`}
    >
      {m.icon}
      {m.label}
    </span>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  if (!rating)
    return <span className="text-xs text-zinc-400 dark:text-zinc-600">—</span>;
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
      <Star size={12} className="fill-amber-400 text-amber-400" />
      {rating.toFixed(1)}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  iconBg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  iconBg: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {label}
        </p>
        <p className="text-xl font-extrabold text-zinc-900 dark:text-white">
          {value}
        </p>
        {sub && (
          <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-500">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Modal Wrapper ────────────────────────────────────────────────────────────

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{hint}</p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-blue-400";

// ─── Create / Edit Modal ──────────────────────────────────────────────────────

interface ProductForm {
  name: string;
  category: Category;
  price: string;
  commission: string;
  description: string;
  affiliateLink: string;
}

const EMPTY_FORM: ProductForm = {
  name: "",
  category: "Software",
  price: "",
  commission: "",
  description: "",
  affiliateLink: "",
};

function productToForm(p: Product): ProductForm {
  return {
    name: p.name,
    category: p.category,
    price: String(p.price),
    commission: String(p.commission),
    description: p.description,
    affiliateLink: p.affiliateLink,
  };
}

function ProductFormModal({
  mode,
  initial,
  onClose,
  onSave,
}: {
  mode: "create" | "edit";
  initial: ProductForm;
  onClose: () => void;
  onSave: (f: ProductForm) => void;
}) {
  const [form, setForm] = useState<ProductForm>(initial);
  const [errors, setErrors] = useState<Partial<ProductForm>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function set(key: keyof ProductForm, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const errs: Partial<ProductForm> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = "Enter valid price";
    if (
      !form.commission ||
      isNaN(Number(form.commission)) ||
      Number(form.commission) < 1 ||
      Number(form.commission) > 100
    )
      errs.commission = "1–100%";
    if (!form.description.trim()) errs.description = "Required";
    if (!form.affiliateLink.trim()) errs.affiliateLink = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (validate()) onSave(form);
  }

  return (
    <Modal onClose={onClose}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            {mode === "create" ? "Submit New Product" : "Edit Product"}
          </h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            {mode === "create"
              ? "Fill in details to submit for review"
              : "Update product information"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
        >
          <X size={18} />
        </button>
      </div>

      {/* body */}
      <div className="flex flex-col gap-4 p-6">
        {/* thumbnail upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 py-6 transition hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500 dark:hover:bg-blue-900/10"
        >
          <ImagePlus size={24} className="text-zinc-400" />
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {fileName ? fileName : "Click to upload product thumbnail"}
          </p>
          <p className="text-[11px] text-zinc-400">PNG, JPG up to 5MB</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </div>

        {/* product name */}
        <Field label="Product Name" required>
          <input
            className={inputCls}
            placeholder="e.g. FunnelPro Suite"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-[11px] text-rose-500">{errors.name}</p>
          )}
        </Field>

        {/* category */}
        <Field label="Category" required>
          <div className="relative">
            <select
              className={`${inputCls} appearance-none pr-8`}
              value={form.category}
              onChange={(e) => set("category", e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
          </div>
        </Field>

        {/* price + commission */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Price (USD)" required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                $
              </span>
              <input
                className={`${inputCls} pl-7`}
                type="number"
                min="0"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </div>
            {errors.price && (
              <p className="text-[11px] text-rose-500">{errors.price}</p>
            )}
          </Field>
          <Field label="Commission %" required hint="Affiliate payout rate">
            <div className="relative">
              <input
                className={`${inputCls} pr-7`}
                type="number"
                min="1"
                max="100"
                placeholder="50"
                value={form.commission}
                onChange={(e) => set("commission", e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                %
              </span>
            </div>
            {errors.commission && (
              <p className="text-[11px] text-rose-500">{errors.commission}</p>
            )}
          </Field>
        </div>

        {/* description */}
        <Field label="Description" required>
          <textarea
            className={`${inputCls} resize-none`}
            rows={3}
            placeholder="Describe your product in 1–3 sentences..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
          {errors.description && (
            <p className="text-[11px] text-rose-500">{errors.description}</p>
          )}
        </Field>

        {/* affiliate link */}
        <Field label="Affiliate Link" required hint="Your unique tracking URL">
          <input
            className={inputCls}
            placeholder="https://yourproduct.com/ref/yourcode"
            value={form.affiliateLink}
            onChange={(e) => set("affiliateLink", e.target.value)}
          />
          {errors.affiliateLink && (
            <p className="text-[11px] text-rose-500">{errors.affiliateLink}</p>
          )}
        </Field>
      </div>

      {/* footer */}
      <div className="flex justify-end gap-2 border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          {mode === "create" ? (
            <>
              <Upload size={15} /> Submit Product
            </>
          ) : (
            <>
              <CheckCircle2 size={15} /> Save Changes
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  product,
  onClose,
  onConfirm,
}: {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <div className="p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20">
          <AlertTriangle size={26} className="text-rose-500" />
        </div>
        <h2 className="mb-1 text-lg font-bold text-zinc-900 dark:text-white">
          Delete Product?
        </h2>
        <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">
          You're about to permanently delete
        </p>
        <p className="mb-5 text-sm font-semibold text-zinc-900 dark:text-white">
          "{product.name}"
        </p>
        <p className="mb-6 text-xs text-zinc-400 dark:text-zinc-500">
          This action cannot be undone. All associated data and affiliate links
          will be removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-200 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 py-2.5 text-sm font-bold text-white hover:bg-rose-700 active:scale-[0.98] transition-all"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewModal({
  product,
  onClose,
  onEdit,
}: {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white">
          Product Details
        </h2>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
        >
          <X size={18} />
        </button>
      </div>
      <div className="p-6 space-y-5">
        {/* header row */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
            <Package size={22} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {product.category}
              </span>
              <StatusPill status={product.status} />
              <StarDisplay rating={product.rating} />
            </div>
          </div>
        </div>

        {/* stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Price", value: `$${product.price}` },
            { label: "Commission", value: `${product.commission}%` },
            { label: "Total Sales", value: product.sales || "—" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                {label}
              </p>
              <p className="mt-1 text-lg font-extrabold text-zinc-900 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* description */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Description
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
        </div>

        {/* link */}
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Affiliate Link
          </p>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-sm text-blue-600 underline underline-offset-2 dark:text-blue-400"
          >
            {product.affiliateLink}
          </a>
        </div>

        {/* submitted */}
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
          Submitted: {product.submittedAt} · ID: {product.id}
        </p>
      </div>
      <div className="flex justify-end gap-2 border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Close
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          <Pencil size={14} />
          Edit Product
        </button>
      </div>
    </Modal>
  );
}

// ─── Row Action Menu ──────────────────────────────────────────────────────────

function ActionMenu({
  onView,
  onEdit,
  onDelete,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            {[
              {
                icon: <Eye size={14} />,
                label: "View",
                action: onView,
                cls: "text-zinc-700 dark:text-zinc-300",
              },
              {
                icon: <Pencil size={14} />,
                label: "Edit",
                action: onEdit,
                cls: "text-zinc-700 dark:text-zinc-300",
              },
              {
                icon: <Trash2 size={14} />,
                label: "Delete",
                action: onDelete,
                cls: "text-rose-600 dark:text-rose-400",
              },
            ].map(({ icon, label, action, cls }) => (
              <button
                key={label}
                onClick={() => {
                  setOpen(false);
                  action();
                }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 ${cls}`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; product: Product }
  | { type: "delete"; product: Product }
  | { type: "view"; product: Product };

export default function SubmitProductPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  // ── derived stats ──
  const approved = products.filter((p) => p.status === "approved").length;
  const pending = products.filter((p) => p.status === "pending").length;
  const totalSales = products.reduce((a, p) => a + p.sales, 0);
  const totalRevenue = products.reduce(
    (a, p) => a + p.price * (p.commission / 100) * p.sales,
    0,
  );

  // ── filtered ──
  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ── handlers ──
  function handleCreate(form: ProductForm) {
    const p: Product = {
      id: genId(),
      name: form.name,
      category: form.category as Category,
      price: Number(form.price),
      commission: Number(form.commission),
      description: form.description,
      affiliateLink: form.affiliateLink,
      status: "pending",
      sales: 0,
      rating: 0,
      submittedAt: today(),
    };
    setProducts((prev) => [p, ...prev]);
    setModal({ type: "none" });
  }

  function handleEdit(form: ProductForm) {
    if (modal.type !== "edit") return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === modal.product.id
          ? {
              ...p,
              name: form.name,
              category: form.category as Category,
              price: Number(form.price),
              commission: Number(form.commission),
              description: form.description,
              affiliateLink: form.affiliateLink,
            }
          : p,
      ),
    );
    setModal({ type: "none" });
  }

  function handleDelete() {
    if (modal.type !== "delete") return;
    setProducts((prev) => prev.filter((p) => p.id !== modal.product.id));
    setModal({ type: "none" });
  }

  const STATUS_TABS: { label: string; value: Status | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div className="w-full space-y-7">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Affiliate Dashboard
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Submit Product
          </h1>
        </div>
        <button
          onClick={() => setModal({ type: "create" })}
          className="flex items-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all sm:self-auto"
        >
          <Plus size={16} />
          New Product
        </button>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={
            <Package size={20} className="text-blue-600 dark:text-blue-400" />
          }
          label="Total Products"
          value={products.length}
          sub={`${approved} approved`}
          iconBg="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          icon={
            <CheckCircle2
              size={20}
              className="text-emerald-600 dark:text-emerald-400"
            />
          }
          label="Approved"
          value={approved}
          sub="Live & earning"
          iconBg="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <StatCard
          icon={
            <ShoppingBag
              size={20}
              className="text-violet-600 dark:text-violet-400"
            />
          }
          label="Total Sales"
          value={totalSales.toLocaleString()}
          sub={`${pending} awaiting review`}
          iconBg="bg-violet-50 dark:bg-violet-900/20"
        />
        <StatCard
          icon={
            <TrendingUp
              size={20}
              className="text-amber-600 dark:text-amber-400"
            />
          }
          label="Est. Earnings"
          value={`$${Math.round(totalRevenue).toLocaleString()}`}
          sub="Commission revenue"
          iconBg="bg-amber-50 dark:bg-amber-900/20"
        />
      </div>

      {/* ── Table Section ── */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* toolbar */}
        <div className="flex flex-col gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          {/* search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* status filter tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            {STATUS_TABS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  statusFilter === value
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                {[
                  "Product",
                  "Category",
                  "Price",
                  "Commission",
                  "Sales",
                  "Rating",
                  "Status",
                  "Submitted",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-16 text-center text-sm text-zinc-400 dark:text-zinc-600"
                  >
                    <Package
                      size={28}
                      className="mx-auto mb-3 text-zinc-300 dark:text-zinc-700"
                    />
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    {/* name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <Package
                            size={15}
                            className="text-blue-500 dark:text-blue-400"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* category */}
                    <td className="px-4 py-3.5">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {product.category}
                      </span>
                    </td>
                    {/* price */}
                    <td className="px-4 py-3.5 font-semibold text-zinc-900 dark:text-white">
                      ${product.price}
                    </td>
                    {/* commission */}
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {product.commission}%
                      </span>
                    </td>
                    {/* sales */}
                    <td className="px-4 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">
                      {product.sales || "—"}
                    </td>
                    {/* rating */}
                    <td className="px-4 py-3.5">
                      <StarDisplay rating={product.rating} />
                    </td>
                    {/* status */}
                    <td className="px-4 py-3.5">
                      <StatusPill status={product.status} />
                    </td>
                    {/* submitted */}
                    <td className="px-4 py-3.5 text-xs text-zinc-400 dark:text-zinc-500">
                      {product.submittedAt}
                    </td>
                    {/* actions */}
                    <td className="px-4 py-3.5">
                      <ActionMenu
                        onView={() => setModal({ type: "view", product })}
                        onEdit={() => setModal({ type: "edit", product })}
                        onDelete={() => setModal({ type: "delete", product })}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Showing {filtered.length} of {products.length} products
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Last updated: {today()}
          </p>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal.type === "create" && (
        <ProductFormModal
          mode="create"
          initial={EMPTY_FORM}
          onClose={() => setModal({ type: "none" })}
          onSave={handleCreate}
        />
      )}

      {modal.type === "edit" && (
        <ProductFormModal
          mode="edit"
          initial={productToForm(modal.product)}
          onClose={() => setModal({ type: "none" })}
          onSave={handleEdit}
        />
      )}

      {modal.type === "delete" && (
        <DeleteModal
          product={modal.product}
          onClose={() => setModal({ type: "none" })}
          onConfirm={handleDelete}
        />
      )}

      {modal.type === "view" && (
        <ViewModal
          product={modal.product}
          onClose={() => setModal({ type: "none" })}
          onEdit={() => setModal({ type: "edit", product: modal.product })}
        />
      )}
    </div>
  );
}
