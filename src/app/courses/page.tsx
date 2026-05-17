// app/courses/page.tsx (or your route)
"use client";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  Star,
  TrendingUp,
  Tag,
  Search,
  ArrowRight,
  LayoutGrid,
  Zap,
  BadgeDollarSign,
  Sparkles,
} from "lucide-react";

import { usePublicCoursesAllQuery } from "@/lib/api/admin/course";
import { useAdminCategoriesQuery } from "@/lib/api/admin/category";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ─── Types ────────────────────────────────────────────────────────────────────
interface Course {
  id: number | string;
  title: string;
  desc: string;
  image: string;
  price: number;
  category: string;
  potential: string;
  potentialVal: number;
  commission: string;
  commissionVal: number;
  earnings: string;
  rating: number;
  reviews: string;
}

type EarningTier = string;
type SortKey =
  | "potential"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "commission";

// ─── Static earning tiers (can remain hard‑coded) ────────────────────────────
const EARNING_TIERS: { label: EarningTier; badge: string; color: string }[] = [
  {
    label: "$1k - $5k /mo",
    badge: "Starter",
    color: "from-slate-500 to-slate-700",
  },
  {
    label: "$5k - $10k /mo",
    badge: "Growth",
    color: "from-blue-500 to-indigo-600",
  },
  { label: "$10k+ / mo", badge: "Pro", color: "from-amber-500 to-orange-600" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "potential", label: "Highest Potential" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "commission", label: "Best Commission" },
];

// ─── Dynamic category palette (assigns colours/icons by index) ───────────────
const CATEGORY_PALETTE = [
  {
    icon: <LayoutGrid className="w-3.5 h-3.5" />,
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-200",
  },
  {
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: <BadgeDollarSign className="w-3.5 h-3.5" />,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    icon: <Zap className="w-3.5 h-3.5" />,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
  },
  {
    icon: <Sparkles className="w-3.5 h-3.5" />,
    color: "text-rose-600",
    bg: "bg-rose-50 border-rose-200",
  },
  {
    icon: <Star className="w-3.5 h-3.5" />,
    color: "text-cyan-600",
    bg: "bg-cyan-50 border-cyan-200",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function extractCategories(payload: any): string[] {
  if (!payload) return [];
  let arr: any[] = [];
  if (Array.isArray(payload)) arr = payload;
  else if (Array.isArray(payload?.categories)) arr = payload.categories;
  else if (Array.isArray(payload?.data)) arr = payload.data;
  else if (Array.isArray(payload?.data?.categories))
    arr = payload.data.categories;
  return arr
    .map((c: any) => String(c?.name ?? c?.title ?? "").trim())
    .filter(Boolean);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
        />
      ))}
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
      {label}
      <button
        onClick={onRemove}
        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors"
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </span>
  );
}

