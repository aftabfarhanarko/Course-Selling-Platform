import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";

export function toQueryString(params: Record<string, unknown>): string {
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

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://course-selling-api.up.railway.app",

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const authAny = state.auth as unknown as
        | {
            user?: {
              token?: string;
              accessToken?: string;
              access_token?: string;
            };
            token?: string;
            accessToken?: string;
            access_token?: string;
          }
        | null
        | undefined;

      const token =
        authAny?.user?.token ??
        authAny?.user?.accessToken ??
        authAny?.user?.access_token ??
        authAny?.token ??
        authAny?.accessToken ??
        authAny?.access_token;
      if (token && !headers.has("authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (!headers.has("accept")) {
        headers.set("accept", "application/json");
      }

      return headers;
    },
  }),

  tagTypes: [
    "Auth",
    "User",
    "Course",
    "Category",
    "Product",
    "Payment",
    "PaymentMethod",
    "Enrollment",
    "Instructor",
    "Percentage",
    "Withdraw",
  ],

  endpoints: () => ({}),
});
