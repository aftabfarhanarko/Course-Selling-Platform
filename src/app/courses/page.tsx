"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Course {
  id: number;
  title: string;
  desc: string;
  price: number;
  potential: string;
  potentialVal: number;
  commission: string;
  commissionVal: number;
  rating: number;
  reviews: string;
  image: string;
  category: Category;
  earnings: EarningTier;
}

type Category =
  | "Digital Design"
  | "Growth Marketing"
  | "Sales Architecture"
  | "AI Automation";
type EarningTier = "$1k - $5k /mo" | "$5k - $10k /mo" | "$10k+ / mo";
type SortKey =
  | "potential"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "commission";

// ─── Static Data ─────────────────────────────────────────────────────────────
const COURSES: Course[] = [
  {
    id: 1,
    title: "SaaS Interface Architect Masterclass",
    desc: "Master high-conversion SaaS design and build a recurring revenue agency from scratch.",
    price: 499,
    potential: "$8,500/MO POTENTIAL",
    potentialVal: 8500,
    commission: "40% COMMISSION",
    commissionVal: 40,
    rating: 4.9,
    reviews: "1.2k",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    category: "Digital Design",
    earnings: "$1k - $5k /mo",
  },
  {
    id: 2,
    title: "Growth Engine: Performance Marketing",
    desc: "Advanced strategies for scaling digital products using meta-ads and psychological funneling.",
    price: 795,
    potential: "$12,000/MO POTENTIAL",
    potentialVal: 12000,
    commission: "35% COMMISSION",
    commissionVal: 35,
    rating: 4.8,
    reviews: "850",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    category: "Growth Marketing",
    earnings: "$10k+ / mo",
  },
  {
    id: 3,
    title: "AI-First Agency: The 2024 Playbook",
    desc: "The definitive guide to building an automated service agency leveraging LLMs and custom GPTs.",
    price: 1200,
    potential: "$15,000/MO POTENTIAL",
    potentialVal: 15000,
    commission: "25% COMMISSION",
    commissionVal: 25,
    rating: 5.0,
    reviews: "340",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    category: "AI Automation",
    earnings: "$10k+ / mo",
  },
  {
    id: 4,
    title: "High-Ticket Sales Psychology",
    desc: "Learn the mental triggers that close $10k+ deals without feeling like a salesman.",
    price: 599,
    potential: "$9,000/MO POTENTIAL",
    potentialVal: 9000,
    commission: "50% COMMISSION",
    commissionVal: 50,
    rating: 4.7,
    reviews: "2.1k",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80",
    category: "Sales Architecture",
    earnings: "$5k - $10k /mo",
  },
  {
    id: 5,
    title: "E-Commerce Brand Domination",
    desc: "Build and scale a profitable DTC brand using Facebook & TikTok ads with proven frameworks.",
    price: 449,
    potential: "$7,500/MO POTENTIAL",
    potentialVal: 7500,
    commission: "30% COMMISSION",
    commissionVal: 30,
    rating: 4.6,
    reviews: "980",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    category: "Growth Marketing",
    earnings: "$5k - $10k /mo",
  },
  {
    id: 6,
    title: "UI/UX Design System Mastery",
    desc: "Create scalable design systems used by Fortune 500 companies and charge premium rates.",
    price: 349,
    potential: "$6,000/MO POTENTIAL",
    potentialVal: 6000,
    commission: "45% COMMISSION",
    commissionVal: 45,
    rating: 4.8,
    reviews: "1.5k",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80",
    category: "Digital Design",
    earnings: "$1k - $5k /mo",
  },
];

const CATEGORIES: Category[] = [
  "Digital Design",
  "Growth Marketing",
  "Sales Architecture",
  "AI Automation",
];

const EARNING_TIERS: { label: EarningTier; badge: string }[] = [
  { label: "$1k - $5k /mo", badge: "Starter" },
  { label: "$5k - $10k /mo", badge: "Growth" },
  { label: "$10k+ / mo", badge: "Pro" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "potential", label: "Potential" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "commission", label: "Commission" },
];

