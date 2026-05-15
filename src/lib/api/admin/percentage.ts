import { baseApi } from "../baseApi";

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

export type AdminUpdatePercentageRequest =
  Partial<AdminCreatePercentageRequest>;

function toQueryString(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(([, v]) => {
    if (v === undefined || v === null) return false;
    if (typeof v === "string") return v.trim().length > 0;
    if (typeof v === "number") return Number.isFinite(v);
    return true;
  });

  if (entries.length === 0) return "";

  const qs = entries
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

  return `?${qs}`;
}

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
      providesTags: ["Payment"],
    }),
    adminPercentage: build.query<AdminPercentageResponse, number | string>({
      query: (id) => ({
        url: `/percentage/${id}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
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
      invalidatesTags: ["Payment"],
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
      invalidatesTags: ["Payment"],
    }),
    adminDeletePercentage: build.mutation<
      AdminPercentageResponse,
      number | string
    >({
      query: (id) => ({
        url: `/percentage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
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
