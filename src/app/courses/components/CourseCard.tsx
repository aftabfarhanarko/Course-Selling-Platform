import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle, Code, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────
   Types  (matches GET /categories response)
───────────────────────────────────────── */
export interface CategoryMetadata {
  seo_title?: string;
  icon_class?: string;
  is_featured?: boolean;
}

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  photo?: string | null;
  isActive: boolean;
  deletedAt: string | null;
  metadata?: CategoryMetadata;
}

/* ─────────────────────────────────────────
   Response shape helpers
───────────────────────────────────────── */
export function extractCategories(payload: any): Category[] {
  if (!payload) return [];
  const items =
    payload?.data?.items ??
    payload?.items ??
    payload?.data?.data ??
    payload?.data ??
    [];
  return Array.isArray(items) ? items : [];
}

export function extractCategoryMeta(payload: any) {
  const meta =
    payload?.data?.meta ??
    payload?.meta ??
    null;
  return {
    total: Number(meta?.total ?? 0),
    page: Number(meta?.page ?? 1),
    limit: Number(meta?.limit ?? 10),
    totalPages: Number(meta?.totalPages ?? 1),
  };
}

/* ─────────────────────────────────────────
   Color palette  (cycles by index)
───────────────────────────────────────── */
const PALETTE = [
  { color: "text-blue-700",   bg: "bg-blue-50",   accent: "bg-blue-600",   shadow: "shadow-blue-500/20"   },
  { color: "text-violet-700", bg: "bg-violet-50", accent: "bg-violet-600", shadow: "shadow-violet-500/20" },
  { color: "text-emerald-700",bg: "bg-emerald-50",accent: "bg-emerald-600",shadow: "shadow-emerald-500/20"},
  { color: "text-amber-700",  bg: "bg-amber-50",  accent: "bg-amber-500",  shadow: "shadow-amber-500/20"  },
  { color: "text-rose-700",   bg: "bg-rose-50",   accent: "bg-rose-600",   shadow: "shadow-rose-500/20"   },
  { color: "text-cyan-700",   bg: "bg-cyan-50",   accent: "bg-cyan-600",   shadow: "shadow-cyan-500/20"   },
];

function getPalette(index: number) {
  return PALETTE[index % PALETTE.length];
}

/* ─────────────────────────────────────────
   CategoryCard  (renamed from CourseCard
   because the API returns categories)
───────────────────────────────────────── */
interface Props {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: Props) {
  const palette = getPalette(index);
  const isFeatured = category.metadata?.is_featured ?? false;
  const seoTitle   = category.metadata?.seo_title ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      {/* ── Thumbnail ── */}
      <div className="relative h-44 overflow-hidden bg-slate-100 flex-shrink-0">
        {category.photo ? (
          <img
            src={category.photo}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Fallback gradient when no photo */
          <div className={`w-full h-full flex items-center justify-center ${palette.bg}`}>
            <Code size={40} className={`${palette.color} opacity-30`} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/30">
            <Sparkles className="w-2.5 h-2.5" />
            Featured
          </div>
        )}

        {/* Category name pill */}
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-white/80 ${palette.color}`}
        >
          {category.name}
        </span>

        {/* Active status */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/60">
          {category.isActive ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black text-emerald-700 tracking-wide">Active</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="text-[10px] font-black text-slate-500 tracking-wide">Inactive</span>
            </>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title + ID */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-[14.5px] font-bold text-slate-900 leading-snug flex-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {category.name}
          </h3>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg flex-shrink-0">
            #{category.id}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-slate-500 leading-relaxed mb-3 line-clamp-2 flex-1">
          {category.description || "—"}
        </p>

        {/* SEO title if present */}
        {seoTitle && (
          <div className="flex items-center gap-1.5 mb-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
            <BookOpen size={11} className="text-slate-400 flex-shrink-0" />
            <p className="text-[11px] text-slate-500 truncate">{seoTitle}</p>
          </div>
        )}

        {/* Slug */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Slug</span>
          <span className="text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
            {category.slug}
          </span>
          {category.isActive && (
            <CheckCircle size={12} className="text-emerald-500 ml-auto flex-shrink-0" />
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/categories/${category.slug}`}
          className="group/btn w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[12.5px] font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-500/30 hover:shadow-lg"
        >
          View Courses{" "}
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}