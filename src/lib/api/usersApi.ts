import { baseApi } from "./baseApi";

export type UserProfileResponse = Record<string, unknown>;

export type UpdateProfileRequest = {
  name?: string;
  photo?: string;
};

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query<UserProfileResponse, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: build.mutation<UserProfileResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useProfileQuery, useLazyProfileQuery, useUpdateProfileMutation } =
  usersApi;
