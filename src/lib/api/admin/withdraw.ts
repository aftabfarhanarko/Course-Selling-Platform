import { baseApi, toQueryString } from "../baseApi";

export type WithdrawListQuery = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type WithdrawResponse = Record<string, any>;

export const adminWithdrawApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminWithdraws: build.query<WithdrawResponse, WithdrawListQuery | void>({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/withdraw${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Withdraw" as any],
    }),
    adminWithdraw: build.query<WithdrawResponse, number | string>({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "GET",
      }),
      providesTags: ["Withdraw" as any],
    }),
    adminApproveWithdraw: build.mutation<any, { id: number | string; percentageId?: number }>({
      query: ({ id, percentageId }) => ({
        url: `/withdraw/${id}/approve`,
        method: "POST",
        body: { percentageId },
      }),
      invalidatesTags: ["Withdraw" as any],
    }),
    adminRejectWithdraw: build.mutation<any, { id: number | string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/withdraw/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Withdraw" as any],
    }),
    adminDirectWithdraw: build.mutation<any, { studentId: number; productId?: number; enrollmentId?: number; percentageId?: number }>({
      query: (body) => ({
        url: `/withdraw/direct`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Withdraw" as any],
    }),
    adminDeleteWithdraw: build.mutation<any, number | string>({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Withdraw" as any],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAdminWithdrawsQuery,
  useLazyAdminWithdrawQuery,
  useAdminApproveWithdrawMutation,
  useAdminRejectWithdrawMutation,
  useAdminDirectWithdrawMutation,
  useAdminDeleteWithdrawMutation,
} = adminWithdrawApi;
