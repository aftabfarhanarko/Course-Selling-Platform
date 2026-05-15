import { baseApi } from "../baseApi";

export type EnrollmentListQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export type AdminEnrollmentsResponse = Record<string, any>;
export type AdminEnrollmentResponse = Record<string, any>;

export type AdminEnrollmentPayRequest = Record<string, any>;
export type AdminEnrollmentManualRequest = Record<string, any>;

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
      providesTags: ["Payment"],
    }),
    adminEnrollment: build.query<AdminEnrollmentResponse, number | string>({
      query: (id) => ({
        url: `/enrollments/${id}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    adminEnrollmentsMyCourses: build.query<AdminEnrollmentsResponse, void>({
      query: () => ({
        url: "/enrollments/my-courses",
        method: "GET",
      }),
      providesTags: ["Payment"],
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
      invalidatesTags: ["Payment"],
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
      invalidatesTags: ["Payment"],
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
