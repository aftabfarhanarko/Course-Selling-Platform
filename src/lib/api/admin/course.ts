import { baseApi, toQueryString } from "../baseApi";

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
      providesTags: ["Category"],
    }),
    adminCategory: build.query<AdminCategoryResponse, number | string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
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
      invalidatesTags: ["Category"],
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
      invalidatesTags: ["Category"],
    }),
    adminRestoreCategory: build.mutation<AdminCategoryResponse, number | string>({
      query: (id) => ({
        url: `/category/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["Category"],
    }),
    adminDeleteCategory: build.mutation<AdminCategoryResponse, number | string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
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
