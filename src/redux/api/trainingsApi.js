import api from "./api";

const trainingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTrainings: build.query({
      query: ({ searchBy, membersGroup }) => ({
        url: "/trainings",
        params: { ...(searchBy ? { searchBy } : {}), ...(membersGroup ? { membersGroup } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["TRAININGS"],
    }),
    getSingleTraining: build.query({
      query: (id) => ({ url: `/trainings/${id}` }),
      transformResponse: (response) => response.data,
      providesTags: ["TRAINING"],
    }),
    updateCompletedTrainingUsers: build.mutation({
      query: ({ id, body }) => ({ url: `/trainings/${id}/completed`, method: "PATCH", body }),
      invalidatesTags: ["TRAINING", "TRAININGS", "TRAINING_STATS"],
    }),
    deleteTrainingById: build.mutation({
      query: (id) => ({ url: `/trainings/${id}`, method: "DELETE" }),
      invalidatesTags: ["TRAININGS", "TRAINING_STATS"],
    }),
    createTraining: build.mutation({
      query: (body) => ({ url: `/trainings`, method: "POST", body }),
      invalidatesTags: ["TRAININGS", "TRAINING_STATS"],
    }),
    getTrainingStats: build.query({
      query: () => ({ url: "/trainings/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["TRAINING_STATS"],
    }),
  }),
});

export const {
  useCreateTrainingMutation,
  useGetAllTrainingsQuery,
  useGetSingleTrainingQuery,
  useDeleteTrainingByIdMutation,
  useGetTrainingStatsQuery,
  useUpdateCompletedTrainingUsersMutation,
} = trainingsApi;

export default trainingsApi;
