import { baseApi } from "../baseApi";

export type AdminInstructor = Record<string, any>;

export type AdminInstructorsListResponse = Record<string, any>;
export type AdminInstructorResponse = Record<string, any>;

export type InstructorListQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export type AdminCreateInstructorRequest = Record<string, any>;

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

export const adminInstructorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminInstructors: build.query<
      AdminInstructorsListResponse,
      InstructorListQuery | void
    >({
      query: (q) => {
        const query = q ?? {};
        const qs = toQueryString(query as Record<string, unknown>);
        return {
          url: `/instructor${qs}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    adminInstructor: build.query<AdminInstructorResponse, number | string>({
      query: (id) => ({
        url: `/instructor/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    adminCreateInstructor: build.mutation<
      AdminInstructorResponse,
      AdminCreateInstructorRequest
    >({
      query: (body) => ({
        url: "/instructor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    adminDeleteInstructor: build.mutation<
      AdminInstructorResponse,
      number | string
    >({
      query: (id) => ({
        url: `/instructor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    adminRestoreInstructor: build.mutation<
      AdminInstructorResponse,
      number | string
    >({
      query: (id) => ({
        url: `/instructor/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminInstructorsQuery,
  useLazyAdminInstructorsQuery,
  useAdminInstructorQuery,
  useLazyAdminInstructorQuery,
  useAdminCreateInstructorMutation,
  useAdminDeleteInstructorMutation,
  useAdminRestoreInstructorMutation,
} = adminInstructorApi;
