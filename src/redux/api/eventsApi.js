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
    getAllConferences: build.query({
      query: ({ limit, page, searchBy, eventDate, eventType, membersGroup, conferenceType, zone, region }) => ({
        url: "/events/conferences",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(eventDate ? { eventDate } : {}),
          ...(eventType ? { eventType } : {}),
          ...(membersGroup ? { membersGroup } : {}),
          ...(conferenceType ? { conferenceType } : {}),
          ...(zone ? { zone } : {}),
          ...(region ? { region } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["CONFERENCES"],
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
      invalidatesTags: ["EVENTS"],
    }),
    createEvent: build.mutation({
      query: (body) => ({ url: `/events`, method: "POST", body }),
      invalidatesTags: ["EVENTS", "EVT_STATS", "CONFERENCES"],
    }),
    getEventStats: build.query({
      query: (slug) => ({ url: `/events/${slug}/stats` }),
      transformResponse: (response) => response.data,
      providesTags: ["EVT_STATS"],
    }),
    // Public endpoints (no authentication required)
    getPublicConferences: build.query({
      query: ({ limit, page, searchBy, eventType, membersGroup, conferenceType, zone, region }) => ({
        url: "/events/public/conferences",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(eventType ? { eventType } : {}),
          ...(membersGroup ? { membersGroup } : {}),
          ...(conferenceType ? { conferenceType } : {}),
          ...(zone ? { zone } : {}),
          ...(region ? { region } : {}),
        },
      }),
      transformResponse: (response) => response.data,
    }),
    checkUserExists: build.mutation({
      query: (email) => ({
        url: "/events/public/check-user",
        method: "POST",
        body: { email },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetEventBySlugQuery,
  useGetAllEventsQuery,
  useGetAllConferencesQuery,
  useUpdateEventBySlugMutation,
  useCreateEventMutation,
  useDeleteEventBySlugMutation,
  useGetEventStatsQuery,
  useGetPublicConferencesQuery,
  useCheckUserExistsMutation,
} = eventsApi;

export default eventsApi;
