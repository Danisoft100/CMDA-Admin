import api from "./api";

const faithEntryApi = api.injectEndpoints({
  endpoints: (build) => ({
    createFaithEntry: build.mutation({
      query: (body) => ({
        url: "/faith-entry",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FAITH"],
    }),
    getAllFaithEntries: build.query({
      query: ({ limit, page, searchBy }) => ({
        url: "/faith-entry",
        params: { limit, page, ...(searchBy ? { searchBy } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["FAITH"],
    }),
  }),
});

export const { useCreateFaithEntryMutation, useGetAllFaithEntriesQuery } = faithEntryApi;

export default faithEntryApi;
