// components/admin/users/CreateModal.tsx
import React, { useState } from "react";
import { UserPlus, X, Check, Loader2 } from "lucide-react";
import { Role } from "./types";

export function CreateModal({
  loading,
  onClose,
  onCreate,
}: {
  loading: boolean;
  onClose: () => void;
  onCreate: (p: {
    name: string;
    email: string;
    phone: string;
    country: string;
    password: string;
    photo?: string | null;
    role?: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    photo: "",
    role: "Student" as Role,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.country.trim()) e.country = "Required";
    if (form.password.trim().length < 6) e.password = "Min 6 characters";
    setErrors(e);
    if (Object.keys(e).length) return;
    onCreate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      country: form.country.trim(),
      password: form.password.trim(),
      photo: form.photo.trim() || null,
      role: form.role.toLowerCase(),
    });
  };

  const Field = ({
    label,
    fkey,
    type = "text",
    placeholder = "",
  }: {
    label: string;
    fkey: keyof typeof form;
    type?: string;
    placeholder?: string;
  }) => (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        value={form[fkey]}
        onChange={set(fkey)}
        type={type}
        placeholder={placeholder}
        className={`w-full h-10 px-3 text-[13px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all ${errors[fkey] ? "border-red-400 bg-red-50" : "border-gray-200"}`}
      />
      {errors[fkey] && (
        <p className="text-[10px] text-red-500 mt-1">{errors[fkey]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-md bg-white sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <UserPlus size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-gray-900">
                Add New User
              </h2>
              <p className="text-[11px] text-gray-400">POST /auth/register</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-5 py-4 space-y-3 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Full Name" fkey="name" />
            <Field label="Email" fkey="email" />
            <Field label="Phone" fkey="phone" />
            <Field label="Country" fkey="country" />
            <Field label="Password" fkey="password" type="password" />
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Role
              </label>
              <select
                value={form.role}
                onChange={set("role")}
                className="w-full h-10 px-3 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
              >
                <option>Student</option>
                <option>Instructor</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          <Field
            label="Photo URL (optional)"
            fkey="photo"
            placeholder="https://..."
          />
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-[13px] font-bold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
