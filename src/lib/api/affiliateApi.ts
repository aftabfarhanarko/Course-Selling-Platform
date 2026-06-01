import { baseApi } from "./baseApi";

export const affiliateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAffiliateDashboard: build.query<any, void>({
      query: () => ({
        url: "/users/affiliate/dashboard",
        method: "GET",
      }),
      providesTags: ["User", "Enrollment"],
    }),
    getReferredEnrollments: build.query<any, void>({
      query: () => ({
        url: "/enrollments/referred",
        method: "GET",
      }),
      providesTags: ["Enrollment"],
    }),
    getAffiliateWallet: build.query<any, void>({
      query: () => ({
        url: "/wallet/my",
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    getAffiliatePaymentMethods: build.query<any, void>({
      query: () => ({
        url: "/payment-methods/my",
        method: "GET",
      }),
      providesTags: ["PaymentMethod"],
    }),
    createAffiliatePaymentMethod: build.mutation<any, any>({
      query: (body) => ({
        url: "/payment-methods",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    getAffiliateWithdrawals: build.query<any, void>({
      query: () => ({
        url: "/withdraw/my",
        method: "GET",
      }),
      providesTags: ["Withdraw"],
    }),
    requestAffiliateWithdrawal: build.mutation<any, { enrollmentId?: number; productId?: number }>({
      query: (body) => ({
        url: "/withdraw/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Withdraw", "Enrollment"],
    }),
    deleteAffiliateWithdrawal: build.mutation<any, number | string>({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Withdraw"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAffiliateDashboardQuery,
  useGetReferredEnrollmentsQuery,
  useGetAffiliateWalletQuery,
  useGetAffiliatePaymentMethodsQuery,
  useCreateAffiliatePaymentMethodMutation,
  useGetAffiliateWithdrawalsQuery,
  useRequestAffiliateWithdrawalMutation,
  useDeleteAffiliateWithdrawalMutation,
} = affiliateApi;
