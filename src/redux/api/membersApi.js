import api from "./api";

const membersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllMembers: build.query({
      query: ({ limit, page, searchBy }) => ({
        url: "/users",
        params: { limit, page, ...(searchBy ? { searchBy } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["MEMBERS"],
    }),
    getMembersStats: build.query({
      query: () => "/users/stats",
      transformResponse: (response) => response.data,
      providesTags: ["MEMBERS_STATS"],
    }),
    getMemberById: build.query({
      query: (id) => ({ url: `/users/${id}` }),
      transformResponse: (response) => response.data,
    }),
    // updateMemberById: build.mutation({
    //   query: (id) => ({ url: `/users/${id}`, method: "PATCH" }),
    //   invalidatesTags: ["RESOURCES"],
    // }),
    deleteMemberById: build.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["MEMBERS", "MEMBERS_STATS"],
    }),
    // createMember: build.mutation({
    //   query: (body) => ({ url: `/users`, method: "POST", body }),
    //   invalidatesTags: ["RESOURCES"],
    // }),
  }),
});

export const {
  useGetMemberByIdQuery,
  useGetAllMembersQuery,
  useGetMembersStatsQuery,
  //   useUpdateMemberByIdMutation,
  //   useCreateMemberMutation,
  useDeleteMemberByIdMutation,
} = membersApi;

export default membersApi;
