import api from "./api";

const subscriptionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllSubscriptions: build.query({
      query: ({ limit, page, searchBy }) => ({
        url: "/subscriptions",
        params: { limit, page, ...(searchBy ? { searchBy } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["SUBS"],
    }),
    getSingleSubscription: build.query({
      query: (id) => ({ url: `/subscriptions/${id}` }),
      transformResponse: (response) => response.data,
    }),
    getSubscriptionStats: build.query({
      query: () => ({ url: "/subscriptions/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["SUB_STATS"],
    }),
  }),
});

export const { useGetAllSubscriptionsQuery, useGetSubscriptionStatsQuery, useGetSingleSubscriptionQuery } =
  subscriptionsApi;

export default subscriptionsApi;
