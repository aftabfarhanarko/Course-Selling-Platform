import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { UiCourse } from "./types";

type Props = {
  isLoading: boolean;
  isError: boolean;
  courses: UiCourse[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onView: (id: number | string) => void;
  onEdit: (course: UiCourse) => void;
  onDelete: (course: UiCourse) => void;
};

export default function AdminCourseTable({
  isLoading,
  isError,
  courses,
  page,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const safePage = Math.min(page, totalPages);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              {["Name", "Category", "Created", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10">
                  <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading courses...
                  </div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-[12px] text-red-500 font-semibold"
                >
                  Failed to load courses
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-[12px] text-gray-400"
                >
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr
                  key={String(c.id)}
                  className="hover:bg-indigo-50/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-[12px] font-bold text-gray-900 truncate">
                        {c.name}
                      </p>
                      {c.description && (
                        <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                          {c.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] font-medium text-indigo-700">
                    {c.categoryName}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-500">
                    {c.createdAt ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        c.status === "Active"
                          ? "inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"
                          : "inline-flex items-center gap-1.5 text-[12px] font-semibold text-amber-600"
                      }
                    >
                      <span
                        className={
                          c.status === "Active"
                            ? "w-1.5 h-1.5 rounded-full bg-emerald-500"
                            : "w-1.5 h-1.5 rounded-full bg-amber-500"
                        }
                      />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(c.id)}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                        title="Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onEdit(c)}
                        className="p-2 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(c)}
                        className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-[11px] text-gray-400 font-semibold">
          Page <span className="text-gray-700">{safePage}</span> of{" "}
          <span className="text-gray-700">{totalPages}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}