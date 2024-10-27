import api from "./api";

const membersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllMembers: build.query({
      query: ({ searchBy, page, limit, role, region }) => ({
        url: "/users",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(role ? { role } : {}),
          ...(region ? { region } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["MEMBERS"],
    }),
    exportMembersList: build.mutation({
      queryFn: async ({ callback, role, region }, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: "/users/export",
          params: {
            ...(role ? { role } : {}),
            ...(region ? { region } : {}),
          },
          method: "GET",
          responseHandler: (response) => response.blob(),
          cache: "no-cache",
        });

        callback(result);
        return { data: null };
      },
    }),
    getMembersStats: build.query({
      query: () => "/users/stats",
      transformResponse: (response) => response.data,
      providesTags: ["MEMBERS_STATS"],
    }),
    getMemberById: build.query({
      query: (id) => ({ url: `/users/${id}` }),
      transformResponse: (response) => response.data,
      providesTags: ["SINGLE_MEM"],
    }),
    // updateMemberById: build.mutation({
    //   query: (id) => ({ url: `/users/${id}`, method: "PATCH" }),
    //   invalidatesTags: ["RESOURCES"],
    // }),
    deleteMemberById: build.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["MEMBERS", "MEMBERS_STATS"],
    }),
    getAllTransitions: build.query({
      query: () => ({ url: "/users/transition/all" }),
      transformResponse: (response) => response.data,
      providesTags: ["TRANSITIONS"],
    }),
    updateTransitionStatus: build.mutation({
      query: ({ id, status }) => ({ url: `/users/transition/${id}/${status}`, method: "POST" }),
      invalidatesTags: ["TRANSITIONS"],
    }),
  }),
});

export const {
  useGetMemberByIdQuery,
  useGetAllMembersQuery,
  useGetMembersStatsQuery,
  useGetAllTransitionsQuery,
  useUpdateTransitionStatusMutation,
  useDeleteMemberByIdMutation,
  useExportMembersListMutation,
} = membersApi;

export default membersApi;
