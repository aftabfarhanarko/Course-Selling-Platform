import { baseApi } from "../baseApi";

export type AdminCategory = Record<string, any>;

export type AdminCategoriesListResponse = Record<string, any>;
export type AdminCategoryResponse = Record<string, any>;

export type CategoryListQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export type AdminCreateCategoryRequest = {
  name: string;
  description?: string;
};

export type AdminUpdateCategoryRequest = {
  id: number | string;
  name?: string;
  description?: string;
};

function toQueryString(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(([, v]) => {
    if (v === undefined || v === null) return false;
    if (typeof v === "string") return v.trim().length > 0;
    if (typeof v === "number") return Number.isFinite(v);
    return true;
  });

  if (entries.length === 0) return "";

  const qs = entries
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");

  return `?${qs}`;
}

export const adminCourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminCategories: build.query<
      AdminCategoriesListResponse,
      CategoryListQuery | void
    >({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/category${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Course"],
    }),
    adminCategory: build.query<AdminCategoryResponse, number | string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    adminCreateCategory: build.mutation<
      AdminCategoryResponse,
      AdminCreateCategoryRequest
    >({
      query: (body) => ({
        url: "/category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    adminUpdateCategory: build.mutation<
      AdminCategoryResponse,
      AdminUpdateCategoryRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    adminRestoreCategory: build.mutation<AdminCategoryResponse, number | string>({
      query: (id) => ({
        url: `/category/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["Course"],
    }),
    adminDeleteCategory: build.mutation<AdminCategoryResponse, number | string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminCategoriesQuery,
  useLazyAdminCategoriesQuery,
  useAdminCategoryQuery,
  useLazyAdminCategoryQuery,
  useAdminCreateCategoryMutation,
  useAdminUpdateCategoryMutation,
  useAdminRestoreCategoryMutation,
  useAdminDeleteCategoryMutation,
} = adminCourseApi;

