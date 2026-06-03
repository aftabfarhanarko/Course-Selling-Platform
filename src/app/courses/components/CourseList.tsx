"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useGetPublicCoursesQuery } from "@/lib/api/courseApi";
import { useAdminCategoriesQuery } from "@/lib/api/admin/category";
import { Course, EarningTier, SortKey } from "./types";
import { extractCategories, extractCourses, CATEGORY_PALETTE } from "./utils";
import FilterPanel from "./FilterPanel";
import SearchAndSortBar from "./SearchAndSortBar";
import ActiveFiltersBar from "./ActiveFiltersBar";
import EmptyState from "./EmptyState";
import CourseGrid from "./CourseGrid";
import Pagination from "./Pagination";
import MobileFilterSheet from "./MobileFilterSheet";
// import FilterPanel from "./components/FilterPanel";
// import MobileFilterSheet from "./components/MobileFilterSheet";
// import SearchAndSortBar from "./components/SearchAndSortBar";
// import ActiveFiltersBar from "./components/ActiveFiltersBar";
// import CourseGrid from "./components/CourseGrid";
// import EmptyState from "./components/EmptyState";
// import Pagination from "./components/Pagination";


const PAGE_SIZE = 8; // renamed from _paginationPage

export default function CourseList() {
  const { data: allCoursesData } = useGetPublicCoursesQuery({ page: 1, limit: 100 });
  const { data: catData } = useAdminCategoriesQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("All Course", allCoursesData)

  // Filter / sort state
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedEarning, setSelectedEarning] = useState<EarningTier | "">("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [searchQ, setSearchQ] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("potential");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  // Read URL on mount
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
    (cats: string[], earn: string, price: number, sort: string, q: string) => {
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

  const updateFilter = (updater: () => void) => {
    updater();
    setPage(1);
  };

  const toggleCat = (cat: string) =>
    updateFilter(() => {
      setSelectedCats((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
      );
    });
  const toggleEarning = (tier: EarningTier) =>
    updateFilter(() => {
      setSelectedEarning((prev) => (prev === tier ? "" : tier));
    });
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
    setMaxPrice(2000);
    setSearchQ("");
    setPage(1);
    router.replace("/courses");
  };

  // Data processing
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

  const courses: Course[] = useMemo(() => {
    const rawItems = allCoursesData?.items || [];
    return rawItems.map((c: any) => ({
      id: c.id,
      title: c.title ?? "Untitled",
      desc: c.description ?? "",
      image: c.thumbnail ?? "/placeholder.jpg",
      price: Number(c.price ?? 0),
      category: c.category?.name ?? "Uncategorized",
      potential: Number(c.price) > 100 ? "$10k+/mo Potential" : "$2k+/mo Potential",
      potentialVal: Number(c.price) > 100 ? 10000 : 2000,
      commission: "0%",
      commissionVal: 0,
      earnings: "Beginner",
      rating: 4.9,
      reviews: "1.2k"
    }));
  }, [allCoursesData]);

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
    maxPrice < 2000 ||
    !!searchQ;
  const activeCount =
    selectedCats.length +
    (selectedEarning ? 1 : 0) +
    (maxPrice < 2000 ? 1 : 0) +
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
    <div
      className={` min-h-screen mt-17 md:mt-18 bg-[#f8f9fc]`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6">
        {/* Desktop sidebar */}
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
            {hasActive && (
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_16px_rgba(0,0,0,.06)]">
            <FilterPanel {...filterPanelProps} />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="lg:hidden mb-4">
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
            <SearchAndSortBar
              searchQ={searchQ}
              sortBy={sortBy}
              onSearch={handleSearch}
              onSort={handleSort}
            />
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
