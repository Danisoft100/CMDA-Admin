import api from "./api";

const adminNotificationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Send a push notification to targeted users
    sendAdminNotification: build.mutation({
      query: (data) => ({
        url: "/admin/notifications",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["ADMIN_NOTIFICATIONS"],
    }),

    // Get notification history with pagination
    getAdminNotificationHistory: build.query({
      query: ({ page = 1, limit = 10, type, startDate, endDate } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (type) params.append("type", type);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        return { url: `/admin/notifications?${params.toString()}` };
      },
      transformResponse: (response) => response.data,
      providesTags: ["ADMIN_NOTIFICATIONS"],
    }),

    // Get delivery stats for a specific notification
    getAdminNotificationStats: build.query({
      query: (id) => ({ url: `/admin/notifications/${id}/stats` }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useSendAdminNotificationMutation,
  useGetAdminNotificationHistoryQuery,
  useGetAdminNotificationStatsQuery,
} = adminNotificationsApi;

export default adminNotificationsApi;
