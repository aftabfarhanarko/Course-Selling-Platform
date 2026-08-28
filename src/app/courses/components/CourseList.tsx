"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Sparkles, TrendingUp, Search, X, Users, Star } from "lucide-react";
import { useGetPublicCoursesQuery } from "@/lib/api/courseApi";
import { useAdminCategoriesQuery } from "@/lib/api/admin/category";
import { Course, EarningTier, SortKey } from "./types";
import { extractCategories, CATEGORY_PALETTE } from "./utils";
import FilterPanel from "./FilterPanel";
import SearchAndSortBar from "./SearchAndSortBar";
import ActiveFiltersBar from "./ActiveFiltersBar";
import EmptyState from "./EmptyState";
import CourseGrid from "./CourseGrid";
import Pagination from "./Pagination";
import MobileFilterSheet from "./MobileFilterSheet";

const PAGE_SIZE = 8;

export default function CourseList() {
  const { data: allCoursesData } = useGetPublicCoursesQuery({
    page: 1,
    limit: 100,
  });
  const { data: catData } = useAdminCategoriesQuery();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedEarning, setSelectedEarning] = useState<EarningTier | "">("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [searchQ, setSearchQ] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("potential");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const cats = (searchParams.get("categories")?.split(",") ?? []) as string[];
    const earn = (searchParams.get("earnings") ?? "") as EarningTier | "";
    const price = parseInt(searchParams.get("price") ?? "300", 10);
    const sort = (searchParams.get("sort") ?? "potential") as SortKey;
    const q = searchParams.get("q") ?? "";
    if (cats.length) setSelectedCats(cats);
    if (earn) setSelectedEarning(earn);
    if (!isNaN(price)) setMaxPrice(price);
    setSortBy(sort);
    setSearchQ(q);
  }, [searchParams]);

  const syncURL = useCallback(
    (cats: string[], earn: string, price: number, sort: string, q: string) => {
      const p = new URLSearchParams();
      if (cats.length) p.set("categories", cats.join(","));
      if (earn) p.set("earnings", earn);
      if (price < 300) p.set("price", String(price));
      p.set("sort", sort);
      if (q) p.set("q", q);
      router.replace(`/courses?${p.toString()}`, { scroll: false });
    },
    [router],
  );

  const updateFilter = (updater: () => void) => {
    updater();
    setPage(1);
  };

  const toggleCat = (cat: string) =>
    updateFilter(() =>
      setSelectedCats((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
      ),
    );
  const toggleEarning = (tier: EarningTier) =>
    updateFilter(() =>
      setSelectedEarning((prev) => (prev === tier ? "" : tier)),
    );
  const handlePriceChange = (val: number) =>
    updateFilter(() => setMaxPrice(val));
  const handleSort = (val: SortKey) => {
    setSortBy(val);
    syncURL(selectedCats, selectedEarning, maxPrice, val, searchQ);
  };
  const handleSearch = (val: string) => {
    setSearchQ(val);
    setPage(1);
    syncURL(selectedCats, selectedEarning, maxPrice, sortBy, val);
  };
  const clearAll = () => {
    setSelectedCats([]);
    setSelectedEarning("");
    setMaxPrice(300);
    setSearchQ("");
    setPage(1);
    router.replace("/courses");
  };

  const categoriesFromApi = useMemo(
    () => extractCategories(catData),
    [catData],
  );
  const categoryMeta = useMemo(() => {
    const map: Record<string, (typeof CATEGORY_PALETTE)[number]> = {};
    categoriesFromApi.forEach((cat, i) => {
      map[cat] = CATEGORY_PALETTE[i % CATEGORY_PALETTE.length];
    });
    return map;
  }, [categoriesFromApi]);

  const HARDCODED_COURSES: Course[] = useMemo(
    () => [
      {
        id: "course-1",
        title: "Next.js 14 Production Architecture & SaaS Blueprint",
        desc: "Master Next.js App Router, Server Actions, Stripe payments, Prisma ORM, and deployment on Vercel.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=85",
        price: 99,
        category: "Development",
        potential: "$10k+/mo Potential",
        potentialVal: 10000,
        commission: "25%",
        commissionVal: 25,
        earnings: "High",
        rating: 4.9,
        reviews: "1.4k",
      },
      {
        id: "course-2",
        title: "Mastering Kubernetes, Docker & GitOps Pipelines",
        desc: "Build scalable cloud-native infrastructure with Kubernetes, Helm, ArgoCD, and AWS EKS.",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=700&q=85",
        price: 129,
        category: "Cloud & DevOps",
        potential: "$12k+/mo Potential",
        potentialVal: 12000,
        commission: "30%",
        commissionVal: 30,
        earnings: "High",
        rating: 4.8,
        reviews: "950",
      },
      {
        id: "course-3",
        title: "Advanced TypeScript & Microservice Patterns",
        desc: "Deep dive into generics, AST transformations, gRPC, and event-driven microservices architecture.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=85",
        price: 79,
        category: "Development",
        potential: "$8k+/mo Potential",
        potentialVal: 8000,
        commission: "20%",
        commissionVal: 20,
        earnings: "Mid",
        rating: 4.9,
        reviews: "2.1k",
      },
      {
        id: "course-4",
        title: "Fullstack SaaS Boilerplate & AI Agent Integration",
        desc: "Learn to build multi-tenant AI SaaS apps with OpenAI API, LangChain, and TailwindCSS.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=85",
        price: 149,
        category: "AI & Data Science",
        potential: "$15k+/mo Potential",
        potentialVal: 15000,
        commission: "35%",
        commissionVal: 35,
        earnings: "High",
        rating: 5.0,
        reviews: "820",
      },
      {
        id: "course-5",
        title: "UI/UX Masterclass & Design Systems in Figma",
        desc: "Design responsive web & mobile apps, build component libraries, and master modern UX research.",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=85",
        price: 69,
        category: "Design & UI/UX",
        potential: "$5k+/mo Potential",
        potentialVal: 5000,
        commission: "15%",
        commissionVal: 15,
        earnings: "Beginner",
        rating: 4.8,
        reviews: "1.8k",
      },
      {
        id: "course-6",
        title: "Flutter & Dart: Cross-Platform Mobile Apps",
        desc: "Build iOS and Android apps with a single codebase using Riverpod, Firebase, and Clean Architecture.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=85",
        price: 89,
        category: "Mobile Dev",
        potential: "$7k+/mo Potential",
        potentialVal: 7000,
        commission: "20%",
        commissionVal: 20,
        earnings: "Mid",
        rating: 4.7,
        reviews: "1.1k",
      },
      {
        id: "course-7",
        title: "Ethical Hacking & Web Application Penetration Testing",
        desc: "Discover OWASP top 10 vulnerabilities, conduct penetration tests, and secure cloud infrastructure.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=85",
        price: 119,
        category: "Cybersecurity",
        potential: "$11k+/mo Potential",
        potentialVal: 11000,
        commission: "25%",
        commissionVal: 25,
        earnings: "High",
        rating: 4.9,
        reviews: "640",
      },
      {
        id: "course-8",
        title: "Startup Growth & Product Management Playbook",
        desc: "Master product discovery, customer retention, growth hacking, and seed fundraising strategies.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=85",
        price: 95,
        category: "Business",
        potential: "$9k+/mo Potential",
        potentialVal: 9000,
        commission: "20%",
        commissionVal: 20,
        earnings: "Mid",
        rating: 4.8,
        reviews: "890",
      },
    ],
    [],
  );

  const courses: Course[] = useMemo(() => {
    const rawItems = allCoursesData?.items;
    if (rawItems && rawItems.length > 0) {
      return rawItems.map((c: any) => ({
        id: c.id,
        title: c.title ?? "Untitled",
        desc: c.description ?? "",
        image: c.thumbnail ?? "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=85",
        price: Number(c.price ?? 0),
        category: c.category?.name ?? "Development",
        potential:
          Number(c.price) > 100 ? "$10k+/mo Potential" : "$2k+/mo Potential",
        potentialVal: Number(c.price) > 100 ? 10000 : 2000,
        commission: "20%",
        commissionVal: 20,
        earnings: Number(c.price) > 100 ? "High" : "Beginner",
        rating: 4.9,
        reviews: "1.2k",
      }));
    }
    return HARDCODED_COURSES;
  }, [allCoursesData, HARDCODED_COURSES]);

  const filtered = courses
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const hasActive =
    selectedCats.length > 0 ||
    !!selectedEarning ||
    maxPrice < 300 ||
    !!searchQ;
  const activeCount =
    selectedCats.length +
    (selectedEarning ? 1 : 0) +
    (maxPrice < 300 ? 1 : 0) +
    (searchQ ? 1 : 0);

  const filterPanelProps = {
    categoriesList: categoriesFromApi,
    categoryMeta,
    selectedCats,
    selectedEarning,
    maxPrice,
    hasActiveFilters: hasActive,
    searchQ,
    toggleCat,
    toggleEarning,
    handlePriceChange,
    clearAll,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── HERO BANNER & INTERACTIVE SEARCH BAR ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-slate-50 to-[#F8FAFC] border-b border-slate-200/60 pt-10 sm:pt-14 pb-12 sm:pb-16">
        {/* Decorative Background Orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#E0E7FF]/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full bg-[#EEF2FF]/50 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Header & Search Interface */}
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200/80 bg-white/90 backdrop-blur-md text-[#5B50E6] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Learning Catalog</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Discover & Master <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#5B50E6] via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  High-Impact Skills
                </span>
              </h1>
              
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                Choose from over {filtered.length} curated programs with hands-on projects, real-world architecture, and industry certifications.
              </p>

              {/* Advanced Glass Search Command Bar */}
              <div className="pt-2">
                <div className="relative flex items-center bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/60 transition-all focus-within:border-[#5B50E6] focus-within:ring-4 focus-within:ring-[#5B50E6]/10">
                  <div className="flex items-center gap-3 flex-1 px-3">
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search courses, skills, technologies (e.g. Next.js, AI, Figma)..."
                      value={searchQ}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
                    />
                    {searchQ && (
                      <button
                        type="button"
                        onClick={() => handleSearch("")}
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-xl bg-[#5B50E6] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5B50E6]/30 hover:bg-[#4D42DB] transition-all hover:scale-105 shrink-0"
                  >
                    Search
                  </button>
                </div>

                {/* Popular Search Quick Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-3 text-xs font-semibold text-slate-400">
                  <span className="text-[11px] text-slate-400 font-bold">Popular:</span>
                  {["Development", "AI & Data Science", "Design & UI/UX", "Cloud & DevOps"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleCat(tag)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                        selectedCats.includes(tag)
                          ? "bg-[#5B50E6] text-white shadow-sm"
                          : "bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60 shadow-2xs"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Live Stats Cards */}
            <div className="grid grid-cols-3 sm:flex lg:flex-col gap-3 shrink-0">
              {[
                { label: "Completion Rate", value: "99%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
                { label: "Active Students", value: "50k+", icon: Users, color: "text-[#5B50E6]", bg: "bg-indigo-50" },
                { label: "Avg. Rating", value: "4.9 ★", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-black text-slate-900 leading-none">
                        {s.value}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE SEARCH + FILTER TRIGGER */}
      <div className="lg:hidden sticky top-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 shadow-sm">
        <SearchAndSortBar
          searchQ={searchQ}
          sortBy={sortBy}
          onSearch={handleSearch}
          onSort={handleSort}
          isMobile
          onFilterOpen={() => setFilterOpen(true)}
          activeFilterCount={activeCount}
        />
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 lg:sticky lg:top-[84px] lg:self-start">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0052CC] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Filter Courses
              </h2>
            </div>
            {hasActive && (
              <span className="text-[10px] font-black text-white bg-[#0052CC] px-2.5 py-0.5 rounded-full shadow-sm">
                {activeCount}
              </span>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <FilterPanel {...filterPanelProps} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <ActiveFiltersBar
            visible={hasActive}
            selectedCats={selectedCats}
            selectedEarning={selectedEarning}
            maxPrice={maxPrice}
            searchQ={searchQ}
            toggleCat={toggleCat}
            toggleEarning={toggleEarning}
            handlePriceChange={handlePriceChange}
            handleSearch={handleSearch}
            clearAll={clearAll}
          />

          <div className="hidden lg:flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0047FF]" />
              <span className="text-[13px] text-slate-500 font-medium">
                Showing{" "}
                <span className="font-extrabold text-slate-900">
                  {paginated.length}
                </span>{" "}
                of{" "}
                <span className="font-extrabold text-slate-900">
                  {filtered.length}
                </span>{" "}
                courses
              </span>
            </div>
            <SearchAndSortBar
              searchQ={searchQ}
              sortBy={sortBy}
              onSearch={handleSearch}
              onSort={handleSort}
            />
          </div>

          <div className="lg:hidden flex items-center gap-1.5 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#0047FF]" />
            <span className="text-[12px] text-slate-500 font-medium">
              <span className="font-extrabold text-slate-800">
                {filtered.length}
              </span>{" "}
              courses found
            </span>
          </div>

          {paginated.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <>
              <CourseGrid courses={paginated} categoryMeta={categoryMeta} />
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>

      <MobileFilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        activeFilterCount={activeCount}
        filteredCount={filtered.length}
        filterPanelProps={filterPanelProps}
      />
    </div>
  );
}
