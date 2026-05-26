import { Status, UiCourse } from "./types";

export function extractCourses(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.courses)) return payload.courses;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.courses)) return payload.data.courses;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

export function extractCategories(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.categories)) return payload.data.categories;
  return [];
}

export function normalizeStatus(raw: any): Status {
  const deleted =
    Boolean(raw?.isDeleted) ||
    Boolean(raw?.deletedAt) ||
    String(raw?.status ?? "").toLowerCase() === "deleted";
  return deleted ? "Deleted" : "Active";
}

export function normalizeCourse(
  raw: any,
  categoryMap: Map<number | string, string>,
): UiCourse | null {
  const id = raw?.id ?? raw?._id ?? raw?.courseId ?? null;
  const name = String(raw?.name ?? raw?.title ?? "").trim();
  if (!id || !name) return null;

  const description =
    typeof raw?.description === "string" && raw.description.trim().length > 0
      ? raw.description.trim()
      : undefined;

  const categoryId =
    raw?.categoryId ?? raw?.category_id ?? raw?.category?.id ?? null;
  const categoryName = categoryId
    ? (categoryMap.get(String(categoryId)) ?? "Unknown")
    : "No category";

  const createdAtRaw = raw?.createdAt ?? raw?.created_at ?? null;
  const createdAt =
    createdAtRaw && !Number.isNaN(new Date(String(createdAtRaw)).getTime())
      ? new Date(String(createdAtRaw)).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : undefined;

  return {
    id,
    name,
    description,
    categoryId,
    categoryName,
    status: normalizeStatus(raw),
    createdAt,
    price: raw?.price,
    discountPrice: raw?.discountPrice,
    enrollmentCount: raw?.enrollmentCount,
    isPublished: raw?.isPublished,
    instructorName: raw?.instructor?.name,
    instructorId: raw?.instructor?.id ?? raw?.instructorId,
    courseUrl: raw?.courseUrl,
    level: raw?.metadata?.level,
    is_premium: raw?.metadata?.is_premium,
    thumbnail: raw?.thumbnail,
  };
}