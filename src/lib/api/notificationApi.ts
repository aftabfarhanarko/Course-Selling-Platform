import { baseApi } from "./baseApi";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<{ success: boolean; data: NotificationItem[] }, void>({
      query: () => "/notification",
      providesTags: ["Notifications" as any],
    }),
    markAllNotificationsRead: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/notification/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications" as any],
    }),
    markNotificationRead: builder.mutation<{ success: boolean; data: NotificationItem }, string>({
      query: (id) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications" as any],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} = notificationApi;
