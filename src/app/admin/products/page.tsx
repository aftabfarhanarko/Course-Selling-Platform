"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Pencil,
  Trash2,
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Package,
  Upload,
  Hash,
  Tag,
  BarChart2,
} from "lucide-react";

type ProductStatus = "Active" | "Draft";
type ProductType = "COURSE" | "TOOL" | "RESOURCE";
type SortKey = "name" | "price" | "sales" | "status";
type SortDir = "asc" | "desc";

interface Product {
  id: number;
  name: string;
  sku: string;
  image: string;
  type: ProductType;
  price: string;
  priceRaw: number;
  sales: number;
  salesNote: string;
  salesUp?: boolean;
  status: ProductStatus;
  category: string;
  description: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wealth Blueprint Mastery",
    sku: "ARCH-001-C",
    image: "WB",
    type: "COURSE",
    price: "$499.00",
    priceRaw: 499,
    sales: 1248,
    salesNote: "+12%",
    salesUp: true,
    status: "Active",
    category: "Finance",
    description:
      "A comprehensive guide to building lasting wealth through strategic investments and financial planning.",
  },
  {
    id: 2,
    name: "Equity Analyzer Pro",
    sku: "ARCH-042-T",
    image: "EA",
    type: "TOOL",
    price: "$129.00",
    priceRaw: 129,
    sales: 856,
    salesNote: "Stable",
    salesUp: undefined,
    status: "Active",
    category: "Analytics",
    description:
      "Advanced equity analysis tool with real-time data integration and portfolio tracking.",
  },
  {
    id: 3,
    name: "Tax Strategy Guide",
    sku: "ARCH-099-R",
    image: "TS",
    type: "RESOURCE",
    price: "$49.00",
    priceRaw: 49,
    sales: 0,
    salesNote: "",
    salesUp: undefined,
    status: "Draft",
    category: "Compliance",
    description:
      "Step-by-step tax optimization strategies for freelancers and small business owners.",
  },
  {
    id: 4,
    name: "AI Trading Signals Course",
    sku: "ARCH-012-C",
    image: "AT",
    type: "COURSE",
    price: "$799.00",
    priceRaw: 799,
    sales: 2041,
    salesNote: "+31%",
    salesUp: true,
    status: "Active",
    category: "Trading",
    description:
      "Master AI-powered trading signal interpretation and automated strategy building.",
  },
  {
    id: 5,
    name: "Portfolio Rebalancer",
    sku: "ARCH-055-T",
    image: "PR",
    type: "TOOL",
    price: "$89.00",
    priceRaw: 89,
    sales: 430,
    salesNote: "-3%",
    salesUp: false,
    status: "Active",
    category: "Analytics",
    description:
      "Automated portfolio rebalancing tool with custom threshold alerts.",
  },
  {
    id: 6,
    name: "DeFi Starter Pack",
    sku: "ARCH-077-R",
    image: "DF",
    type: "RESOURCE",
    price: "$29.00",
    priceRaw: 29,
    sales: 120,
    salesNote: "+5%",
    salesUp: true,
    status: "Active",
    category: "Crypto",
    description:
      "Essential resources for getting started with decentralized finance protocols.",
  },
  {
    id: 7,
    name: "Options Mastery Bootcamp",
    sku: "ARCH-033-C",
    image: "OM",
    type: "COURSE",
    price: "$349.00",
    priceRaw: 349,
    sales: 678,
    salesNote: "+8%",
    salesUp: true,
    status: "Active",
    category: "Trading",
    description:
      "Complete options trading course from basics to advanced strategies.",
  },
  {
    id: 8,
    name: "Risk Assessment Toolkit",
    sku: "ARCH-088-T",
    image: "RA",
    type: "TOOL",
    price: "$199.00",
    priceRaw: 199,
    sales: 0,
    salesNote: "",
    salesUp: undefined,
    status: "Draft",
    category: "Risk",
    description:
      "Comprehensive risk scoring and assessment toolkit for investment portfolios.",
  },
];

const ITEMS_PER_PAGE = 5;

const typeStyle: Record<ProductType, string> = {
  COURSE: "bg-indigo-50 text-indigo-700 border-indigo-100",
  TOOL: "bg-sky-50 text-sky-700 border-sky-100",
  RESOURCE: "bg-amber-50 text-amber-700 border-amber-100",
};

