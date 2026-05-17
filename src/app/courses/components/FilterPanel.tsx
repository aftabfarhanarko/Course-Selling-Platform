import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Tag, TrendingUp, X } from "lucide-react";
import { EarningTier } from "./types";
import { CATEGORY_PALETTE } from "./utils";
import FilterTag from "./FilterTag";

const EARNING_TIERS = [
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

interface Props {
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
}

export default function FilterPanel({
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
}: Props) {
  return (
    <div className="space-y-6">
      {/* Categories */}
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
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className={active ? "text-white/70" : meta.color}>
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

      {/* Price Range */}
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

      {/* Earnings */}
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
                onClick={() => toggleEarning(label as EarningTier)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12.5px] font-semibold border transition-all duration-150 ${
                  active
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[9.5px] font-extrabold tracking-wide px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : `bg-gradient-to-r ${color} text-white`}`}
                >
                  {badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active filters */}
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
        <X className="w-3.5 h-3.5" /> Clear All Filters
      </button>
    </div>
  );
}
