// CreateInstructorModal.tsx
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { ModalShell } from "./ModalShell";
import { FormField, inputCls } from "./FormField";
import { CreatePayload } from "./types";

export function CreateInstructorModal({
  loading,
  onClose,
  onSubmit,
}: {
  loading: boolean;
  onClose: () => void;
  onSubmit: (payload: CreatePayload) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    designation: "",
    experience: "",
    bio: "",
    website: "",
    skills: "",
    github: "",
    linkedin: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password.trim()) e.password = "Password is required";
    return e;
  };

  const submit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const skillsArr = form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      phone: form.phone.trim() || undefined,
      country: form.country.trim() || undefined,
      designation: form.designation.trim() || undefined,
      experience: form.experience.trim() || undefined,
      bio: form.bio.trim() || undefined,
      metadata: {
        website: form.website.trim() || undefined,
        skills: skillsArr.length > 0 ? skillsArr : undefined,
        social_links: {
          github: form.github.trim() || undefined,
          linkedin: form.linkedin.trim() || undefined,
        },
      },
    });
  };

  return (
    <ModalShell
      title="Create Instructor"
      subtitle="POST /instructor"
      loading={loading}
      onClose={onClose}
      wide
    >
      <div className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Name" error={errors.name}>
            <input
              value={form.name}
              onChange={set("name")}
              className={inputCls(errors.name)}
              placeholder="Full name"
            />
          </FormField>
          <FormField label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              className={inputCls(errors.email)}
              placeholder="email@example.com"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Password" error={errors.password}>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              className={inputCls(errors.password)}
              placeholder="Min. 8 characters"
            />
          </FormField>
          <FormField label="Phone" optional>
            <input
              value={form.phone}
              onChange={set("phone")}
              className={inputCls()}
              placeholder="+880..."
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Country" optional>
            <input
              value={form.country}
              onChange={set("country")}
              className={inputCls()}
              placeholder="Bangladesh"
            />
          </FormField>
          <FormField label="Designation" optional>
            <input
              value={form.designation}
              onChange={set("designation")}
              className={inputCls()}
              placeholder="Senior Engineer"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Experience" optional>
            <input
              value={form.experience}
              onChange={set("experience")}
              className={inputCls()}
              placeholder="e.g. 5 Years"
            />
          </FormField>
          <FormField label="Website" optional>
            <input
              value={form.website}
              onChange={set("website")}
              className={inputCls()}
              placeholder="https://..."
            />
          </FormField>
        </div>

        <FormField label="Skills" optional>
          <input
            value={form.skills}
            onChange={set("skills")}
            className={inputCls()}
            placeholder="Node.js, React, NestJS (comma-separated)"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="GitHub" optional>
            <input
              value={form.github}
              onChange={set("github")}
              className={inputCls()}
              placeholder="https://github.com/..."
            />
          </FormField>
          <FormField label="LinkedIn" optional>
            <input
              value={form.linkedin}
              onChange={set("linkedin")}
              className={inputCls()}
              placeholder="https://linkedin.com/in/..."
            />
          </FormField>
        </div>

        <FormField label="Bio" optional>
          <textarea
            value={form.bio}
            onChange={set("bio")}
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] sm:text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            placeholder="Short biography..."
          />
        </FormField>

        <div className="flex gap-2.5 pt-1 pb-safe">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 sm:py-2.5 rounded-xl border-2 border-gray-200 text-[13px] sm:text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-3 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] sm:text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={13} />
            )}
            Create
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
