// CategoryTable.tsx
import {
  Eye,
  FolderOpen,
  ImageIcon,
  Loader2,
  Pencil,
  RotateCcw,
  Star,
  Trash2,
} from "lucide-react";
import { UiCategory } from "./types";
import { ActionBtn } from "./ActionBtn";

export function CategoryTable({
  isLoading,
  isError,
  categories,
  onView,
  onEdit,
  onRestore,
  onDelete,
}: {
  isLoading: boolean;
  isError: boolean;
  categories: UiCategory[];
  onView: (cat: UiCategory) => void;
  onEdit: (cat: UiCategory) => void;
  onRestore: (cat: UiCategory) => void;
  onDelete: (cat: UiCategory) => void;
}) {
  return (
    <table className="w-full min-w-[580px]">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          {["Category", "Slug", "Created", "Status", "Actions"].map((h) => (
            <th
              key={h}
              className="text-left text-[9px] font-black text-gray-400 uppercase tracking-widest px-4 py-3.5"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {isLoading ? (
          <tr>
            <td colSpan={5} className="px-4 py-16">
              <div className="flex items-center justify-center gap-2 text-[12px] text-gray-400 font-semibold">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />{" "}
                Loading categories…
              </div>
            </td>
          </tr>
        ) : isError ? (
          <tr>
            <td
              colSpan={5}
              className="px-4 py-16 text-center text-[12px] text-red-500 font-bold"
            >
              Failed to load categories
            </td>
          </tr>
        ) : categories.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-4 py-16">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <FolderOpen size={24} className="text-gray-300" />
                </div>
                <p className="text-[12px] font-semibold">No categories found</p>
              </div>
            </td>
          </tr>
        ) : (
          categories.map((c) => (
            <tr
              key={String(c.id)}
              className="hover:bg-indigo-50/20 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {c.photo ? (
                    <img
                      src={c.photo}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <ImageIcon size={15} className="text-indigo-300" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[12px] font-black text-gray-900 truncate flex items-center gap-1.5">
                      {c.name}
                      {c.metadata?.is_featured && (
                        <Star
                          size={10}
                          className="text-amber-400 fill-amber-400 shrink-0"
                        />
                      )}
                    </p>
                    {c.description && (
                      <p className="text-[10px] text-gray-400 truncate max-w-[200px]">
                        {c.description}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-[11px] font-mono text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">
                  {c.slug || "—"}
                </span>
              </td>
              <td className="px-4 py-3 text-[11px] text-gray-500 whitespace-nowrap">
                {c.createdAt ?? "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    c.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      c.status === "Active" ? "bg-emerald-500" : "bg-red-400"
                    }`}
                  />
                  {c.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <ActionBtn
                    onClick={() => onView(c)}
                    title="View Details"
                    color="gray"
                  >
                    <Eye size={13} />
                  </ActionBtn>
                  <ActionBtn
                    onClick={() => onEdit(c)}
                    title="Edit"
                    color="indigo"
                  >
                    <Pencil size={13} />
                  </ActionBtn>
                  {c.status === "Deleted" ? (
                    <ActionBtn
                      onClick={() => onRestore(c)}
                      title="Restore"
                      color="amber"
                    >
                      <RotateCcw size={13} />
                    </ActionBtn>
                  ) : (
                    <ActionBtn
                      onClick={() => onDelete(c)}
                      title="Delete"
                      color="red"
                    >
                      <Trash2 size={13} />
                    </ActionBtn>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
