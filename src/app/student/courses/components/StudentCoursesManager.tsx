"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Hash,
  Info,
  Loader2,
  Search,
  Tag,
  TrendingUp,
  X,
  GraduationCap,
  BarChart2,
  Clock,
  Layers,
} from "lucide-react";
import { useStudentMyCoursesQuery } from "@/lib/api/student/courses";

// ─── Types ────────────────────────────────────────────────────────────────────

type UiCourse = {
  id: number | string;
  title: string;
  status: string;
  progress: number | null;
  enrolledAt: string;
  raw: any;
};

const PAGE_SIZE = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.courses)) return payload.courses;
  if (Array.isArray(payload?.myCourses)) return payload.myCourses;
  if (Array.isArray(payload?.enrollments)) return payload.enrollments;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.courses)) return payload.data.courses;
  if (Array.isArray(payload?.data?.myCourses)) return payload.data.myCourses;
  if (Array.isArray(payload?.data?.enrollments))
    return payload.data.enrollments;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function toUi(raw: any): UiCourse | null {
  const id =
    raw?.id ??
    raw?._id ??
    raw?.courseId ??
    raw?.enrollmentId ??
    raw?.enrollId ??
    raw?.course?._id ??
    raw?.course?.id ??
    null;

  if (!id) return null;

  const title =
    String(
      raw?.title ?? raw?.name ?? raw?.course?.title ?? raw?.course?.name ?? "—",
    ).trim() || "—";

  const status =
    String(
      raw?.status ??
        raw?.state ??
        raw?.enrollmentStatus ??
        raw?.course?.status ??
        "—",
    ).trim() || "—";

  const progressRaw = raw?.progress ?? raw?.courseProgress ?? null;
  let progress: number | null = null;
  if (progressRaw !== null && progressRaw !== undefined && progressRaw !== "") {
    const n = Number(progressRaw);
    progress = Number.isFinite(n) ? n : null;
  } else {
    const completed = Number(
      raw?.lessonsCompleted ?? raw?.completedLessons ?? NaN,
    );
    const total = Number(raw?.totalLessons ?? raw?.lessonsTotal ?? NaN);
    if (Number.isFinite(completed) && Number.isFinite(total) && total > 0) {
      progress = Math.round((completed / total) * 100);
    }
  }

  const enrolledAt = formatDate(
    raw?.enrolledAt ??
      raw?.createdAt ??
      raw?.created_at ??
      raw?.course?.createdAt,
  );

  return { id, title, status, progress, enrolledAt, raw };
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const map: Record<string, string> = {
    completed:
      "bg-emerald-100 text-emerald-700 border-emerald-200 ring-emerald-100",
    active: "bg-blue-100 text-blue-700 border-blue-200 ring-blue-100",
    enrolled: "bg-violet-100 text-violet-700 border-violet-200 ring-violet-100",
    pending: "bg-amber-100 text-amber-700 border-amber-200 ring-amber-100",
    cancelled: "bg-red-100 text-red-600 border-red-200 ring-red-100",
    expired: "bg-gray-100 text-gray-500 border-gray-200 ring-gray-100",
  };
  const dotMap: Record<string, string> = {
    completed: "bg-emerald-500",
    active: "bg-blue-500",
    enrolled: "bg-violet-500",
    pending: "bg-amber-500",
    cancelled: "bg-red-500",
    expired: "bg-gray-400",
  };
  const cls = map[s] ?? "bg-gray-100 text-gray-600 border-gray-200";
  const dot = dotMap[s] ?? "bg-gray-400";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number | null }) {
  if (value === null)
    return <span className="text-[12px] font-semibold text-gray-300">N/A</span>;
  const color =
    value >= 100
      ? "bg-emerald-500"
      : value >= 60
        ? "bg-violet-500"
        : value >= 30
          ? "bg-amber-400"
          : "bg-rose-400";
  const trackColor =
    value >= 100
      ? "bg-emerald-100"
      : value >= 60
        ? "bg-violet-100"
        : value >= 30
          ? "bg-amber-100"
          : "bg-rose-100";
  return (
    <div className="flex items-center gap-2.5 min-w-[110px]">
      <div className={`flex-1 h-2 rounded-full ${trackColor} overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
      <span className="text-[11px] font-black text-gray-600 tabular-nums w-8 text-right">
        {value}%
      </span>
    </div>
  );
}

// ─── Field type detector ──────────────────────────────────────────────────────

type FieldMeta = {
  label: string;
  value: string;
  type:
    | "id"
    | "text"
    | "date"
    | "number"
    | "status"
    | "boolean"
    | "url"
    | "email"
    | "object"
    | "array";
  icon: React.ReactNode;
};

function detectType(key: string, val: any): FieldMeta["type"] {
  if (val === null || val === undefined) return "text";
  if (typeof val === "boolean") return "boolean";
  if (typeof val === "object") return Array.isArray(val) ? "array" : "object";
  const k = key.toLowerCase();
  if (k === "id" || k === "_id" || k.endsWith("id") || k.endsWith("_id"))
    return "id";
  if (k.includes("email")) return "email";
  if (
    k.includes("url") ||
    k.includes("link") ||
    k.includes("image") ||
    k.includes("thumbnail")
  )
    return "url";
  if (k.includes("status") || k.includes("state")) return "status";
  if (
    k.includes("at") ||
    k.includes("date") ||
    k.includes("time") ||
    k.includes("created") ||
    k.includes("updated")
  ) {
    const d = new Date(String(val));
    if (!Number.isNaN(d.getTime())) return "date";
  }
  if (typeof val === "number") return "number";
  if (typeof val === "string" && /^\d+(\.\d+)?$/.test(val)) return "number";
  return "text";
}

function typeIcon(type: FieldMeta["type"]) {
  const cls = "h-3 w-3";
  switch (type) {
    case "id":
      return <Hash className={cls} />;
    case "date":
      return <Calendar className={cls} />;
    case "number":
      return <TrendingUp className={cls} />;
    case "status":
      return <Tag className={cls} />;
    default:
      return <Info className={cls} />;
  }
}

function typeBadge(type: FieldMeta["type"]) {
  const map: Record<string, string> = {
    id: "bg-violet-50 text-violet-600 border-violet-200",
    text: "bg-gray-50 text-gray-500 border-gray-200",
    date: "bg-blue-50 text-blue-600 border-blue-200",
    number: "bg-emerald-50 text-emerald-600 border-emerald-200",
    status: "bg-amber-50 text-amber-600 border-amber-200",
    boolean: "bg-pink-50 text-pink-600 border-pink-200",
    url: "bg-cyan-50 text-cyan-600 border-cyan-200",
    email: "bg-indigo-50 text-indigo-600 border-indigo-200",
    object: "bg-slate-100 text-slate-500 border-slate-200",
    array: "bg-orange-50 text-orange-600 border-orange-200",
  };
  const cls = map[type] ?? map.text;
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${cls}`}
    >
      {typeIcon(type)}
      {type}
    </span>
  );
}

