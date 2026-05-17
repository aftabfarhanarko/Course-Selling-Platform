import {
  LayoutGrid,
  TrendingUp,
  BadgeDollarSign,
  Zap,
  Sparkles,
  Star,
} from "lucide-react";

export const CATEGORY_PALETTE = [
  {
    icon: LayoutGrid,
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-200",
  },
  {
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: BadgeDollarSign,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
  },
  {
    icon: Sparkles,
    color: "text-rose-600",
    bg: "bg-rose-50 border-rose-200",
  },
  {
    icon: Star,
    color: "text-cyan-600",
    bg: "bg-cyan-50 border-cyan-200",
  },
];

export function extractCategories(payload: any): string[] {
  if (!payload) return [];

  let arr: any[] = [];

  if (Array.isArray(payload)) arr = payload;
  else if (Array.isArray(payload?.categories)) arr = payload.categories;
  else if (Array.isArray(payload?.data)) arr = payload.data;
  else if (Array.isArray(payload?.data?.categories)) {
    arr = payload.data.categories;
  }

  return arr
    .map((c: any) => String(c?.name ?? c?.title ?? "").trim())
    .filter(Boolean);
}

export function extractCourses(payload: any): any[] {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.courses)) return payload.courses;

  return [];
}
