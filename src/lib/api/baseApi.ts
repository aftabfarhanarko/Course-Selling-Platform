import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://course-selling-api.up.railway.app";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      const token =
        state.auth?.user?.token ??
        state.auth?.user?.accessToken ??
        (state.auth as unknown as { token?: string } | undefined)?.token;

      if (token && !headers.has("authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (!headers.has("accept")) {
        headers.set("accept", "application/json");
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "User", "Course", "Payment"],
  endpoints: () => ({}),
});
