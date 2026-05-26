import { baseApi, toQueryString } from "../baseApi";

export type AdminCourse = Record<string, any>;

export type AdminCoursesListResponse = Record<string, any>;
export type AdminCourseResponse = Record<string, any>;

export type CourseListQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export type AdminCreateCourseRequest = Record<string, any>;

export type AdminUpdateCourseRequest = {
  id: number | string;
  body: any;
};

export const adminCoursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    publicCoursesAll: build.query<Record<string, any>, void>({
      query: () => ({
        url: "/course/all",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    adminCourses: build.query<AdminCoursesListResponse, CourseListQuery | void>(
      {
        query: (q) => {
          const query = q ?? {};
          const qs = toQueryString(query as Record<string, unknown>);
          return {
            url: "/course" + qs,
            method: "GET",
          };
        },
        providesTags: ["Course"],
      },
    ),
    adminCourse: build.query<AdminCourseResponse, number | string>({
      query: (id) => ({
        url: "/course/" + id,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    adminCreateCourse: build.mutation<
      AdminCourseResponse,
      AdminCreateCourseRequest
    >({
      query: (body) => ({
        url: "/course",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    adminUpdateCourse: build.mutation<
      AdminCourseResponse,
      AdminUpdateCourseRequest
    >({
      query: ({ id, body }) => ({
        url: "/course/" + id,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    adminDeleteCourse: build.mutation<AdminCourseResponse, number | string>({
      query: (id) => ({
        url: "/course/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePublicCoursesAllQuery,
  useLazyPublicCoursesAllQuery,
  useAdminCoursesQuery,
  useLazyAdminCoursesQuery,
  useAdminCourseQuery,
  useLazyAdminCourseQuery,
  useAdminCreateCourseMutation,
  useAdminUpdateCourseMutation,
  useAdminDeleteCourseMutation,
} = adminCoursesApi;
