import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { UiCourse } from "./types";
import ModalShell from "./ModalShell";

type Props = {
  initial?: UiCourse | null;
  categories: { id: number | string; name: string }[];
  loading: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    name: string;
    description?: string;
    categoryId: string;
  }) => void;
};

export default function CourseFormModal({
  initial,
  categories,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId ? String(initial.categoryId) : ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Course name is required";
    if (!categoryId) e.categoryId = "Please select a category";
    return e;
  };

  const submit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
      categoryId,
    });
  };

  return (
    <ModalShell
      title={initial ? "Edit Course" : "Create Course"}
      subtitle={initial ? "PATCH /course/:id" : "POST /course"}
      loading={loading}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
              errors.categoryId ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          >
            <option value="" disabled>Select a category...</option>
            {categories.map((cat) => (
              <option key={String(cat.id)} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-[10px] text-red-500 mt-1">{errors.categoryId}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full h-9 px-3 text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
              errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            Description{" "}
            <span className="text-gray-300 normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[90px] px-3 py-2 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={13} />}
            {initial ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}