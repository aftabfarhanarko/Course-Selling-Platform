import { baseApi } from "./baseApi";

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  discountPrice: string;
  thumbnail: string;
  isPublished: boolean;
  category?: {
    id: number;
    name: string;
  };
  instructor?: {
    id: number;
    name: string;
  };
  enrollmentCount?: number;
  metadata?: { level?: string; is_premium?: boolean; [key: string]: any; };
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCourses: builder.query<
      PaginatedResponse<Course>,
      { page?: number; limit?: number; search?: string }
    >({
      query: (params) => ({
        url: "/course/all",
        params,
      }),
      transformResponse: (response: { data: PaginatedResponse<Course> }) => response.data,
      providesTags: ["Course"],
    }),
    getPublicCourse: builder.query<Course, string | number>({
      query: (id) => ({
        url: `/course/${id}`,
      }),
      transformResponse: (response: { data: Course }) => response.data,
      providesTags: ["Course"],
    }),
  }),
});

export const { useGetPublicCoursesQuery, useGetPublicCourseQuery } = courseApi;