const avatarBg: Record<string, string> = {
  WB: "#1e293b",
  EA: "#0f4c81",
  TS: "#78350f",
  AT: "#312e81",
  PR: "#065f46",
  DF: "#7c3aed",
  OM: "#9f1239",
  RA: "#164e63",
};

const categories = [
  "Finance",
  "Analytics",
  "Compliance",
  "Trading",
  "Crypto",
  "Risk",
  "Marketing",
  "Other",
];

function Toast({
  msg,
  type,
}: {
  msg: string;
  type: "success" | "error" | "info";
}) {
  const cfg = {
    success: "bg-emerald-600",
    error: "bg-red-500",
    info: "bg-gray-900",
  };
  return (
    <div
      className={`fixed top-5 right-5 z-[100] text-white text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 ${cfg[type]}`}
    >
      {type === "success" && <CheckCircle size={15} />}
      {type === "error" && <AlertCircle size={15} />}
      {msg}
    </div>
  );
}

interface ProductFormData {
  name: string;
  sku: string;
  type: ProductType;
  priceRaw: number;
  status: ProductStatus;
  category: string;
  description: string;
}

function ProductModal({
  mode,
  product,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  product?: Product;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
}) {
  const [form, setForm] = useState<ProductFormData>({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    type: product?.type ?? "COURSE",
    priceRaw: product?.priceRaw ?? 0,
    status: product?.status ?? "Draft",
    category: product?.category ?? "Finance",
    description: product?.description ?? "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Product name is required.";
    if (!form.sku.trim()) e.sku = "SKU is required.";
    if (form.priceRaw <= 0) e.priceRaw = "Price must be greater than 0.";
    if (!form.description.trim()) e.description = "Description is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSave(form);
  };

  const set = (key: keyof ProductFormData, val: any) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {mode === "add" ? "New Product" : "Edit Product"}
            </p>
            <h2 className="text-base font-bold text-gray-900 mt-0.5">
              {mode === "add"
                ? "Add to Inventory"
                : `Editing: ${product?.name}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Product Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Advanced Trading Masterclass"
              className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 ${errors.name ? "border-red-300" : "border-gray-200"}`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* SKU + Type row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                SKU *
              </label>
              <input
                value={form.sku}
                onChange={(e) => set("sku", e.target.value)}
                placeholder="ARCH-001-C"
                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 ${errors.sku ? "border-red-300" : "border-gray-200"}`}
              />
              {errors.sku && (
                <p className="text-xs text-red-500 mt-1">{errors.sku}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Type *
              </label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value as ProductType)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer text-gray-700"
              >
                <option value="COURSE">Course</option>
                <option value="TOOL">Tool</option>
                <option value="RESOURCE">Resource</option>
              </select>
            </div>
          </div>

          {/* Price + Category row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  value={form.priceRaw || ""}
                  onChange={(e) =>
                    set("priceRaw", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0.00"
                  className={`w-full pl-7 pr-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 ${errors.priceRaw ? "border-red-300" : "border-gray-200"}`}
                />
              </div>
              {errors.priceRaw && (
                <p className="text-xs text-red-500 mt-1">{errors.priceRaw}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer text-gray-700"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Status
            </label>
            <div className="flex gap-3">
              {(["Active", "Draft"] as ProductStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => set("status", s)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                    form.status === s
                      ? s === "Active"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-gray-100 border-gray-300 text-gray-700"
                      : "border-gray-200 text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {s === "Active" ? <Eye size={14} /> : <EyeOff size={14} />}
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description of the product..."
              rows={3}
              className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none ${errors.description ? "border-red-300" : "border-gray-200"}`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {mode === "add" ? (
              <>
                <Plus size={15} /> Add Product
              </>
            ) : (
              <>
                <CheckCircle size={15} /> Save Changes
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({
  product,
  onClose,
  onConfirm,
}: {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-gray-900 text-center mb-1">
          Delete Product
        </h3>
        <p className="text-sm text-gray-500 text-center mb-5 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">{product.name}</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Productspage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | ProductType>("All");
  const [filterStatus, setFilterStatus] = useState<"All" | ProductStatus>(
    "All",
  );
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const nextId = useRef(initialProducts.length + 1);

  const showToast = (
    msg: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setOpenMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSave = (data: ProductFormData) => {
    const initials = data.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    if (modalMode === "add") {
      const newProd: Product = {
        id: nextId.current++,
        name: data.name,
        sku: data.sku,
        image: initials,
        type: data.type,
        price: `$${data.priceRaw.toFixed(2)}`,
        priceRaw: data.priceRaw,
        sales: 0,
        salesNote: "",
        salesUp: undefined,
        status: data.status,
        category: data.category,
        description: data.description,
      };
      setProducts((p) => [newProd, ...p]);
      showToast("Product added successfully.", "success");
    } else if (modalMode === "edit" && editingProduct) {
      setProducts((p) =>
        p.map((prod) =>
          prod.id === editingProduct.id
            ? {
                ...prod,
                name: data.name,
                sku: data.sku,
                type: data.type,
                price: `$${data.priceRaw.toFixed(2)}`,
                priceRaw: data.priceRaw,
                status: data.status,
                category: data.category,
                description: data.description,
              }
            : prod,
        ),
      );
      showToast("Product updated successfully.", "success");
    }
    setModalMode(null);
    setEditingProduct(null);
  };

  const handleDelete = (product: Product) => {
    setProducts((p) => p.filter((x) => x.id !== product.id));
    setDeleteTarget(null);
    setOpenMenu(null);
    showToast("Product deleted.", "error");
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchType = filterType === "All" || p.type === filterType;
      const matchStatus = filterStatus === "All" || p.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
    list = [...list].sort((a, b) => {
      let va: any, vb: any;
      if (sortKey === "name") {
        va = a.name;
        vb = b.name;
      } else if (sortKey === "price") {
        va = a.priceRaw;
        vb = b.priceRaw;
      } else if (sortKey === "sales") {
        va = a.sales;
        vb = b.sales;
      } else {
        va = a.status;
        vb = b.status;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [products, search, filterType, filterStatus, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalRevenue = products
    .filter((p) => p.status === "Active")
    .reduce((s, p) => s + p.priceRaw * p.sales, 0);
  const totalSales = products.reduce((s, p) => s + p.sales, 0);
  const activeCount = products.filter((p) => p.status === "Active").length;
  const draftCount = products.filter((p) => p.status === "Draft").length;

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      onClick={() => toggleSort(k)}
      className="flex items-center gap-1 hover:text-gray-700 transition-colors group"
    >
      {label}
      <ArrowUpDown
        size={11}
        className={`transition-colors ${sortKey === k ? "text-blue-500" : "text-gray-300 group-hover:text-gray-400"}`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {toast && <Toast {...toast} />}

      {/* Modals */}
      {modalMode && (
        <ProductModal
          mode={modalMode}
          product={editingProduct ?? undefined}
          onClose={() => {
            setModalMode(null);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget)}
        />
      )}

      <div className=" mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              Inventory Management
            </p>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Product Inventory
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Manage your high-performance assets and learning materials.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setModalMode("add");
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm self-start shadow-sm"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            {
              label: "Total Products",
              value: products.length,
              sub: `${draftCount} drafts`,
              icon: <Package size={16} />,
              color: "text-gray-900",
              iconBg: "bg-gray-100 text-gray-600",
            },
            {
              label: "Active",
              value: activeCount,
              sub: "published",
              icon: <Eye size={16} />,
              color: "text-emerald-700",
              iconBg: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Total Sales",
              value: totalSales.toLocaleString(),
              sub: "units sold",
              icon: <BarChart2 size={16} />,
              color: "text-blue-700",
              iconBg: "bg-blue-50 text-blue-600",
            },
            {
              label: "Revenue",
              value: `$${(totalRevenue / 1000).toFixed(0)}k`,
              sub: "from active",
              icon: <DollarSign size={16} />,
              color: "text-indigo-700",
              iconBg: "bg-indigo-50 text-indigo-600",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm flex items-center gap-3"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconBg}`}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products, SKUs, categories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value as any);
                setCurrentPage(1);
              }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="COURSE">Course</option>
              <option value="TOOL">Tool</option>
              <option value="RESOURCE">Resource</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as any);
                setCurrentPage(1);
              }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
            <button
              onClick={() => {
                setSearch("");
                setFilterType("All");
                setFilterStatus("All");
                setSortKey("name");
                setSortDir("asc");
                setCurrentPage(1);
              }}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5">
                    <SortBtn k="name" label="Product" />
                  </th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5">
                    Type
                  </th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5">
                    <SortBtn k="price" label="Price" />
                  </th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5">
                    <SortBtn k="sales" label="Sales" />
                  </th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5">
                    <SortBtn k="status" label="Status" />
                  </th>
                  <th className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3.5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-14 text-gray-400 text-sm"
                    >
                      <Package
                        size={28}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      No products match your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50/60 transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{
                              background: avatarBg[p.image] ?? "#475569",
                            }}
                          >
                            {p.image}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">
                              {p.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              SKU: {p.sku} • {p.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border ${typeStyle[p.type]}`}
                        >
                          {p.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-gray-900">
                        {p.price}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-gray-900 text-sm">
                          {p.sales.toLocaleString()}
                        </p>
                        {p.salesNote && (
                          <p
                            className={`text-xs flex items-center gap-0.5 mt-0.5 ${p.salesUp === true ? "text-emerald-600" : p.salesUp === false ? "text-red-500" : "text-gray-400"}`}
                          >
                            {p.salesUp === true && <TrendingUp size={10} />}
                            {p.salesNote}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${p.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-gray-100 text-gray-500 border-gray-200"}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${p.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`}
                          />
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 relative">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setModalMode("edit");
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-600"
                            title="Edit"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(p)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenu(openMenu === p.id ? null : p.id);
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
                            >
                              <MoreVertical size={13} />
                            </button>
                            {openMenu === p.id && (
                              <div
                                className="absolute right-0 top-9 w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  onClick={() => {
                                    setEditingProduct(p);
                                    setModalMode("edit");
                                    setOpenMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Pencil size={12} /> Edit Product
                                </button>
                                <button
                                  onClick={() => {
                                    const clone: Product = {
                                      ...p,
                                      id: nextId.current++,
                                      name: `${p.name} (Copy)`,
                                      sku: `${p.sku}-COPY`,
                                      sales: 0,
                                      salesNote: "",
                                      status: "Draft",
                                    };
                                    setProducts((prev) => [clone, ...prev]);
                                    setOpenMenu(null);
                                    showToast("Product duplicated.", "info");
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Plus size={12} /> Duplicate
                                </button>
                                <button
                                  onClick={() => {
                                    setProducts((prev) =>
                                      prev.map((x) =>
                                        x.id === p.id
                                          ? {
                                              ...x,
                                              status:
                                                x.status === "Active"
                                                  ? "Draft"
                                                  : "Active",
                                            }
                                          : x,
                                      ),
                                    );
                                    setOpenMenu(null);
                                    showToast(`Status updated.`, "success");
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Eye size={12} /> Toggle Status
                                </button>
                                <div className="border-t border-gray-100" />
                                <button
                                  onClick={() => {
                                    setDeleteTarget(p);
                                    setOpenMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 size={12} /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {paginated.length === 0 ? (
              <p className="text-center py-10 text-gray-400 text-sm">
                No results found.
              </p>
            ) : (
              paginated.map((p) => (
                <div key={p.id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: avatarBg[p.image] ?? "#475569" }}
                    >
                      {p.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        SKU: {p.sku} • {p.category}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${p.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`}
                      />
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${typeStyle[p.type]}`}
                    >
                      {p.type}
                    </span>
                    <span className="font-bold text-gray-900 text-sm">
                      {p.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {p.sales.toLocaleString()} sales
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setModalMode("edit");
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 py-2 rounded-xl text-xs text-gray-600 hover:bg-gray-50"
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-red-100 py-2 rounded-xl text-xs text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filtered.length === 0
                  ? 0
                  : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                –{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filtered.length}
              </span>{" "}
              products
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${currentPage === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center">
                <DollarSign size={18} className="text-emerald-600" />
              </div>
              <span className="text-base font-bold text-gray-700">
                Total Revenue
              </span>
            </div>
            <p className="text-3xl font-black text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs font-semibold text-emerald-600 mt-1.5">
              +18.2% from last month
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                <Users size={18} className="text-indigo-500" />
              </div>
              <span className="text-base font-bold text-gray-700">
                Active Students
              </span>
            </div>
            <p className="text-3xl font-black text-gray-900">8,492</p>
            <p className="text-xs font-semibold text-blue-600 mt-1.5">
              +4.5% retention increase
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                <ShoppingBag size={18} className="text-indigo-500" />
              </div>
              <span className="text-base font-bold text-gray-700">
                Published Products
              </span>
            </div>
            <p className="text-3xl font-black text-gray-900">{activeCount}</p>
            <p className="text-xs text-gray-400 mt-1.5">
              {draftCount} drafts pending review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
