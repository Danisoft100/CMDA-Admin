import api from "./api";

const donationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllDonations: build.query({
      query: ({ limit, page, searchBy, role, region, areasOfNeed }) => ({
        url: "/donations",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(role ? { role } : {}),
          ...(region ? { region } : {}),
          ...(areasOfNeed ? { areasOfNeed } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DONATIONS"],
    }),
    exportDonations: build.mutation({
      queryFn: async ({ callback }, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: "/donations/export",
          method: "GET",
          responseHandler: (response) => response.blob(),
          cache: "no-cache",
        });

        callback(result);
        return { data: null };
      },
    }),
    getSingleDonation: build.query({
      query: (id) => ({ url: `/donations/${id}` }),
      transformResponse: (response) => response.data,
    }),
    getDonationStats: build.query({
      query: () => ({ url: "/donations/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["DONATION_STATS"],
    }),
  }),
});

export const {
  useGetAllDonationsQuery,
  useGetDonationStatsQuery,
  useGetSingleDonationQuery,
  useExportDonationsMutation,
} = donationsApi;

export default donationsApi;
