import { baseApi, toQueryString } from "../baseApi";

export type PercentageListQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export type Percentage = {
  id: number | string;
  percentage: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminPercentagesResponse = Record<string, unknown>;
export type AdminPercentageResponse = Record<string, unknown>;

export type AdminCreatePercentageRequest = {
  percentage: number;
  name?: string;
};

export type AdminUpdatePercentageRequest = Partial<AdminCreatePercentageRequest>;

export const adminPercentageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminPercentages: build.query<
      AdminPercentagesResponse,
      PercentageListQuery | void
    >({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/percentage${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Percentage"],
    }),
    adminPercentage: build.query<AdminPercentageResponse, number | string>({
      query: (id) => ({
        url: `/percentage/${id}`,
        method: "GET",
      }),
      providesTags: ["Percentage"],
    }),
    adminCreatePercentage: build.mutation<
      AdminPercentageResponse,
      AdminCreatePercentageRequest
    >({
      query: (body) => ({
        url: "/percentage",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Percentage"],
    }),
    adminUpdatePercentage: build.mutation<
      AdminPercentageResponse,
      { id: number | string; body: AdminUpdatePercentageRequest }
    >({
      query: ({ id, body }) => ({
        url: `/percentage/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Percentage"],
    }),
    adminDeletePercentage: build.mutation<
      AdminPercentageResponse,
      number | string
    >({
      query: (id) => ({
        url: `/percentage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Percentage"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminPercentagesQuery,
  useLazyAdminPercentagesQuery,
  useAdminPercentageQuery,
  useLazyAdminPercentageQuery,
  useAdminCreatePercentageMutation,
  useAdminUpdatePercentageMutation,
  useAdminDeletePercentageMutation,
} = adminPercentageApi;
