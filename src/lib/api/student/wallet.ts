import { baseApi } from "../baseApi";

export type StudentWalletMyResponse = Record<string, any>;

export const studentWalletApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    studentWalletMy: build.query<StudentWalletMyResponse, void>({
      query: () => ({
        url: "/wallet/my",
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
  }),
  overrideExisting: false,
});

export const { useStudentWalletMyQuery, useLazyStudentWalletMyQuery } =
  studentWalletApi;
