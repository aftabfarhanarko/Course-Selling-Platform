"use client";

import React, { useState } from "react";
import {
    Search, SlidersHorizontal, ArrowUpDown, Pencil, Trash2,
    MoreVertical, Plus, ChevronLeft, ChevronRight,
    DollarSign, Users, ShoppingBag, TrendingUp,
} from "lucide-react";

type ProductStatus = "Active" | "Draft";
type ProductType = "COURSE" | "TOOL" | "RESOURCE";

interface Product {
    id: number; name: string; sku: string; image: string;
    type: ProductType; price: string; sales: number;
    salesNote: string; salesUp?: boolean; status: ProductStatus;
}

const initialProducts: Product[] = [
    { id: 1, name: "Wealth Blueprint Mastery", sku: "SKU: ARCH-001-C", image: "WB", type: "COURSE", price: "$499.00", sales: 1248, salesNote: "+12%", salesUp: true, status: "Active" },
    { id: 2, name: "Equity Analyzer Pro", sku: "SKU: ARCH-042-T", image: "EA", type: "TOOL", price: "$129.00", sales: 856, salesNote: "Stable", salesUp: undefined, status: "Active" },
    { id: 3, name: "Tax Strategy Guide", sku: "SKU: ARCH-099-R", image: "TS", type: "RESOURCE", price: "$49.00", sales: 0, salesNote: "", salesUp: undefined, status: "Draft" },
];

const typeStyle: Record<ProductType, string> = {
    COURSE: "bg-indigo-50 text-indigo-700",
    TOOL: "bg-sky-50 text-sky-700",
    RESOURCE: "bg-amber-50 text-amber-700",
};

export default function Productspage() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [toast, setToast] = useState("");
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
    const handleDelete = (id: number) => { setProducts(prev => prev.filter(p => p.id !== id)); setOpenMenu(null); showToast("Product deleted."); };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())
    );

    const avatarColors: Record<string, string> = { WB: "#1e293b", EA: "#334155", TS: "#475569" };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans relative">
            {toast && <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl">{toast}</div>}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Product Inventory</h1>
                    <p className="text-sm text-gray-500 mt-1.5">Manage your high-performance assets and learning materials.</p>
                </div>
                <button onClick={() => showToast("Add Product coming soon!")} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm self-start">
                    <Plus size={16} /> Add Product
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search products, SKUs, or types..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"><SlidersHorizontal size={14} /> Filter</button>
                    <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"><ArrowUpDown size={14} /> Sort</button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                {["Product Details", "Type", "Price", "Sales", "Status", "Actions"].map(h => (
                                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-5 py-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                                style={{ background: avatarColors[p.image] ?? "#475569" }}>{p.image}</div>
                                            <div>
                                                <p className="font-bold text-gray-900">{p.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{p.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide ${typeStyle[p.type]}`}>{p.type}</span>
                                    </td>
                                    <td className="px-5 py-4 font-bold text-gray-900">{p.price}</td>
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-gray-900">{p.sales.toLocaleString()}</p>
                                        {p.salesNote && (
                                            <p className={`text-xs flex items-center gap-0.5 mt-0.5 ${p.salesUp ? "text-green-600" : "text-gray-400"}`}>
                                                {p.salesUp && <TrendingUp size={10} />}{p.salesNote}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${p.status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Active" ? "bg-green-500" : "bg-gray-400"}`} />{p.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1 relative">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400"><Pencil size={14} /></button>
                                            <button onClick={() => handleDelete(p.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400"><MoreVertical size={14} /></button>
                                                {openMenu === p.id && (
                                                    <div className="absolute right-0 top-9 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                                                        <button onClick={() => { setOpenMenu(null); showToast("Opening editor..."); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Edit Product</button>
                                                        <button onClick={() => { setOpenMenu(null); showToast("Duplicated!"); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Duplicate</button>
                                                        <button onClick={() => handleDelete(p.id)} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile */}
                <div className="sm:hidden divide-y divide-gray-100">
                    {filtered.map(p => (
                        <div key={p.id} className="p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                    style={{ background: avatarColors[p.image] ?? "#475569" }}>{p.image}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                                    <p className="text-xs text-gray-400">{p.sku}</p>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Active" ? "bg-green-500" : "bg-gray-400"}`} />{p.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${typeStyle[p.type]}`}>{p.type}</span>
                                <span className="font-bold text-gray-900 text-sm">{p.price}</span>
                                <span className="text-sm text-gray-600">{p.sales.toLocaleString()} sales</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-200 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-50"><Pencil size={12} /> Edit</button>
                                <button onClick={() => handleDelete(p.id)} className="flex-1 flex items-center justify-center gap-1 border border-red-100 py-2 rounded-lg text-xs text-red-500 hover:bg-red-50"><Trash2 size={12} /> Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of <span className="font-semibold text-gray-700">42</span> products</p>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"><ChevronLeft size={14} /></button>
                        {[1, 2, 3].map(p => (
                            <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${currentPage === p ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(3, p + 1))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"><ChevronRight size={14} /></button>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center"><DollarSign size={18} className="text-green-600" /></div>
                        <span className="text-base font-bold text-gray-700">Total Revenue</span>
                    </div>
                    <p className="text-3xl font-black text-gray-900">$142,500.00</p>
                    <p className="text-xs font-semibold text-green-600 mt-1.5">+18.2% from last month</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center"><Users size={18} className="text-indigo-500" /></div>
                        <span className="text-base font-bold text-gray-700">Active Students</span>
                    </div>
                    <p className="text-3xl font-black text-gray-900">8,492</p>
                    <p className="text-xs font-semibold text-blue-600 mt-1.5">+4.5% retention increase</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center"><ShoppingBag size={18} className="text-indigo-500" /></div>
                        <span className="text-base font-bold text-gray-700">Published Products</span>
                    </div>
                    <p className="text-3xl font-black text-gray-900">38</p>
                    <p className="text-xs text-gray-400 mt-1.5">4 drafts pending review</p>
                </div>
            </div>
        </div>
    );
}
