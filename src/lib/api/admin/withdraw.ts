import { baseApi, toQueryString } from "../baseApi";

export type EnrollmentListQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export type AdminEnrollmentsResponse = Record<string, any>;
export type AdminEnrollmentResponse = Record<string, any>;

export type AdminEnrollmentPayRequest = Record<string, any>;
export type AdminEnrollmentManualRequest = Record<string, any>;

export const adminWithdrawApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminEnrollments: build.query<
      AdminEnrollmentsResponse,
      EnrollmentListQuery | void
    >({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/enrollments${qs}`,
          method: "GET",
        };
      },
      providesTags: ["Enrollment"],
    }),
    adminEnrollment: build.query<AdminEnrollmentResponse, number | string>({
      query: (id) => ({
        url: `/enrollments/${id}`,
        method: "GET",
      }),
      providesTags: ["Enrollment"],
    }),
    adminEnrollmentsMyCourses: build.query<AdminEnrollmentsResponse, void>({
      query: () => ({
        url: "/enrollments/my-courses",
        method: "GET",
      }),
      providesTags: ["Enrollment"],
    }),
    adminEnrollmentsPay: build.mutation<
      AdminEnrollmentResponse,
      AdminEnrollmentPayRequest
    >({
      query: (body) => ({
        url: "/enrollments/pay",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enrollment"],
    }),
    adminEnrollmentsManual: build.mutation<
      AdminEnrollmentResponse,
      AdminEnrollmentManualRequest
    >({
      query: (body) => ({
        url: "/enrollments/manual",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enrollment"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminEnrollmentsQuery,
  useLazyAdminEnrollmentsQuery,
  useAdminEnrollmentQuery,
  useLazyAdminEnrollmentQuery,
  useAdminEnrollmentsMyCoursesQuery,
  useLazyAdminEnrollmentsMyCoursesQuery,
  useAdminEnrollmentsPayMutation,
  useAdminEnrollmentsManualMutation,
} = adminWithdrawApi;
