import { baseApi, toQueryString } from "../baseApi";

export type StudentProductsQuery = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type StudentProductsResponse = Record<string, any>;

export const studentProductsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    studentMyProducts: build.query<StudentProductsResponse, StudentProductsQuery | void>({
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
  }),
  overrideExisting: false,
});

export const { useStudentMyProductsQuery, useLazyStudentMyProductsQuery } =
  studentProductsApi;
