"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { type Category } from "@/lib/courses";
import {
  useGetShopItemsQuery,
  useBuyShopItemMutation,
} from "@/lib/api/shopApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import {
  ArrowRight,
  BadgeCheck,
  Search,
  ShieldCheck,
  Star,
  Sparkles,
  Zap,
  ShoppingBag,
  HelpCircle,
  ChevronDown,
  Lock,
  Flame,
  CheckCircle2,
} from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ShopPage() {
  type CategoryFilter = "All" | Category;

  const { data: shopData, isLoading } = useGetShopItemsQuery({
    page: 1,
    limit: 100,
  });
  const [buyShopItem, { isLoading: isBuying }] = useBuyShopItemMutation();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const handleBuy = async (shopId: number, price: number) => {
    if (!authUser) {
      toast.error("Please login to purchase");
      return;
    }
    try {
      const res = await buyShopItem({
        userId: authUser.id,
        shopId: shopId,
        amount: price,
      }).unwrap();
      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to initiate payment");
    }
  };

  const shopItems = useMemo(() => {
    const rawItems = shopData?.items || [];
    return rawItems.map((c: any) => ({
      id: c.id,
      title: c.name ?? "Untitled Shop Item",
      desc: c.gmail ?? "Digital Asset",
      image: c.logo ?? "/placeholder.jpg",
      price: Number(c.price ?? 0),
      category: "Digital Asset",
      rating: 4.9,
      reviews: "1k+",
      earnings: "High Potential",
    }));
  }, [shopData]);

  const filters = useMemo<CategoryFilter[]>(() => {
    return ["All", "Digital Asset"] as CategoryFilter[];
  }, []);

  const [query, setQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shopItems.filter((c) => {
      if (activeCategory !== "All" && c.category !== activeCategory)
        return false;
      if (!q) return true;
      const haystack = `${c.title} ${c.desc} ${c.category}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, query, shopItems]);

  const popularCourses = useMemo(() => {
    return [...shopItems].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [shopItems]);

  return (
    <div
      className="relative w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white pt-24 pb-20 overflow-hidden font-sans"
      style={{ fontFamily: "var(--font-bai-jamjuree)" }}
    >
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E0E7FF]/50 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-32 w-[450px] h-[450px] rounded-full bg-[#EEF2FF]/60 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Hero Section */}
        <section className="py-8 sm:py-12 border-b border-slate-200/60 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-5 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/90 px-4 py-1.5 text-xs font-extrabold tracking-wider text-[#4F46E5] uppercase shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                Verified Digital Marketplace
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                Shop Products & Digital Assets{" "}
                <span className="bg-gradient-to-r from-[#4F46E5] via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  built to earn.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium mx-auto lg:mx-0">
                Pick a course or digital asset, learn the system, and ship outcomes. Instant access, lifetime updates, and 100% secure checkout.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#4F46E5] px-6 py-3 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95 transition-all duration-300"
                >
                  Browse Courses <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/shop/shopArchitect"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md px-6 py-3 text-slate-900 text-sm font-bold hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  <Sparkles className="h-4 w-4 text-[#4F46E5]" />
                  Explore Toolkit
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { k: "Instant Access", v: "Start in 60 seconds", icon: Zap },
                  { k: "Lifetime Updates", v: "New modules included", icon: CheckCircle2 },
                  { k: "Secure Checkout", v: "Encrypted payments", icon: Lock },
                ].map((x) => (
                  <motion.div
                    key={x.k}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 text-[#4F46E5] mb-1">
                      <x.icon className="w-4 h-4" />
                      <p className="text-[11px] font-black tracking-wider text-slate-400 uppercase">
                        {x.k}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      {x.v}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Popular Right Now Spotlight Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-7 shadow-2xl shadow-indigo-950/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Flame className="w-4 h-4 fill-amber-400" /> Hot Picks
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    Popular Assets Right Now
                  </h2>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-xs font-bold text-indigo-200">
                  <BadgeCheck className="h-4 w-4 text-indigo-400" />
                  Top Seller
                </div>
              </div>

              <div className="space-y-3">
                {popularCourses.length > 0 ? (
                  popularCourses.map((c, i) => (
                    <motion.div
                      key={c.id}
                      whileHover={{ x: 4 }}
                      onClick={() => handleBuy(c.id, c.price)}
                      className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-indigo-400/40 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-black tracking-widest text-indigo-300 uppercase">
                            {c.category}
                          </p>
                          <p className="mt-0.5 text-sm font-bold text-white truncate">
                            {c.title}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">
                            <span className="inline-flex items-center gap-1 font-bold text-amber-300">
                              <Star className="h-3.5 w-3.5 fill-amber-300" />
                              {c.rating}
                            </span>
                            <span className="text-slate-400">
                              ({c.reviews} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-xs font-medium text-slate-400 block">Price</span>
                          <span className="text-base font-black text-white">
                            ${c.price.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">Loading popular items...</p>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#4F46E5]" /> Explore Catalog
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Filter by category or search by product name.
              </p>
            </div>
            <div className="w-full sm:w-[380px]">
              <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md px-4 py-3 shadow-sm focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search assets or products..."
                  className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = f === activeCategory;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveCategory(f)}
                  className={
                    active
                      ? "rounded-full bg-[#4F46E5] px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all"
                      : "rounded-full border border-slate-200 bg-white/80 hover:bg-slate-100 px-5 py-2 text-xs font-bold text-slate-700 transition-all"
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>
        </section>

        {/* Product Cards Grid with Framer Motion Stagger */}
        <section className="mb-20">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-[340px] rounded-3xl bg-slate-200/60 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredCourses.map((c) => (
                  <motion.div
                    layout
                    key={c.id}
                    variants={fadeInUp}
                    whileHover={{ y: -6 }}
                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all duration-300"
                  >
                    <div>
                      <div className="relative h-[180px] bg-slate-100 overflow-hidden">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-80" />
                        <div className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-black tracking-wider text-slate-900 uppercase shadow-sm">
                          {c.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#4F46E5] transition-colors">
                            {c.title}
                          </h3>
                          <div className="shrink-0 text-right">
                            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                              Price
                            </p>
                            <p className="text-lg font-black text-[#4F46E5]">
                              ${c.price.toFixed(0)}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 mb-4">
                          {c.desc}
                        </p>

                        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-slate-900">{c.rating}</span>
                            <span className="text-slate-400">({c.reviews})</span>
                          </div>
                          <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            {c.earnings}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleBuy(c.id, c.price)}
                        disabled={isBuying}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4F46E5] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95 transition-all duration-300 disabled:opacity-50"
                      >
                        {isBuying ? "Processing..." : "Buy Now"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="mt-2.5 text-[10px] text-center text-slate-400 font-medium">
                        30-day money-back guarantee · Instant access
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!isLoading && filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-md p-12 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-slate-900">
                No Products found.
              </p>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Try searching for a different keyword or category.
              </p>
            </motion.div>
          )}
        </section>

        {/* Footer Support & FAQ Grid */}
        <section className="pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-8 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Looking for creator tools & software?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Explore the Digital Toolkit store for premium software, templates, and production assets designed for top-tier creators.
              </p>
              <Link
                href="/shop/shopArchitect"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#4F46E5] px-6 py-3 text-white text-xs font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
              >
                Open Toolkit <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md p-8 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-[#4F46E5]" /> FAQ
              </h3>
              <div className="space-y-3">
                {[
                  {
                    q: "How do I access the course after purchase?",
                    a: "Right after payment you can open your student dashboard and see the course in your courses area.",
                  },
                  {
                    q: "Do I get lifetime access?",
                    a: "Yes. Your purchase includes lifetime access and future updates for the course.",
                  },
                  {
                    q: "Is there a refund policy?",
                    a: "Yes. We offer a 30-day money-back guarantee if the course is not a fit.",
                  },
                ].map((x) => (
                  <details
                    key={x.q}
                    className="group rounded-2xl border border-slate-100 bg-slate-50/80 px-5 py-4 transition-all"
                  >
                    <summary className="cursor-pointer list-none text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between gap-4">
                      <span>{x.q}</span>
                      <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform duration-300 shrink-0" />
                    </summary>
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200/50 pt-3">
                      {x.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
