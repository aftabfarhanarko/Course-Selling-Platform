import { Search, SlidersHorizontal } from "lucide-react";
import { SortKey } from "./types";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "potential", label: "Highest Potential" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "commission", label: "Best Commission" },
];

interface Props {
  searchQ: string;
  sortBy: SortKey;
  onSearch: (val: string) => void;
  onSort: (val: SortKey) => void;
  isMobile?: boolean;
  onFilterOpen?: () => void;
  activeFilterCount?: number;
}

export default function SearchAndSortBar({
  searchQ,
  sortBy,
  onSearch,
  onSort,
  isMobile,
  onFilterOpen,
  activeFilterCount,
}: Props) {
  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQ}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-[14px] bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        {onFilterOpen && (
          <button
            onClick={onFilterOpen}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:border-slate-300 transition-all shadow-sm shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {activeFilterCount ? (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-black">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative hidden lg:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQ}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-[13px] bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all w-44"
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSort(e.target.value as SortKey)}
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
  );
}
