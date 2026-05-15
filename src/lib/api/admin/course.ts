import { baseApi } from "../baseApi";

export type AdminCategory = Record<string, any>;

export type AdminCategoriesListResponse = Record<string, any>;
export type AdminCategoryResponse = Record<string, any>;

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
    adminCategories: build.query<AdminCategoriesListResponse, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
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
} = adminCourseApi;

