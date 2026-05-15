import { baseApi, toQueryString } from "../baseApi";

export type WithdrawListQuery = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type StudentWithdrawsResponse = Record<string, any>;
export type StudentWithdrawResponse = Record<string, any>;

export type StudentWithdrawRequestBody = Record<string, any>;

export const studentWithdrawApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    studentWithdrawsMy: build.query<
      StudentWithdrawsResponse,
      WithdrawListQuery | void
    >({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/withdraw/my${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Withdraw"],
    }),
    studentWithdrawRequest: build.mutation<
      StudentWithdrawResponse,
      StudentWithdrawRequestBody
    >({
      query: (body) => ({
        url: "/withdraw/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Withdraw"],
    }),
    studentWithdrawDelete: build.mutation<
      StudentWithdrawResponse,
      number | string
    >({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Withdraw"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useStudentWithdrawsMyQuery,
  useLazyStudentWithdrawsMyQuery,
  useStudentWithdrawRequestMutation,
  useStudentWithdrawDeleteMutation,
} = studentWithdrawApi;
