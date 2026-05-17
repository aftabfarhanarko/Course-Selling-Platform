// utils.ts
import { Status, UiCategory } from "./types";

export function extractItems(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data?.categories)) return payload.data.categories;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload)) return payload;
  return [];
}

export function extractMeta(payload: any) {
  const m =
    payload?.data?.meta ??
    payload?.meta ??
    payload?.data?.pagination ??
    payload?.pagination ??
    {};
  return {
    total: Number(m.total ?? 0) || 0,
    page: Number(m.page ?? 1) || 1,
    limit: Number(m.limit ?? 10) || 10,
    totalPages: Number(m.totalPages ?? m.total_pages ?? 1) || 1,
  };
}

export function normalizeStatus(raw: any): Status {
  if (raw?.deletedAt !== null && raw?.deletedAt !== undefined) return "Deleted";
  if (raw?.isActive === false) return "Deleted";
  if (String(raw?.status ?? "").toLowerCase() === "deleted") return "Deleted";
  return "Active";
}

export function formatDate(value: unknown): string | undefined {
  if (!value) return undefined;
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function normalizeCategory(raw: any): UiCategory | null {
  const id = raw?.id ?? raw?._id ?? null;
  const name = String(raw?.name ?? raw?.title ?? "").trim();
  if (!id || !name) return null;
  return {
    id,
    name,
    slug: String(raw?.slug ?? "").trim(),
    description:
      typeof raw?.description === "string" && raw.description.trim()
        ? raw.description.trim()
        : undefined,
    photo: raw?.photo ?? undefined,
    isActive: raw?.isActive !== false && !raw?.deletedAt,
    status: normalizeStatus(raw),
    metadata: raw?.metadata ?? undefined,
    createdAt: formatDate(raw?.createdAt ?? raw?.created_at),
  };
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}