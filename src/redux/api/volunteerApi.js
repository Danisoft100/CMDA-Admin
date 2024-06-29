import api from "./api";

const volunteersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllVolunteerJobs: build.query({
      query: ({ page, limit, searchBy }) => ({
        url: "/volunteer/jobs",
        params: { page, limit, ...(searchBy ? { searchBy } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["JOBS"],
    }),
    getVolunteerJobById: build.query({
      query: (id) => ({ url: `/volunteer/jobs/${id}` }),
      transformResponse: (response) => response.data,
    }),
    updateVolunteerJob: build.mutation({
      query: ({ id, body }) => ({ url: `/volunteer/jobs/${id}`, method: "PATCH", body }),
      invalidatesTags: ["JOBS", "JOB_STATS"],
    }),
    deleteVolunteerJobById: build.mutation({
      query: (id) => ({ url: `/volunteer/jobs/${id}`, method: "DELETE" }),
      invalidatesTags: ["JOBS", "JOB_STATS"],
    }),
    createVolunteerJob: build.mutation({
      query: (body) => ({ url: `/volunteer/jobs`, method: "POST", body }),
      invalidatesTags: ["JOBS", "JOB_STATS"],
    }),
    getVolunteerJobStats: build.query({
      query: () => ({ url: "/volunteer/jobs/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["JOB_STATS"],
    }),
  }),
});

export const {
  useCreateVolunteerJobMutation,
  useUpdateVolunteerJobMutation,
  useGetAllVolunteerJobsQuery,
  useGetVolunteerJobByIdQuery,
  useDeleteVolunteerJobByIdMutation,
  useGetVolunteerJobStatsQuery,
} = volunteersApi;

export default volunteersApi;
