import { baseApi, toQueryString } from "../baseApi";

export type AdminInstructor = Record<string, any>;

export type AdminInstructorsListResponse = Record<string, any>;
export type AdminInstructorResponse = Record<string, any>;

export type InstructorListQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export type AdminCreateInstructorRequest = Record<string, any>;

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
      providesTags: ["Instructor"],
    }),
    adminInstructor: build.query<AdminInstructorResponse, number | string>({
      query: (id) => ({
        url: `/instructor/${id}`,
        method: "GET",
      }),
      providesTags: ["Instructor"],
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
      invalidatesTags: ["Instructor"],
    }),
    adminDeleteInstructor: build.mutation<
      AdminInstructorResponse,
      number | string
    >({
      query: (id) => ({
        url: `/instructor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Instructor"],
    }),
    adminRestoreInstructor: build.mutation<
      AdminInstructorResponse,
      number | string
    >({
      query: (id) => ({
        url: `/instructor/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["Instructor"],
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
