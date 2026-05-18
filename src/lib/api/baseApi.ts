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

      const decodeJwtRole = (rawToken: string): string | undefined => {
        try {
          const payload = rawToken.split(".")[1];
          if (!payload) return undefined;

          const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
          const padded = normalized + "===".slice((normalized.length + 3) % 4);

          const decoded =
            typeof atob === "function"
              ? atob(padded)
              : Buffer.from(padded, "base64").toString("binary");

          const parsed = JSON.parse(decoded) as { role?: unknown };
          return typeof parsed.role === "string" ? parsed.role : undefined;
        } catch {
          return undefined;
        }
      };
      let token =
        authAny?.user?.token ??
        authAny?.user?.accessToken ??
        authAny?.user?.access_token ??
        authAny?.token ??
        authAny?.accessToken ??
        authAny?.access_token;

      let roleFromState =
        (authAny as any)?.user?.role ?? (authAny as any)?.role ?? undefined;

      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("course_platform_auth");
          if (raw) {
            const parsed = JSON.parse(raw) as any;

            const tokenFromStorage =
              parsed?.user?.token ??
              parsed?.user?.accessToken ??
              parsed?.user?.access_token ??
              parsed?.token ??
              parsed?.accessToken ??
              parsed?.access_token;

            if (!token && typeof tokenFromStorage === "string") {
              token = tokenFromStorage;
            }

            const roleFromStorage = parsed?.user?.role ?? parsed?.role;
            if (!roleFromState && typeof roleFromStorage === "string") {
              roleFromState = roleFromStorage;
            }
          }
        } catch {
        }
      }
      const role =
        (typeof roleFromState === "string" && roleFromState.trim().length > 0
          ? roleFromState
          : token
            ? decodeJwtRole(token)
            : undefined) ?? undefined;
      if (role) {
        if (!headers.has("x-role")) {
          headers.set("x-role", role);
        }
        if (!headers.has("role")) {
          headers.set("role", role);
        }
      }

      if (token) {
        headers.set("authorization", `Bearer ${token}`);

        if (!headers.has("access_token")) {
          headers.set("access_token", token);
        }

        if (!headers.has("x-access-token")) {
          headers.set("x-access-token", token);
        }
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
