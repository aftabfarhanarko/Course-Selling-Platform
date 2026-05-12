import { baseApi } from "./baseApi";

export type RegisterRequest = {
  name: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  photo?: File | Blob | string | null;
  referralCode?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type AuthResponse = Record<string, unknown>;

function toRegisterBody(
  body: RegisterRequest,
): FormData | (Omit<RegisterRequest, "photo"> & { photo?: string }) {
  const { photo, ...rest } = body;

  const hasBinaryPhoto =
    !!photo && typeof photo !== "string" && typeof FormData !== "undefined";

  if (hasBinaryPhoto) {
    const form = new FormData();

    (Object.keys(rest) as Array<keyof typeof rest>).forEach((key) => {
      const value = rest[key];
      if (value === undefined || value === null) return;
      form.append(String(key), String(value));
    });

    form.append("photo", photo as Blob);

    return form;
  }

  if (typeof photo === "string" && photo.length > 0) {
    return { ...rest, photo };
  }

  return rest;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: toRegisterBody(body),
      }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    refresh: build.mutation<AuthResponse, RefreshRequest | void>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body: body ?? undefined,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation } =
  authApi;
