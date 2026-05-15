import { baseApi } from "../baseApi";

export type ProductListQuery = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type AdminProductsResponse = Record<string, any>;
export type AdminProductResponse = Record<string, any>;

export type AdminCreateProductRequest = Record<string, any>;

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

export const adminProductsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminProducts: build.query<AdminProductsResponse, ProductListQuery | void>({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/products${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Course"],
    }),
    adminMyProducts: build.query<AdminProductsResponse, ProductListQuery | void>({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/products/my${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Course"],
    }),
    adminCreateProduct: build.mutation<AdminProductResponse, AdminCreateProductRequest>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    adminApproveProduct: build.mutation<AdminProductResponse, number | string>({
      query: (id) => ({
        url: `/products/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["Course"],
    }),
    adminDeleteProduct: build.mutation<AdminProductResponse, number | string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminProductsQuery,
  useLazyAdminProductsQuery,
  useAdminMyProductsQuery,
  useLazyAdminMyProductsQuery,
  useAdminCreateProductMutation,
  useAdminApproveProductMutation,
  useAdminDeleteProductMutation,
} = adminProductsApi;