// ─── Star renderer ────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <>
      {Array.from({ length: Math.floor(rating) }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">
          ★
        </span>
      ))}
    </>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide">
          {course.potential}
        </span>
        <span className="absolute top-3 right-3 bg-slate-900/70 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
          {course.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug flex-1 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <span className="text-xl font-black text-slate-900 shrink-0">
            ${course.price}
          </span>
        </div>

        <p className="text-[12.5px] text-slate-500 leading-relaxed mb-4 line-clamp-2">
          {course.desc}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="text-[11px] font-black text-emerald-700 tracking-wide">
              {course.commission}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <StarRating rating={course.rating} />
            <span className="text-[13px] font-bold text-slate-900 ml-1">
              {course.rating}
            </span>
            <span className="text-xs text-slate-400">({course.reviews})</span>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold transition-colors flex items-center justify-center gap-1.5">
          View Details
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Filter Tag ───────────────────────────────────────────────────────────────
function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-semibold">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-blue-900 transition-colors"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function CoursesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── Filter state ──
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);
  const [selectedEarning, setSelectedEarning] = useState<EarningTier | "">("");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [searchQ, setSearchQ] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortKey>("potential");

  // ── UI state ──
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // ── Sync filters from URL on mount ──
  useEffect(() => {
    const cats = (searchParams.get("categories")?.split(",") ??
      []) as Category[];
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

  // ── Push filters to URL ──
  const syncURL = useCallback(
    (
      cats: Category[],
      earn: EarningTier | "",
      price: number,
      sort: SortKey,
      q: string,
    ) => {
      const params = new URLSearchParams();
      if (cats.length) params.set("categories", cats.join(","));
      if (earn) params.set("earnings", earn);
      if (price < 2000) params.set("price", String(price));
      params.set("sort", sort);
      if (q) params.set("q", q);
      router.replace(`/courses?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  // ── Toggle category (auto-apply) ──
  const toggleCat = (cat: Category) => {
    const next = selectedCats.includes(cat)
      ? selectedCats.filter((c) => c !== cat)
      : [...selectedCats, cat];
    setSelectedCats(next);
    setCurrentPage(1);
    syncURL(next, selectedEarning, maxPrice, sortBy, searchQ);
  };

  // ── Toggle earning tier (auto-apply) ──
  const toggleEarning = (tier: EarningTier) => {
    const next = selectedEarning === tier ? "" : tier;
    setSelectedEarning(next);
    setCurrentPage(1);
    syncURL(selectedCats, next, maxPrice, sortBy, searchQ);
  };

  // ── Price change (auto-apply with debounce-like via onMouseUp) ──
  const handlePriceChange = (val: number) => {
    setMaxPrice(val);
    setCurrentPage(1);
    syncURL(selectedCats, selectedEarning, val, sortBy, searchQ);
  };

  // ── Sort change ──
  const handleSort = (val: SortKey) => {
    setSortBy(val);
    syncURL(selectedCats, selectedEarning, maxPrice, val, searchQ);
  };

  // ── Search ──
  const handleSearch = (val: string) => {
    setSearchQ(val);
    setCurrentPage(1);
    syncURL(selectedCats, selectedEarning, maxPrice, sortBy, val);
  };

  // ── Clear all ──
  const clearAll = () => {
    setSelectedCats([]);
    setSelectedEarning("");
    setMaxPrice(2000);
    setSearchQ("");
    setCurrentPage(1);
    router.replace("/courses");
  };

  // ── Derived filtered + sorted list ──
  const filtered: Course[] = COURSES.filter((c) => {
    if (selectedCats.length && !selectedCats.includes(c.category)) return false;
    if (selectedEarning && c.earnings !== selectedEarning) return false;
    if (c.price > maxPrice) return false;
    if (
      searchQ &&
      !c.title.toLowerCase().includes(searchQ.toLowerCase()) &&
      !c.desc.toLowerCase().includes(searchQ.toLowerCase())
    )
      return false;
    return true;
  }).sort((a, b) => {
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

  // ── Pagination (static display, extend with real data as needed) ──
  const TOTAL_PAGES = 8;
  const goPage = (dir: number) =>
    setCurrentPage((p) => Math.max(1, Math.min(TOTAL_PAGES, p + dir)));

  return (
    <div className="min-h-screen bg-slate-50">
   

      {/* ─── PAGE BODY ──────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-7 flex flex-col lg:flex-row gap-6">
        {/* ─── SIDEBAR ──────────────────────────────────────── */}
        <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-[76px] lg:self-start">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            {/* Header + mobile toggle */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 5h18M7 12h10M10 19h4" strokeLinecap="round" />
                </svg>
                <span className="text-[14px] font-bold text-slate-900">
                  Refine Pursuit
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-slate-500 transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 15l-6-6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`${sidebarOpen ? "block" : "hidden"} lg:block space-y-6`}
            >
              {/* ── CATEGORY ── */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCat(cat)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                        selectedCats.includes(cat)
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── PRICE RANGE ── */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Price Range
                  </p>
                  <span className="text-[12px] font-bold text-blue-600">
                    Up to ${maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) =>
                    handlePriceChange(parseInt(e.target.value, 10))
                  }
                  className="w-full accent-blue-600 cursor-pointer h-1.5"
                />
                <div className="flex justify-between mt-1.5 text-[11px] text-slate-400">
                  <span>$100</span>
                  <span>$2,000</span>
                </div>
              </div>

              {/* ── TARGET EARNINGS ── */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Target Earnings
                </p>
                <div className="space-y-2">
                  {EARNING_TIERS.map(({ label, badge }) => (
                    <button
                      key={label}
                      onClick={() => toggleEarning(label)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold border transition-all ${
                        selectedEarning === label
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {label}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          selectedEarning === label
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── ACTIVE FILTER TAGS ── */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-1.5 pt-1">
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
                </div>
              )}

              {/* ── CLEAR ALL ── */}
              <button
                onClick={clearAll}
                className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 text-[13px] font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Mobile search */}
          <div className="sm:hidden relative mb-4">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQ}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-[14px] bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Active Opportunities
              </h1>
              <span className="text-slate-400 font-medium text-base">
                ({filtered.length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value as SortKey)}
                className="py-1.5 pl-3 pr-7 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 bg-white cursor-pointer focus:outline-none focus:border-blue-400 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 8px center",
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

          {/* Course Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <svg
                className="w-14 h-14 mb-4 opacity-40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-base font-medium">
                No courses match your filters.
              </p>
              <p className="text-sm mt-1">Try adjusting your criteria.</p>
              <button
                onClick={clearAll}
                className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
            <button
              onClick={() => goPage(-1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-semibold border transition-all ${
                  currentPage === n
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200"
                    : "border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 bg-white"
                }`}
              >
                {n}
              </button>
            ))}

            <span className="text-slate-300 font-bold px-1">...</span>

            <button
              onClick={() => setCurrentPage(8)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-semibold border transition-all ${
                currentPage === 8
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 bg-white"
              }`}
            >
              8
            </button>

            <button
              onClick={() => goPage(1)}
              disabled={currentPage === TOTAL_PAGES}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => goPage(1)}
              disabled={currentPage === TOTAL_PAGES}
              className="ml-1 flex items-center gap-1 px-3 py-1.5 text-[13px] font-bold text-blue-600 hover:underline disabled:opacity-30 transition-all"
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
