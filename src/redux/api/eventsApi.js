import api from "./api";

const eventsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllEvents: build.query({
      query: ({ limit, page, searchBy, eventDate, eventType, membersGroup }) => ({
        url: "/events",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(eventDate ? { eventDate } : {}),
          ...(eventType ? { eventType } : {}),
          ...(membersGroup ? { membersGroup } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["EVENTS"],
    }),
    getEventBySlug: build.query({
      query: (slug) => ({ url: `/events/${slug}` }),
      transformResponse: (response) => response.data,
    }),
    updateEventBySlug: build.mutation({
      query: ({ slug, body }) => ({ url: `/events/${slug}`, method: "PATCH", body }),
      invalidatesTags: ["EVENTS", "EVT_STATS"],
    }),
    deleteEventBySlug: build.mutation({
      query: (slug) => ({ url: `/events/${slug}`, method: "DELETE" }),
      invalidatesTags: ["EVENTS", "EVT_STATS"],
    }),
    createEvent: build.mutation({
      query: (body) => ({ url: `/events`, method: "POST", body }),
      invalidatesTags: ["EVENTS", "EVT_STATS"],
    }),
    getEventStats: build.query({
      query: (slug) => ({ url: `/events/${slug}/stats` }),
      transformResponse: (response) => response.data,
      providesTags: ["EVT_STATS"],
    }),
  }),
});

export const {
  useGetEventBySlugQuery,
  useGetAllEventsQuery,
  useUpdateEventBySlugMutation,
  useCreateEventMutation,
  useDeleteEventBySlugMutation,
  useGetEventStatsQuery,
} = eventsApi;

export default eventsApi;
