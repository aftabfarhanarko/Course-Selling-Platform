"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useStudentMyCoursesQuery } from "@/lib/api/student/courses";

type UiCourse = {
  id: number | string;
  title: string;
  status: string;
  progress: number | null;
  enrolledAt: string;
  raw: any;
};

const PAGE_SIZE = 10;

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

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function StudentCoursesManager() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState<UiCourse | null>(null);

  const { data, isFetching, isError } = useStudentMyCoursesQuery();

  const items = useMemo(() => {
    const rawList = extractList(data);
    const mapped = rawList.map(toUi).filter(Boolean) as UiCourse[];

    const q = search.trim().toLowerCase();
    if (!q) return mapped;

    return mapped.filter((c) => {
      const hay = `${c.title} ${c.status} ${c.id}`.toLowerCase();
      return hay.includes(q);
    });
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  return (
    <div className="w-full bg-slate-50/50 dark:bg-zinc-950 min-h-screen pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
              Student
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              My Courses
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
              GET /enrollments/my-courses
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 w-full sm:w-[420px]">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search courses..."
              className="w-full text-[12px] font-semibold text-gray-700 dark:text-zinc-200 placeholder:text-gray-400 outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] font-bold text-gray-700 dark:text-zinc-200">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              Enrollments
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => canPrev && setPage((p) => p - 1)}
                disabled={!canPrev}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-[12px] font-bold text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-900 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <div className="text-[12px] font-bold text-gray-700 dark:text-zinc-200">
                Page {page} / {totalPages}
              </div>
              <button
                onClick={() => canNext && setPage((p) => p + 1)}
                disabled={!canNext}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-[12px] font-bold text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-900 disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-950">
                <tr>
                  {["Course", "Status", "Progress", "Enrolled", ""].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-zinc-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                {isFetching ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-14 text-center">
                      <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-gray-500 dark:text-zinc-400">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-red-600"
                    >
                      Failed to load my courses
                    </td>
                  </tr>
                ) : paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-14 text-center text-[12px] font-semibold text-gray-500 dark:text-zinc-400"
                    >
                      No courses found
                    </td>
                  </tr>
                ) : (
                  paged.map((c) => (
                    <tr
                      key={String(c.id)}
                      className="hover:bg-gray-50/60 dark:hover:bg-zinc-950/40 transition-colors"
                    >
                      <td className="px-4 py-3 text-[12px] font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        {c.title}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-700 dark:text-zinc-200 whitespace-nowrap">
                        {c.status}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-700 dark:text-zinc-200 whitespace-nowrap">
                        {c.progress === null ? "—" : `${c.progress}%`}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-gray-600 dark:text-zinc-400 whitespace-nowrap">
                        {c.enrolledAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => setDetails(c)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-900"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {details ? (
        <ModalShell
          title="Enrollment Details"
          subtitle="Raw API response item"
          onClose={() => setDetails(null)}
        >
          <pre className="text-[11px] text-gray-700 dark:text-zinc-200 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-3 overflow-auto max-h-[520px]">
            {JSON.stringify(details.raw ?? null, null, 2)}
          </pre>
        </ModalShell>
      ) : null}
    </div>
  );
}
