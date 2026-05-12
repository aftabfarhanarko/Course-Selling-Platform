import { baseApi } from "./baseApi";

export type UserProfileResponse = Record<string, unknown>;

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query<UserProfileResponse, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useProfileQuery, useLazyProfileQuery } = usersApi;
