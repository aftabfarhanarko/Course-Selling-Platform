import { baseApi, toQueryString } from "../baseApi";

export type ProductListQuery = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type AdminProductsResponse = Record<string, any>;
export type AdminProductResponse = Record<string, any>;

export type AdminCreateProductRequest = Record<string, any>;

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
      providesTags: ["Product"],
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
      providesTags: ["Product"],
    }),
    adminProduct: build.query<AdminProductResponse, number | string>({
      query: (id) => ({
        url: "/products/" + id,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    adminCreateProduct: build.mutation<
      AdminProductResponse,
      AdminCreateProductRequest
    >({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    adminApproveProduct: build.mutation<AdminProductResponse, number | string>({
      query: (id) => ({
        url: `/products/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    adminRejectProduct: build.mutation<AdminProductResponse, { id: number | string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/products/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Product"],
    }),
    adminDeleteProduct: build.mutation<AdminProductResponse, number | string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminProductsQuery,
  useLazyAdminProductsQuery,
  useAdminMyProductsQuery,
  useLazyAdminMyProductsQuery,
  useAdminProductQuery,
  useLazyAdminProductQuery,
  useAdminCreateProductMutation,
  useAdminApproveProductMutation,
  useAdminRejectProductMutation,
  useAdminDeleteProductMutation,
} = adminProductsApi;




