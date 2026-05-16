import { baseApi } from "../baseApi";

export type StudentMyCoursesResponse = Record<string, any>;

export const studentCoursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    studentMyCourses: build.query<StudentMyCoursesResponse, void>({
      query: () => ({
        url: "/enrollments/my-courses",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
  overrideExisting: false,
});

export const { useStudentMyCoursesQuery, useLazyStudentMyCoursesQuery } =
  studentCoursesApi;