function formatValue(type: FieldMeta["type"], val: any): string {
  if (val === null || val === undefined) return "—";
  if (type === "date") {
    const d = new Date(String(val));
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
  if (type === "boolean") return val ? "Yes" : "No";
  if (type === "array")
    return `[${(val as any[]).length} item${(val as any[]).length !== 1 ? "s" : ""}]`;
  if (type === "object") return "{object}";
  return String(val);
}

function flattenFields(raw: any, prefix = ""): FieldMeta[] {
  if (!raw || typeof raw !== "object") return [];
  const fields: FieldMeta[] = [];
  for (const [key, val] of Object.entries(raw)) {
    const label = prefix
      ? `${prefix} › ${key}`
      : key
          .replace(/([A-Z])/g, " $1")
          .replace(/[_-]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .trim();
    if (val && typeof val === "object" && !Array.isArray(val)) {
      fields.push(...flattenFields(val, prefix || key));
    } else {
      const type = detectType(key, val);
      fields.push({
        label,
        value: formatValue(type, val),
        type,
        icon: typeIcon(type),
      });
    }
  }
  return fields;
}

// ─── Details Modal — Mobile-First Professional ────────────────────────────────

function DetailsModal({
  course,
  onClose,
}: {
  course: UiCourse;
  onClose: () => void;
}) {
  const fields = useMemo(() => flattenFields(course.raw), [course.raw]);

  // Derive initials for avatar
  const initials = course.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet — slides up from bottom on mobile, centered on desktop */}
      <div
        className={[
          "fixed z-50 flex flex-col bg-white",
          // Mobile: full-width bottom sheet with top radius
          "bottom-0 left-0 right-0 rounded-t-3xl max-h-[92dvh]",
          // Desktop: centered modal
          "sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
          "sm:w-full sm:max-w-lg sm:rounded-2xl sm:max-h-[88vh]",
          "shadow-2xl overflow-hidden",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="px-5 pt-4 pb-4 sm:px-6 sm:pt-5 border-b border-gray-100 shrink-0">
          <div className="flex items-start justify-between gap-3">
            {/* Avatar + title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                <span className="text-white font-black text-[13px] tracking-wide">
                  {initials || "C"}
                </span>
              </div>
              <div className="min-w-0">
                <h2
                  id="modal-title"
                  className="text-[15px] sm:text-base font-extrabold text-gray-900 leading-snug line-clamp-2"
                >
                  {course.title}
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5 font-semibold">
                  Enrollment #{String(course.id)}
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close details"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 active:scale-95 transition-all shrink-0 mt-0.5"
            >
              <X size={16} />
            </button>
          </div>

          {/* Summary pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <StatusBadge status={course.status} />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border border-gray-200 bg-gray-50 text-gray-600 uppercase tracking-wider">
              <Calendar className="h-2.5 w-2.5 text-gray-400" />
              {course.enrolledAt}
            </span>
            {course.progress !== null && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border border-violet-200 bg-violet-50 text-violet-700 uppercase tracking-wider">
                <BarChart2 className="h-2.5 w-2.5" />
                {course.progress}% done
              </span>
            )}
          </div>

          {/* Progress visual if available */}
          {course.progress !== null && (
            <div className="mt-4 bg-gray-50 rounded-2xl px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Course Progress
                </span>
                <span className="text-[13px] font-black text-gray-800">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    course.progress >= 100
                      ? "bg-emerald-500"
                      : course.progress >= 60
                        ? "bg-violet-500"
                        : course.progress >= 30
                          ? "bg-amber-400"
                          : "bg-rose-400"
                  }`}
                  style={{ width: `${Math.min(100, course.progress)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Fields list */}
        <div className="overflow-y-auto flex-1 overscroll-contain px-4 py-3 sm:px-6 sm:py-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 px-1">
            All Fields · {fields.length} properties
          </p>

          <div className="space-y-0.5">
            {fields.map((f, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors">
                    {f.icon}
                  </div>
                  <span className="text-[12px] font-semibold text-gray-400 truncate">
                    {f.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 max-w-[55%]">
                  <span className="text-[12px] font-bold text-gray-800 text-right break-all leading-snug">
                    {f.value}
                  </span>
                  <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                    {typeBadge(f.type)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 sm:px-6 border-t border-gray-100 bg-gray-50/70 shrink-0 flex items-center justify-between gap-3">
          <p className="text-[11px] text-gray-400 font-medium hidden sm:block">
            Hover rows to see field types
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gray-900 text-white text-[12px] font-bold hover:bg-gray-700 active:scale-95 transition-all shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <p className="text-[15px] font-black text-gray-900 leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StudentCoursesManager() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState<UiCourse | null>(null);

  const { data, isFetching, isError } = useStudentMyCoursesQuery();

  const allItems = useMemo(() => {
    const rawList = extractList(data);
    return rawList.map(toUi).filter(Boolean) as UiCourse[];
  }, [data]);

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((c) =>
      `${c.title} ${c.status} ${c.id}`.toLowerCase().includes(q),
    );
  }, [allItems, search]);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  // Stats derived from all items
  const stats = useMemo(() => {
    const completed = allItems.filter(
      (c) => c.status.toLowerCase() === "completed",
    ).length;
    const active = allItems.filter(
      (c) => c.status.toLowerCase() === "active",
    ).length;
    const avgProgress =
      allItems.filter((c) => c.progress !== null).length > 0
        ? Math.round(
            allItems
              .filter((c) => c.progress !== null)
              .reduce((s, c) => s + (c.progress ?? 0), 0) /
              allItems.filter((c) => c.progress !== null).length,
          )
        : null;
    return { completed, active, avgProgress, total: allItems.length };
  }, [allItems]);

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-gray-50 min-h-screen pb-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ">
        {/* ── Premium Header ───────────────────────────────────────────── */}
        <div className="mb-6 sm:mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
            {/* Decorative gradient bar at top */}
            <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />

            {/* Subtle background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-violet-50 opacity-60 translate-x-32 -translate-y-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-indigo-50 opacity-50 -translate-x-24 translate-y-24 pointer-events-none" />

            <div className="relative px-5 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* Left: Title + Stats */}
                <div className="flex-1 min-w-0">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 mb-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-600">
                      Student Dashboard
                    </span>
                  </div>

                  {/* Heading row */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200 shrink-0">
                      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 leading-none">
                        My Courses
                      </h1>
                      <p className="text-[12px] text-gray-400 font-medium mt-0.5">
                        Track your learning journey
                      </p>
                    </div>
                  </div>

                  {/* Stats row */}
                  {!isFetching && allItems.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                      <StatCard
                        icon={<Layers className="h-4 w-4 text-violet-600" />}
                        label="Total"
                        value={stats.total}
                        color="bg-violet-50"
                      />
                      <StatCard
                        icon={<BookOpen className="h-4 w-4 text-blue-600" />}
                        label="Active"
                        value={stats.active}
                        color="bg-blue-50"
                      />
                      <StatCard
                        icon={
                          <BarChart2 className="h-4 w-4 text-emerald-600" />
                        }
                        label="Avg Progress"
                        value={
                          stats.avgProgress !== null
                            ? `${stats.avgProgress}%`
                            : "—"
                        }
                        color="bg-emerald-50"
                      />
                    </div>
                  )}
                </div>

                {/* Right: Search */}
                <div className="lg:w-96 xl:w-[420px] shrink-0">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Search Courses
                  </label>
                  <div className="flex h-11 items-center rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 transition-all duration-200 focus-within:border-violet-400 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-violet-100/50">
                    <Search className="h-4 w-4 text-gray-400 shrink-0" />
                    <input
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Search by title, status, ID…"
                      className="ml-3 flex-1 bg-transparent text-[13px] font-medium text-gray-700 placeholder:text-gray-400 outline-none"
                    />
                    {search && (
                      <button
                        onClick={() => {
                          setSearch("");
                          setPage(1);
                        }}
                        aria-label="Clear search"
                        className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors shrink-0"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                  {search && (
                    <p className="mt-2 text-[11px] text-gray-400 font-medium">
                      Showing{" "}
                      <span className="font-bold text-violet-600">
                        {items.length}
                      </span>{" "}
                      result{items.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table Card ───────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-5 py-4 sm:px-6 border-b border-gray-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-violet-600" />
              </div>
              <div>
                <span className="text-[13px] font-extrabold text-gray-800">
                  Enrolled Courses
                </span>
                {!isFetching && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-violet-100 text-[10px] font-black text-violet-700">
                    {items.length}
                  </span>
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => canPrev && setPage((p) => p - 1)}
                disabled={!canPrev}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-[11px] font-bold text-gray-500 px-1.5 tabular-nums">
                {page}/{totalPages}
              </span>
              <button
                onClick={() => canNext && setPage((p) => p + 1)}
                disabled={!canNext}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── Desktop Table ── */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  {[
                    { label: "#", w: "w-10" },
                    { label: "Course Title", w: "" },
                    { label: "Status", w: "w-32" },
                    { label: "Progress", w: "w-44" },
                    { label: "Enrolled", w: "w-36" },
                    { label: "", w: "w-14" },
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap ${h.w}`}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isFetching ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="inline-flex items-center gap-2.5 text-[12px] font-semibold text-gray-400">
                        <Loader2 className="h-4 w-4 animate-spin text-violet-500" />
                        Loading your courses…
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                          <X className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-[12px] font-bold text-red-500">
                          Failed to load courses
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Please try refreshing the page
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : paged.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-gray-200" />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-gray-500">
                            No courses found
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">
                            {search
                              ? "Try a different search term"
                              : "You haven't enrolled in any courses yet"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paged.map((c, idx) => (
                    <tr
                      key={String(c.id)}
                      onClick={() => setDetails(c)}
                      className="hover:bg-violet-50/30 transition-colors cursor-pointer group"
                    >
                      {/* Row number */}
                      <td className="px-5 py-4">
                        <span className="text-[11px] font-black text-gray-300">
                          {String((page - 1) * PAGE_SIZE + idx + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      </td>
                      {/* Title */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center shrink-0">
                            <GraduationCap className="h-3.5 w-3.5 text-violet-500" />
                          </div>
                          <span className="text-[13px] font-bold text-gray-900 group-hover:text-violet-700 transition-colors line-clamp-1">
                            {c.title}
                          </span>
                        </div>
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      {/* Progress */}
                      <td className="px-5 py-4">
                        <ProgressBar value={c.progress} />
                      </td>
                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1.5">
                          <Clock className="h-3 w-3 shrink-0" />
                          {c.enrolledAt}
                        </span>
                      </td>
                      {/* Action */}
                      <td className="px-5 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetails(c);
                          }}
                          aria-label={`View details for ${c.title}`}
                          className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white hover:border-violet-600 active:scale-95 transition-all shadow-sm"
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Card List ── */}
          <div className="sm:hidden divide-y divide-gray-50">
            {isFetching ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                <p className="text-[12px] font-semibold text-gray-400">
                  Loading…
                </p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <X className="h-6 w-6 text-red-400" />
                <p className="text-[12px] font-bold text-red-500">
                  Failed to load
                </p>
              </div>
            ) : paged.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <BookOpen className="h-8 w-8 text-gray-200" />
                <p className="text-[12px] font-bold text-gray-400">
                  {search ? "No results found" : "No courses yet"}
                </p>
              </div>
            ) : (
              paged.map((c) => (
                <div
                  key={String(c.id)}
                  onClick={() => setDetails(c)}
                  className="flex items-start gap-3 px-4 py-4 hover:bg-violet-50/30 active:bg-violet-50 cursor-pointer transition-colors group"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="h-4.5 w-4.5 text-violet-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-bold text-gray-900 group-hover:text-violet-700 leading-snug line-clamp-2 transition-colors">
                        {c.title}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetails(c);
                        }}
                        aria-label={`View details for ${c.title}`}
                        className="w-7 h-7 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white hover:border-violet-600 active:scale-95 transition-all shrink-0"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <StatusBadge status={c.status} />
                      <span className="text-[10px] font-semibold text-gray-400 flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {c.enrolledAt}
                      </span>
                    </div>

                    {c.progress !== null && (
                      <div className="mt-2.5">
                        <ProgressBar value={c.progress} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {!isFetching && paged.length > 0 && (
            <div className="px-5 py-3 sm:px-6 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <p className="text-[11px] text-gray-400 font-medium">
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, items.length)} of {items.length}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => canPrev && setPage((p) => p - 1)}
                  disabled={!canPrev}
                  className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-bold text-gray-600 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </button>
                <button
                  onClick={() => canNext && setPage((p) => p + 1)}
                  disabled={!canNext}
                  className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-bold text-gray-600 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {details && (
        <DetailsModal course={details} onClose={() => setDetails(null)} />
      )}
    </div>
  );
}
