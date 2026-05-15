"use client";

import {
  ShoppingCart,
  Search,
  Star,
  Heart,
  X,
  Plus,
  Minus,
  Trash2,
  SlidersHorizontal,
  ChevronDown,
  Zap,
  Shield,
  BadgeCheck,
  ArrowRight,
  Tag,
} from "lucide-react";
import { useState, useMemo } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  gradient: string;
  icon: string;
  features: string[];
}

interface CartItem extends Product {
  qty: number;
}

// ─── Data ──────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Starter Pack",
    desc: "Perfect for individuals just getting started with essential tools.",
    price: 29,
    originalPrice: 49,
    category: "Courses",
    rating: 4.8,
    reviews: 312,
    badge: "Best Seller",
    badgeColor: "bg-amber-400 text-amber-900",
    gradient: "from-blue-400 via-blue-500 to-indigo-600",
    icon: "🚀",
    features: ["5 Core Modules", "Lifetime Access", "Certificate"],
  },
  {
    id: 2,
    name: "Pro Masterclass",
    desc: "Deep-dive into advanced strategies used by industry professionals.",
    price: 79,
    originalPrice: 129,
    category: "Courses",
    rating: 4.9,
    reviews: 875,
    badge: "Top Rated",
    badgeColor: "bg-emerald-400 text-emerald-900",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    icon: "🎓",
    features: ["12 Modules", "Live Sessions", "1-on-1 Mentoring"],
  },
  {
    id: 3,
    name: "Design Toolkit",
    desc: "Everything you need to build stunning visual products from scratch.",
    price: 49,
    category: "Tools",
    rating: 4.7,
    reviews: 540,
    gradient: "from-pink-400 via-rose-500 to-red-500",
    icon: "🎨",
    features: ["50+ Templates", "Asset Library", "Figma Plugin"],
  },
  {
    id: 4,
    name: "Growth Bundle",
    desc: "Marketing & growth playbook to scale your online business.",
    price: 99,
    originalPrice: 179,
    category: "Bundles",
    rating: 4.6,
    reviews: 228,
    badge: "Hot Deal",
    badgeColor: "bg-red-400 text-red-900",
    gradient: "from-orange-400 via-amber-500 to-yellow-500",
    icon: "📈",
    features: ["3 Full Courses", "Growth Checklist", "Private Community"],
  },
  {
    id: 5,
    name: "Code Bootcamp",
    desc: "Hands-on full-stack development training for modern web apps.",
    price: 149,
    originalPrice: 249,
    category: "Courses",
    rating: 4.9,
    reviews: 1240,
    badge: "New",
    badgeColor: "bg-violet-400 text-violet-900",
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    icon: "💻",
    features: ["20 Projects", "Job Guarantee", "Community Access"],
  },
  {
    id: 6,
    name: "All Access Pass",
    desc: "Unlimited access to every course, tool, and future release — forever.",
    price: 299,
    originalPrice: 599,
    category: "Bundles",
    rating: 5.0,
    reviews: 98,
    badge: "Premium",
    badgeColor: "bg-zinc-800 text-white",
    gradient: "from-zinc-700 via-zinc-800 to-zinc-900",
    icon: "♾️",
    features: ["All Products", "Priority Support", "Early Access"],
  },
];

const CATEGORIES = ["All", "Courses", "Tools", "Bundles"];
const SORTS = ["Popular", "Price: Low–High", "Price: High–Low", "Top Rated"];

// ─── Stars ─────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700"
          }
        />
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Popular");
  const [added, setAdded] = useState<number | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function addToCart(product: Product) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const nq = i.qty + delta;
        return nq <= 0 ? [] : [{ ...i, qty: nq }];
      }),
    );
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function toggleWishlist(id: number) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === "Price: Low–High")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High–Low")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated")
      list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
            Shop
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Browse and purchase our products & services.
          </p>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
        >
          <ShoppingCart size={15} />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Trust Bar ── */}
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          { icon: Zap, text: "Instant Access" },
          { icon: Shield, text: "30-day Guarantee" },
          { icon: BadgeCheck, text: "Verified Content" },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400"
          >
            <Icon size={12} className="text-blue-500" />
            {text}
          </div>
        ))}
      </div>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-zinc-900 dark:text-white placeholder-zinc-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                category === c
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="pl-8 pr-7 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none text-zinc-700 dark:text-zinc-300 appearance-none cursor-pointer"
          >
            {SORTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown
            size={11}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
        </div>
      </div>

      {/* ── Product Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No products match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => {
            const inCart = cart.find((i) => i.id === product.id);
            const isWished = wishlist.includes(product.id);
            const justAdded = added === product.id;
            const discount = product.originalPrice
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/60 dark:hover:shadow-zinc-950/60 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Area */}
                <div
                  className={`relative w-full h-36 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
                >
                  <span className="text-5xl select-none">{product.icon}</span>

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Discount */}
                  {discount && (
                    <span className="absolute top-2.5 right-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-zinc-800">
                      -{discount}%
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={13}
                      className={
                        isWished ? "fill-red-500 text-red-500" : "text-zinc-500"
                      }
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                        {product.name}
                      </h3>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">
                        ${product.price}
                      </p>
                      {product.originalPrice && (
                        <p className="text-[10px] text-zinc-400 line-through">
                          ${product.originalPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed line-clamp-2">
                    {product.desc}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Stars rating={product.rating} />
                    <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
                      {product.rating}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>

                  {/* Cart Button */}
                  {inCart ? (
                    <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 rounded-xl px-3 py-2">
                      <button
                        onClick={() => changeQty(product.id, -1)}
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white">
                        {inCart.qty} in cart
                      </span>
                      <button
                        onClick={() => changeQty(product.id, 1)}
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                        justAdded
                          ? "bg-emerald-500 text-white"
                          : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90"
                      }`}
                    >
                      {justAdded ? "✓ Added!" : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 h-full flex flex-col shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <ShoppingCart
                  size={16}
                  className="text-zinc-700 dark:text-zinc-300"
                />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-2 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-zinc-400">
                  <ShoppingCart size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-xs">Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xl flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        ${item.price} each
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code */}
            {cart.length > 0 && (
              <div className="px-5 pb-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      size={12}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                      placeholder="Promo code"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 text-zinc-900 dark:text-white placeholder-zinc-400"
                    />
                  </div>
                  <button className="px-3 py-2 text-xs font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="px-5 pb-6 pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Tax (0%)</span>
                  <span className="text-zinc-500">$0.00</span>
                </div>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-zinc-900 dark:text-white">Total</span>
                  <span className="text-zinc-900 dark:text-white">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                  Checkout
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
