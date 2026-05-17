// utils.ts
import { Status, UiInstructor } from "./types";

export function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

export function normalizeStatus(raw: any): Status {
  const deleted = Boolean(raw?.deletedAt) || Boolean(raw?.user?.deletedAt);
  if (deleted) return "Deleted";
  if (raw?.isActive === false) return "Inactive";
  return "Active";
}

export function extractInstructors(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.instructors))
    return payload.data.instructors;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.instructors)) return payload.instructors;
  return [];
}

export function extractTotal(payload: any): number | null {
  const candidates = [
    payload?.data?.total,
    payload?.data?.meta?.total,
    payload?.meta?.total,
    payload?.total,
  ];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

export function toUiInstructor(raw: any): UiInstructor | null {
  const u = raw?.user ?? raw;
  const id = raw?.id ?? raw?._id ?? null;
  const name = String(u?.name ?? u?.fullName ?? u?.username ?? "").trim();
  const email = String(u?.email ?? "").trim();
  if (!id || !name || !email) return null;

  const meta = raw?.metadata ?? {};
  const skills: string[] = Array.isArray(meta?.skills) ? meta.skills : [];
  const socialLinks = meta?.social_links ?? {};

  return {
    id,
    name,
    email,
    phone: u?.phone?.trim() || undefined,
    country: u?.country?.trim() || undefined,
    photo: u?.photo?.trim() || undefined,
    role: u?.role ?? undefined,
    designation: raw?.designation?.trim() || undefined,
    experience: raw?.experience?.trim() || undefined,
    bio: raw?.bio?.trim() || undefined,
    skills,
    website: meta?.website?.trim() || undefined,
    github: socialLinks?.github?.trim() || undefined,
    linkedin: socialLinks?.linkedin?.trim() || undefined,
    isActive: raw?.isActive !== false,
    status: normalizeStatus(raw),
    joinDate: formatDate(u?.createdAt ?? raw?.createdAt),
    raw,
  };
}
