"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  Tag,
  X,
  Check,
  Code2,
  Cloud,
  Sparkles,
  Palette,
  Smartphone,
  ShieldCheck,
  Briefcase,
  LucideIcon,
} from "lucide-react";
import FilterTag from "./FilterTag";

interface Props {
  categoriesList: string[];
  categoryMeta: Record<string, { icon: any; color: string; bg: string }>;
  selectedCats: string[];
  selectedEarning: string;
  maxPrice: number;
  hasActiveFilters: boolean;
  searchQ: string;
  toggleCat: (cat: string) => void;
  toggleEarning: (tier: any) => void;
  handlePriceChange: (val: number) => void;
  clearAll: () => void;
  maxPriceLimit?: number;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Development: Code2,
  "Cloud & DevOps": Cloud,
  "AI & Data Science": Sparkles,
  "Design & UI/UX": Palette,
  "Mobile Dev": Smartphone,
  Cybersecurity: ShieldCheck,
  Business: Briefcase,
};

export default function FilterPanel({
  categoriesList,
  selectedCats,
  maxPrice,
  hasActiveFilters,
  searchQ,
  toggleCat,
  handlePriceChange,
  clearAll,
  maxPriceLimit = 300,
}: Props) {
  const currentMax = maxPrice > maxPriceLimit ? maxPriceLimit : maxPrice;
  const progressPercent = (currentMax / maxPriceLimit) * 100;
  const isPriceFilterActive = currentMax < maxPriceLimit;

  return (
    <div className="space-y-6">
      {/* ── Categories Section ── */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <p className="flex items-center gap-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            <LayoutGrid className="w-3.5 h-3.5 text-[#5B50E6]" /> Categories
          </p>
          {selectedCats.length > 0 && (
            <span className="text-[10px] font-bold text-[#5B50E6] bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              {selectedCats.length} active
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          {categoriesList.map((cat) => {
            const isSelected = selectedCats.includes(cat);
            const Icon = CATEGORY_ICONS[cat] || Code2;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCat(cat)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                  isSelected
                    ? "bg-[#5B50E6] text-white shadow-md shadow-[#5B50E6]/25 scale-[1.01]"
                    : "text-slate-700 bg-slate-50/80 hover:bg-white hover:text-slate-900 border border-slate-200/60 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{cat}</span>
                </div>

                <div
                  className={`w-4 h-4 rounded-lg border flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-white border-white text-[#5B50E6]"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* ── Price Range & Quick Presets ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="flex items-center gap-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            <Tag className="w-3.5 h-3.5 text-[#5B50E6]" /> Max Budget
          </p>
          <span className="text-xs font-black text-[#5B50E6] bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-100">
            ${currentMax}
          </span>
        </div>

        {/* Quick Price Preset Chips */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[50, 100, 200, 300].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePriceChange(preset)}
              className={`py-1 rounded-xl text-[11px] font-bold transition-all border ${
                currentMax === preset
                  ? "bg-[#5B50E6] text-white border-[#5B50E6] shadow-2xs"
                  : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>

        <div className="relative pt-2 pb-2">
          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#5B50E6] rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <input
            type="range"
            min={10}
            max={maxPriceLimit}
            step={10}
            value={currentMax}
            onChange={(e) => handlePriceChange(parseInt(e.target.value, 10))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-1"
          />
        </div>

        <div className="flex justify-between text-[11px] text-slate-400 font-bold">
          <span>$10</span>
          <span>${maxPriceLimit}</span>
        </div>
      </div>

      {/* ── Active Filters ── */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 pt-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
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
                {isPriceFilterActive && (
                  <FilterTag
                    label={`≤ $${currentMax}`}
                    onRemove={() => handlePriceChange(maxPriceLimit)}
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

      {/* ── Reset Button ── */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => {
            handlePriceChange(maxPriceLimit);
            clearAll();
          }}
          className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-[12.5px] font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <X className="w-3.5 h-3.5" /> Clear All Filters
        </button>
      )}
    </div>
  );
}
