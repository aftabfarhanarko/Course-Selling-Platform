import { baseApi } from "../baseApi";

export type AdminUser = Record<string, any>;

export type AdminUsersListResponse = Record<string, any>;
export type AdminUserResponse = Record<string, any>;

export type AdminCreateUserRequest = {
  name: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  photo?: string | null;
  role?: string;
};

export const adminUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminUsers: build.query<AdminUsersListResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    adminUser: build.query<AdminUserResponse, number | string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    adminCreateUser: build.mutation<AdminUserResponse, AdminCreateUserRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    adminDeleteUser: build.mutation<AdminUserResponse, number | string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    adminBanUser: build.mutation<AdminUserResponse, number | string>({
      query: (id) => ({
        url: `/users/${id}/ban`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    adminUnbanUser: build.mutation<AdminUserResponse, number | string>({
      query: (id) => ({
        url: `/users/${id}/unban`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    adminRestoreUser: build.mutation<AdminUserResponse, number | string>({
      query: (id) => ({
        url: `/users/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminUsersQuery,
  useLazyAdminUsersQuery,
  useAdminUserQuery,
  useLazyAdminUserQuery,
  useAdminCreateUserMutation,
  useAdminDeleteUserMutation,
  useAdminBanUserMutation,
  useAdminUnbanUserMutation,
  useAdminRestoreUserMutation,
} = adminUserApi;
