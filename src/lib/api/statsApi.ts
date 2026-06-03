import { baseApi } from "./baseApi";

export interface Kpi {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: string;
  hint: string;
}

export interface TopCourse {
  title: string;
  category: string;
  price: string;
  students: number;
  revenue: string;
  rating: number;
}

export interface Source {
  name: string;
  pct: number;
}

export interface StatsResponse {
  kpis: Kpi[];
  salesTrend: { label: string; value: number }[];
  topCourses: TopCourse[];
  sources: Source[];
}

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
      transformResponse: (response: { data: StatsResponse } | StatsResponse) => {
        return ('data' in response && response.data) ? response.data : response as StatsResponse;
      },
      providesTags: ["Stats"],
    }),
    getAdminDashboardStats: builder.query<any, void>({
      query: () => "/stats/admin-dashboard",
      transformResponse: (response: { data: any } | any) => {
        return ('data' in response && response.data) ? response.data : response;
      },
      providesTags: ["Stats"],
    }),
    getStudentDashboardStats: builder.query<any, void>({
      query: () => "/stats/student-dashboard",
      transformResponse: (response: { data: any } | any) => {
        return ('data' in response && response.data) ? response.data : response;
      },
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetAdminDashboardStatsQuery,
  useGetStudentDashboardStatsQuery,
} = statsApi;
