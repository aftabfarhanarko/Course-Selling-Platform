"use client";

import React, { useState } from "react";
import {
  useGetShopItemsQuery,
  useCreateShopItemMutation,
  useDeleteShopItemMutation,
} from "@/lib/api/shopApi";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
  ShoppingBag,
  Package,
  DollarSign,
  Mail,
  X,
  RefreshCw,
  TrendingUp,
  Eye,
  KeyRound,
  Upload,
} from "lucide-react";
import Image from "next/image";

export default function AdminShopPage() {
  const {
    data: shopData,
    isLoading,
    refetch,
  } = useGetShopItemsQuery({ page: 1, limit: 100 });
  const [createItem, { isLoading: isCreating }] = useCreateShopItemMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteShopItemMutation();

  const shopItems: any[] = shopData?.items || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    password: "",
    price: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.gmail || !formData.password) {
      return toast.error("Name, Gmail, and Password are required");
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("gmail", formData.gmail);
    payload.append("password", formData.password);
    if (formData.price) payload.append("price", formData.price);
    if (file) payload.append("logo", file);

    try {
      await createItem(payload).unwrap();
      toast.success("Shop item created successfully");
      setIsModalOpen(false);
      setFormData({ name: "", gmail: "", password: "", price: "" });
      setFile(null);
      setPreviewUrl(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create shop item");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id).unwrap();
      toast.success("Item deleted successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete item");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", gmail: "", password: "", price: "" });
    setFile(null);
    setPreviewUrl(null);
  };

  const totalRevenue = shopItems.reduce(
    (sum: number, item: any) => sum + Number(item.price || 0),
    0,
  );

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6">
      {/* ═══ HEADER CARD ═══ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 sm:mb-5 overflow-hidden">
        {/* Gradient top band */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Left: icon + title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-[17px] sm:text-[22px] font-extrabold text-white tracking-tight leading-none">
                  Shop Management
                </h1>
                <p className="text-[11px] sm:text-[12px] text-blue-200 mt-1 font-medium">
                  Create, manage and organize your shop products
                </p>
              </div>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <TrendingUp size={12} />
                {shopItems.length} Products
              </span>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl hover:bg-white/25 transition-colors"
              >
                <RefreshCw size={12} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-white text-blue-600 text-[12px] font-extrabold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Plus size={14} />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
          {[
            {
              label: "Total Products",
              value: shopItems.length,
              icon: Package,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Total Revenue",
              value: `$${totalRevenue.toFixed(2)}`,
              icon: DollarSign,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Avg. Price",
              value: shopItems.length
                ? `$${(totalRevenue / shopItems.length).toFixed(2)}`
                : "$0.00",
              icon: TrendingUp,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="px-4 sm:px-6 py-3 flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={15} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">
                  {label}
                </p>
                <p className="text-[15px] sm:text-[18px] font-extrabold text-gray-900 leading-none mt-0.5">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ TABLE ═══ */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Loader2 className="animate-spin text-blue-500" size={28} />
            <p className="text-[12px] font-semibold">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100">
                    {["Product", "Contact", "Price", "Actions"].map((h) => (
                      <th
                        key={h}
                        className={`px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ${h === "Actions" ? "text-right" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {shopItems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-3xl bg-gray-100 flex items-center justify-center">
                            <ShoppingBag size={24} className="text-gray-300" />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-gray-400">
                              No products yet
                            </p>
                            <p className="text-[11px] text-gray-300 mt-0.5">
                              Click "Add Product" to get started
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    shopItems.map((item: any) => (
                      <tr
                        key={item.id}
                        className="hover:bg-blue-50/20 transition-colors group"
                      >
                        {/* Product */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            {item.logo ? (
                              <Image
                                src={item.logo}
                                alt={item.name}
                                width={44}
                                height={44}
                                className="w-11 h-11 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <ImageIcon
                                  size={18}
                                  className="text-gray-400"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-[13px] font-bold text-gray-900 leading-none">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                ID: {item.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <Mail
                              size={12}
                              className="text-gray-400 flex-shrink-0"
                            />
                            <span className="text-[12px] text-gray-600 font-semibold">
                              {item.gmail}
                            </span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-3.5">
                          <span className="text-[13px] font-extrabold text-gray-900">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeleting}
                            className="w-8 h-8 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50 ml-auto"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {shopItems.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                <p className="text-[11px] text-gray-400 font-semibold">
                  Showing{" "}
                  <span className="text-gray-700 font-bold">
                    {shopItems.length}
                  </span>{" "}
                  product{shopItems.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ═══ CREATE MODAL ═══ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
            {/* Modal header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShoppingBag size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="text-[15px] font-black text-white">
                    Add New Product
                  </h2>
                  <p className="text-[11px] text-blue-200 mt-0.5">
                    POST /shop/items
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                disabled={isCreating}
                className="w-9 h-9 rounded-2xl flex items-center justify-center text-white/70 hover:bg-white/20 transition-all disabled:opacity-60"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-6 overflow-y-auto flex-1 space-y-4">
              {/* Logo upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Upload size={11} className="text-slate-400" />
                  Logo / Cover Image
                </label>
                <label className="relative cursor-pointer group">
                  <div
                    className={`w-full h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${previewUrl ? "border-blue-300 bg-blue-50/50" : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/30"}`}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-contain rounded-xl p-1"
                      />
                    ) : (
                      <>
                        <ImageIcon
                          size={24}
                          className="text-slate-300 group-hover:text-blue-400 transition-colors"
                        />
                        <p className="text-[11px] text-slate-400 font-semibold group-hover:text-blue-500 transition-colors">
                          Click to upload image
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
                {file && (
                  <p className="text-[10px] text-slate-400 truncate">
                    {file.name}
                  </p>
                )}
              </div>

              {/* Product Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Package size={11} className="text-slate-400" />
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Starter Template"
                  className="w-full px-3 py-2.5 text-[12px] font-semibold border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Gmail */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={11} className="text-slate-400" />
                  Gmail <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.gmail}
                  onChange={(e) =>
                    setFormData({ ...formData, gmail: e.target.value })
                  }
                  placeholder="contact@example.com"
                  className="w-full px-3 py-2.5 text-[12px] font-semibold border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound size={11} className="text-slate-400" />
                  Password <span className="text-red-400">*</span>
                  <span className="text-slate-400 normal-case font-normal">
                    (min 6 chars)
                  </span>
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Secret access key"
                  className="w-full px-3 py-2.5 text-[12px] font-semibold border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign size={11} className="text-slate-400" />
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="e.g. 99"
                  className="w-full px-3 py-2.5 text-[12px] font-semibold border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-5 border-t border-slate-100 bg-slate-50/80 flex gap-3 flex-shrink-0">
              <button
                onClick={closeModal}
                disabled={isCreating}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-[13px] font-bold text-slate-500 hover:bg-white hover:border-slate-300 transition-all disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isCreating}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all disabled:opacity-60"
              >
                {isCreating ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Plus size={14} />
                )}
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
