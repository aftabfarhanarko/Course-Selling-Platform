// utils.ts
import { Role, Status, UiUser, bgPalette } from "./types";

export function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function pickPalette(name: string) {
  return bgPalette[(name.trim().charCodeAt(0) || 0) % bgPalette.length];
}

export function formatDate(value: unknown) {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function normalizeUrl(value: unknown): string | null {
  const v = String(value ?? "")
    .trim()
    .replace(/^[`"']+|[`"']+$/g, "")
    .trim();
  return v.length ? v : null;
}

export function normalizeRole(value: unknown): Role {
  const v = String(value ?? "")
    .trim()
    .toLowerCase();
  if (v === "admin" || v === "superadmin" || v === "super_admin")
    return "Admin";
  if (v === "instructor" || v === "teacher") return "Instructor";
  return "Student";
}

export function normalizeStatus(user: any): Status {
  if (
    Boolean(user?.isDeleted) ||
    Boolean(user?.deletedAt) ||
    user?.status === "deleted"
  )
    return "Deleted";
  if (
    Boolean(user?.isBanned) ||
    Boolean(user?.banned) ||
    Boolean(user?.isSuspended) ||
    user?.status === "banned" ||
    user?.status === "suspended"
  )
    return "Suspended";
  return "Active";
}

export function extractUsers(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  for (const p of [
    payload?.items,
    payload?.users,
    payload?.data,
    payload?.data?.items,
    payload?.data?.users,
    payload?.data?.data,
    payload?.data?.data?.items,
    payload?.data?.data?.users,
  ]) {
    if (Array.isArray(p)) return p;
  }
  return [];
}

export function toUiUser(raw: any): UiUser | null {
  const id = raw?.id ?? raw?._id ?? raw?.userId ?? null;
  const name = String(raw?.name ?? raw?.fullName ?? raw?.username ?? "").trim();
  const email = String(raw?.email ?? "").trim();
  if (!id || !name || !email) return null;

  const palette = pickPalette(name);
  const deletedAtRaw = raw?.deletedAt ?? raw?.deleted_at ?? null;
  return {
    id,
    name,
    email,
    role: normalizeRole(raw?.role),
    status: normalizeStatus(raw),
    joinDate: formatDate(raw?.createdAt ?? raw?.created_at ?? raw?.joinDate),
    phone: raw?.phone?.trim() || undefined,
    country: raw?.country?.trim() || undefined,
    isActive: Boolean(raw?.isActive ?? raw?.active ?? true),
    isBanned: Boolean(raw?.isBanned ?? raw?.banned ?? false),
    deletedAt: deletedAtRaw ? formatDate(deletedAtRaw) : null,
    banReason: raw?.banReason?.trim() || undefined,
    referCode: raw?.referCode?.trim() || undefined,
    telegram: raw?.telegram?.trim() || undefined,
    whatsapp: raw?.whatsapp?.trim() || undefined,
    nidFrontSide: normalizeUrl(raw?.nidFrontSide) ?? undefined,
    nidBackSide: normalizeUrl(raw?.nidBackSide) ?? undefined,
    photoUrl:
      normalizeUrl(raw?.photo) ??
      normalizeUrl(raw?.photoUrl) ??
      normalizeUrl(raw?.avatar) ??
      normalizeUrl(raw?.image) ??
      undefined,
    avatar: initials(name),
    avatarBg: palette.bg,
    avatarColor: palette.color,
  };
}