// ─── Course Card (unchanged) ─────────────────────────────────────────────────
function CourseCard({
  course,
  index,
  categoryMeta,
}: {
  course: Course;
  index: number;
  categoryMeta: Record<
    string,
    { icon: React.ReactNode; color: string; bg: string }
  >;
}) {
  const meta = categoryMeta[course.category] ?? CATEGORY_PALETTE[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-44 overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-2.5 h-2.5" />
          {course.potential}
        </div>

        <span
          className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-white/80 ${meta.color} ${meta.bg}`}
        >
          {course.category}
        </span>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-black text-emerald-700 tracking-wide">
            {course.commission}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-[14.5px] font-bold text-slate-900 leading-snug flex-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <div className="text-right shrink-0">
            <span className="text-[18px] font-extrabold text-slate-900">
              ${course.price}
            </span>
          </div>
        </div>

        <p className="text-[12px] text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {course.desc}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <StarRating rating={course.rating} />
            <span className="text-[12px] font-bold text-slate-800">
              {course.rating}
            </span>
            <span className="text-[11px] text-slate-400">
              ({course.reviews})
            </span>
          </div>
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="group/btn w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[12.5px] font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-500/30 hover:shadow-lg"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Filter Panel (now receives categories & meta) ───────────────────────────
type FilterProps = {
  categoriesList: string[];
  categoryMeta: Record<
    string,
    { icon: React.ReactNode; color: string; bg: string }
  >;
  selectedCats: string[];
  selectedEarning: EarningTier | "";
  maxPrice: number;
  hasActiveFilters: boolean;
  searchQ: string;
  toggleCat: (cat: string) => void;
  toggleEarning: (tier: EarningTier) => void;
  handlePriceChange: (val: number) => void;
  clearAll: () => void;
};

function FilterPanel(props: FilterProps) {
  const {
    categoriesList,
    categoryMeta,
    selectedCats,
    selectedEarning,
    maxPrice,
    hasActiveFilters,
    searchQ,
    toggleCat,
    toggleEarning,
    handlePriceChange,
    clearAll,
  } = props;

  return (
    <div className="space-y-6">
      {/* CATEGORY */}
      <div>
        <p className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-[.12em] mb-3">
          <LayoutGrid className="w-3 h-3" /> Category
        </p>
        <div className="space-y-2">
          {categoriesList.map((cat) => {
            const meta = categoryMeta[cat] ?? CATEGORY_PALETTE[0];
            const active = selectedCats.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[12.5px] font-semibold border transition-all duration-150 ${
                  active
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : `bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50`
                }`}
              >
                <span className={`${active ? "text-white/70" : meta.color}`}>
                  {meta.icon}
                </span>
                <span className="flex-1 text-left">{cat}</span>
                {active && <X className="w-3 h-3 text-white/60" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* PRICE RANGE */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-[.12em]">
            <Tag className="w-3 h-3" /> Price Range
          </p>
          <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
            Up to ${maxPrice.toLocaleString()}
          </span>
        </div>
        <div className="relative pt-1 pb-2">
          <div className="relative h-1.5 bg-slate-100 rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
              style={{ width: `${((maxPrice - 100) / (2000 - 100)) * 100}%` }}
            />
          </div>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={maxPrice}
            onChange={(e) => handlePriceChange(parseInt(e.target.value, 10))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2"
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 font-medium">
          <span>$100</span>
          <span>$2,000</span>
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* TARGET EARNINGS */}
      <div>
        <p className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-[.12em] mb-3">
          <TrendingUp className="w-3 h-3" /> Target Earnings
        </p>
        <div className="space-y-2">
          {EARNING_TIERS.map(({ label, badge, color }) => {
            const active = selectedEarning === label;
            return (
              <button
                key={label}
                onClick={() => toggleEarning(label)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12.5px] font-semibold border transition-all duration-150 ${
                  active
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[9.5px] font-extrabold tracking-wide px-2 py-0.5 rounded-full ${
                    active
                      ? "bg-white/20 text-white"
                      : `bg-gradient-to-r ${color} text-white`
                  }`}
                >
                  {badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 pt-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[.12em] mb-2">
                Active Filters
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCats.map((cat) => (
                  <FilterTag
                    key={cat}
                    label={cat}
                    onRemove={() => toggleCat(cat)}
                  />
                ))}
                {selectedEarning && (
                  <FilterTag
                    label={selectedEarning}
                    onRemove={() =>
                      toggleEarning(selectedEarning as EarningTier)
                    }
                  />
                )}
                {maxPrice < 2000 && (
                  <FilterTag
                    label={`≤ $${maxPrice.toLocaleString()}`}
                    onRemove={() => handlePriceChange(2000)}
                  />
                )}
                {searchQ && (
                  <FilterTag label={`"${searchQ}"`} onRemove={() => {}} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={clearAll}
        className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-500 border border-slate-200 text-[12.5px] font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-1.5"
      >
        <X className="w-3.5 h-3.5" />
        Clear All Filters
      </button>
    </div>
  );
}

// ─── Course List (uses dynamic categories & courses) ─────────────────────────
let _paginationPage = 8;

function CourseList() {
  const { data: allCoursesData } = usePublicCoursesAllQuery();
  const { data: catData } = useAdminCategoriesQuery();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedEarning, setSelectedEarning] = useState<EarningTier | "">("");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [searchQ, setSearchQ] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortKey>("potential");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = filterSheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterSheetOpen]);

  useEffect(() => {
    const cats = (searchParams.get("categories")?.split(",") ?? []) as string[];
    const earn = (searchParams.get("earnings") ?? "") as EarningTier | "";
    const price = parseInt(searchParams.get("price") ?? "2000", 10);
    const sort = (searchParams.get("sort") ?? "potential") as SortKey;
    const q = searchParams.get("q") ?? "";
    if (cats.length) setSelectedCats(cats);
    if (earn) setSelectedEarning(earn);
    if (!isNaN(price)) setMaxPrice(price);
    setSortBy(sort);
    setSearchQ(q);
  }, [searchParams]);

  const syncURL = useCallback(
    (
      cats: string[],
      earn: EarningTier | "",
      price: number,
      sort: SortKey,
      q: string,
    ) => {
      const p = new URLSearchParams();
      if (cats.length) p.set("categories", cats.join(","));
      if (earn) p.set("earnings", earn);
      if (price < 2000) p.set("price", String(price));
      p.set("sort", sort);
      if (q) p.set("q", q);
      router.replace(`/courses?${p.toString()}`, { scroll: false });
    },
    [router],
  );

  // Dynamic categories from API
  const categoriesFromApi = useMemo(
    () => extractCategories(catData),
    [catData],
  );

  // Dynamic category → icon/colour map
  const categoryMeta = useMemo(() => {
    const map: Record<string, (typeof CATEGORY_PALETTE)[number]> = {};
    categoriesFromApi.forEach((cat, idx) => {
      map[cat] = CATEGORY_PALETTE[idx % CATEGORY_PALETTE.length];
    });
    return map;
  }, [categoriesFromApi]);

  const toggleCat = (cat: string) => {
    const next = selectedCats.includes(cat)
      ? selectedCats.filter((c) => c !== cat)
      : [...selectedCats, cat];
    setSelectedCats(next);
    setCurrentPage(1);
    syncURL(next, selectedEarning, maxPrice, sortBy, searchQ);
  };
  const toggleEarning = (tier: EarningTier) => {
    const next = selectedEarning === tier ? "" : tier;
    setSelectedEarning(next);
    setCurrentPage(1);
    syncURL(selectedCats, next, maxPrice, sortBy, searchQ);
  };
  const handlePriceChange = (val: number) => {
    setMaxPrice(val);
    setCurrentPage(1);
    syncURL(selectedCats, selectedEarning, val, sortBy, searchQ);
  };
  const handleSort = (val: SortKey) => {
    setSortBy(val);
    syncURL(selectedCats, selectedEarning, maxPrice, val, searchQ);
  };
  const handleSearch = (val: string) => {
    setSearchQ(val);
    setCurrentPage(1);
    syncURL(selectedCats, selectedEarning, maxPrice, sortBy, val);
  };
  const clearAll = () => {
    setSelectedCats([]);
    setSelectedEarning("");
    setMaxPrice(2000);
    setSearchQ("");
    setCurrentPage(1);
    router.replace("/courses");
  };

  // Courses solely from API (no hard-coded fallback)
  const sourceCourses: Course[] = useMemo(() => {
    const d: any = allCoursesData as any;
    const list = Array.isArray(d)
      ? d
      : Array.isArray(d?.data)
        ? d.data
        : Array.isArray(d?.courses)
          ? d.courses
          : [];
    return list as Course[];
  }, [allCoursesData]);

  const filtered: Course[] = sourceCourses
    .filter((c) => {
      if (selectedCats.length && !selectedCats.includes(c.category))
        return false;
      if (selectedEarning && c.earnings !== selectedEarning) return false;
      if (c.price > maxPrice) return false;
      if (
        searchQ &&
        !c.title.toLowerCase().includes(searchQ.toLowerCase()) &&
        !c.desc.toLowerCase().includes(searchQ.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "commission":
          return b.commissionVal - a.commissionVal;
        default:
          return b.potentialVal - a.potentialVal;
      }
    });

  const hasActiveFilters =
    selectedCats.length > 0 ||
    selectedEarning !== "" ||
    maxPrice < 2000 ||
    searchQ !== "";
  const activeFilterCount =
    selectedCats.length +
    (selectedEarning ? 1 : 0) +
    (maxPrice < 2000 ? 1 : 0) +
    (searchQ ? 1 : 0);
  const TOTAL_PAGES = _paginationPage;
  const goPage = (dir: number) =>
    setCurrentPage((p) => Math.max(1, Math.min(TOTAL_PAGES, p + dir)));

  const filterProps: FilterProps = {
    categoriesList: categoriesFromApi,
    categoryMeta,
    selectedCats,
    selectedEarning,
    maxPrice,
    hasActiveFilters,
    searchQ,
    toggleCat,
    toggleEarning,
    handlePriceChange,
    clearAll,
  };

  return (
    <div
      className={`${plusJakarta.className} min-h-screen mt-17 md:mt-18 bg-[#f8f9fc]`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 xl:w-[272px] shrink-0 lg:sticky lg:top-[76px] lg:self-start">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[14px] font-extrabold text-slate-900 tracking-tight">
                Refine Pursuit
              </span>
            </div>
            {hasActiveFilters && (
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_16px_rgba(0,0,0,.06)]">
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          {/* Mobile search + filter button */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQ}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-[14px] bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <button
              onClick={() => setFilterSheetOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:border-slate-300 transition-all shadow-sm shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-black">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile active chips */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden mb-4"
              >
                <div className="flex flex-wrap gap-1.5">
                  {selectedCats.map((cat) => (
                    <FilterTag
                      key={cat}
                      label={cat}
                      onRemove={() => toggleCat(cat)}
                    />
                  ))}
                  {selectedEarning && (
                    <FilterTag
                      label={selectedEarning}
                      onRemove={() =>
                        toggleEarning(selectedEarning as EarningTier)
                      }
                    />
                  )}
                  {maxPrice < 2000 && (
                    <FilterTag
                      label={`≤ $${maxPrice.toLocaleString()}`}
                      onRemove={() => handlePriceChange(2000)}
                    />
                  )}
                  {searchQ && (
                    <FilterTag
                      label={`"${searchQ}"`}
                      onRemove={() => handleSearch("")}
                    />
                  )}
                  <button
                    onClick={clearAll}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-100 text-[11px] font-semibold hover:bg-red-100 transition-all"
                  >
                    <X className="w-2.5 h-2.5" /> Clear all
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">
                Active Opportunities
              </h1>
              <p className="text-[13px] text-slate-400 mt-0.5">
                {filtered.length} course{filtered.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQ}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-[13px] bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all w-44"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value as SortKey)}
                className="py-2 pl-3 pr-8 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-800 bg-white cursor-pointer focus:outline-none focus:border-blue-400 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Search className="w-7 h-7 opacity-40" />
              </div>
              <p className="text-base font-bold text-slate-600">
                No courses match your filters
              </p>
              <p className="text-sm mt-1 text-slate-400">
                Try adjusting your criteria.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((course, i) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={i}
                  categoryMeta={categoryMeta}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
            <button
              onClick={() => goPage(-1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>

            {Array.from({ length: Math.min(3, TOTAL_PAGES) }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-bold border transition-all ${
                  currentPage === i + 1
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <span className="text-slate-300 font-bold px-1">···</span>

            <button
              onClick={() => setCurrentPage(TOTAL_PAGES)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-bold border transition-all ${
                currentPage === TOTAL_PAGES
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white"
              }`}
            >
              {TOTAL_PAGES}
            </button>

            <button
              onClick={() => goPage(1)}
              disabled={currentPage === TOTAL_PAGES}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM SHEET */}
      <AnimatePresence>
        {filterSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] lg:hidden"
              onClick={() => setFilterSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,.18)] lg:hidden flex flex-col"
              style={{ maxHeight: "90vh" }}
            >
              <div className="flex-shrink-0 px-5 pt-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[15px] font-extrabold text-slate-900">
                      Refine Pursuit
                    </span>
                    {activeFilterCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold">
                        {activeFilterCount} active
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setFilterSheetOpen(false)}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <FilterPanel {...filterProps} />
              </div>

              <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 bg-white">
                <button
                  onClick={() => setFilterSheetOpen(false)}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white text-[14px] font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Show {filtered.length} Result
                  {filtered.length !== 1 ? "s" : ""}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading courses...</span>
          </div>
        </div>
      }
    >
      <CourseList />
    </Suspense>
  );
}
