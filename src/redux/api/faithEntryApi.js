import api from "./api";

const faithEntryApi = api.injectEndpoints({
  endpoints: (build) => ({
    createFaithEntry: build.mutation({
      query: (body) => ({ url: "/faith-entry", method: "POST", body }),
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
    deleteFaithEntry: build.mutation({
      query: (id) => ({ url: `/faith-entry/${id}`, method: "DELETE" }),
      invalidatesTags: ["FAITH"],
    }),
  }),
});

export const { useCreateFaithEntryMutation, useGetAllFaithEntriesQuery, useDeleteFaithEntryMutation } = faithEntryApi;

export default faithEntryApi;
