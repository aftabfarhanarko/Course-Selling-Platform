import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";
import FilterPanel from "./FilterPanel";

interface Props {
  open: boolean;
  onClose: () => void;
  activeFilterCount: number;
  filteredCount: number;
  filterPanelProps: React.ComponentProps<typeof FilterPanel>;
}

export default function MobileFilterSheet({
  open,
  onClose,
  activeFilterCount,
  filteredCount,
  filterPanelProps,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
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
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterPanel {...filterPanelProps} />
            </div>
            <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 bg-white">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white text-[14px] font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Show {filteredCount} Result{filteredCount !== 1 ? "s" : ""}{" "}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
