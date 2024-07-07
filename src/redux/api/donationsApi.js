import api from "./api";

const donationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllDonations: build.query({
      query: ({ limit, page, searchBy }) => ({
        url: "/donations",
        params: { limit, page, ...(searchBy ? { searchBy } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DONATIONS"],
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

export const { useGetAllDonationsQuery, useGetDonationStatsQuery, useGetSingleDonationQuery } = donationsApi;

export default donationsApi;
