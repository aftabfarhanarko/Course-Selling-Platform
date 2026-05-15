import { baseApi } from "../baseApi";

export type PaymentMethodListQuery = {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type AdminPaymentMethodsResponse = Record<string, any>;
export type AdminPaymentMethodResponse = Record<string, any>;

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

export const adminWalletApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminPaymentMethods: build.query<AdminPaymentMethodsResponse, PaymentMethodListQuery | void>({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/payment-methods${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Payment"],
    }),
    adminPaymentMethod: build.query<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    adminMyPaymentMethods: build.query<AdminPaymentMethodsResponse, void>({
      query: () => ({
        url: "/payment-methods/my",
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    adminApprovePaymentMethod: build.mutation<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Payment"],
    }),
    adminRejectPaymentMethod: build.mutation<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Payment"],
    }),
    adminDeletePaymentMethod: build.mutation<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminPaymentMethodsQuery,
  useLazyAdminPaymentMethodsQuery,
  useAdminPaymentMethodQuery,
  useLazyAdminPaymentMethodQuery,
  useAdminMyPaymentMethodsQuery,
  useLazyAdminMyPaymentMethodsQuery,
  useAdminApprovePaymentMethodMutation,
  useAdminRejectPaymentMethodMutation,
  useAdminDeletePaymentMethodMutation,
} = adminWalletApi;

