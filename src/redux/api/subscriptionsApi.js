import api from "./api";

const subscriptionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllSubscriptions: build.query({
      query: ({ limit, page, searchBy, role, region }) => ({
        url: "/subscriptions",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(role ? { role } : {}),
          ...(region ? { region } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["SUBS"],
    }),
    exportSubscriptions: build.mutation({
      queryFn: async ({ callback }, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: "/subscriptions/export",
          method: "GET",
          responseHandler: (response) => response.blob(),
          cache: "no-cache",
        });

        callback(result);
        return { data: null };
      },
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

export const {
  useGetAllSubscriptionsQuery,
  useGetSubscriptionStatsQuery,
  useGetSingleSubscriptionQuery,
  useExportSubscriptionsMutation,
} = subscriptionsApi;

export default subscriptionsApi;
