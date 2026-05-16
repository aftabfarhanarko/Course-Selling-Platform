import { baseApi, toQueryString } from "../baseApi";

export type PaymentMethodListQuery = {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type AdminPaymentMethodsResponse = Record<string, any>;
export type AdminPaymentMethodResponse = Record<string, any>;

export const adminPaymentMethodsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminPaymentMethods: build.query<
      AdminPaymentMethodsResponse,
      PaymentMethodListQuery | void
    >({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/payment-methods${qs}`,
          method: "GET",
        };
      },
      providesTags: ["PaymentMethod"],
    }),
    adminPaymentMethod: build.query<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}`,
        method: "GET",
      }),
      providesTags: ["PaymentMethod"],
    }),
    adminApprovePaymentMethod: build.mutation<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    adminRejectPaymentMethod: build.mutation<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}/reject`,
        method: "POST",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    adminDeletePaymentMethod: build.mutation<AdminPaymentMethodResponse, number | string>({
      query: (id) => ({
        url: `/payment-methods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminPaymentMethodsQuery,
  useLazyAdminPaymentMethodsQuery,
  useAdminPaymentMethodQuery,
  useLazyAdminPaymentMethodQuery,
  useAdminApprovePaymentMethodMutation,
  useAdminRejectPaymentMethodMutation,
  useAdminDeletePaymentMethodMutation,
} = adminPaymentMethodsApi;