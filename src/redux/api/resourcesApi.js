import api from "./api";

const resourcesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllResources: build.query({
      query: ({ limit, page }) => ({ url: "/resources", params: { limit, page } }),
      transformResponse: (response) => response.data,
      providesTags: ["RESOURCES"],
    }),
    getResourceBySlug: build.query({
      query: (slug) => ({ url: `/resources/${slug}` }),
      transformResponse: (response) => response.data,
    }),
    updateResourceBySlug: build.mutation({
      query: (slug) => ({ url: `/resources/${slug}`, method: "PATCH" }),
      invalidatesTags: ["RESOURCES", "RSC_STATS"],
    }),
    deleteResourceBySlug: build.mutation({
      query: (slug) => ({ url: `/resources/${slug}`, method: "DELETE" }),
      invalidatesTags: ["RESOURCES", "RSC_STATS"],
    }),
    createResource: build.mutation({
      query: (body) => ({ url: `/resources`, method: "POST", body }),
      invalidatesTags: ["RESOURCES", "RSC_STATS"],
    }),
    getResourceStats: build.query({
      query: () => ({ url: "/resources/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["RSC_STATS"],
    }),
  }),
});

export const {
  useGetResourceBySlugQuery,
  useGetAllResourcesQuery,
  useUpdateResourceBySlugMutation,
  useCreateResourceMutation,
  useDeleteResourceBySlugMutation,
  useGetResourceStatsQuery,
} = resourcesApi;

export default resourcesApi;
