import api from "./api";

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: ({ limit, page, searchBy }) => ({
        url: "/products",
        params: { limit, page, ...(searchBy ? { searchBy } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["PRODUCTS"],
    }),
    getProductBySlug: build.query({
      query: (slug) => ({ url: `/products/${slug}` }),
      transformResponse: (response) => response.data,
    }),
    updateProductBySlug: build.mutation({
      query: ({ slug, body }) => ({ url: `/products/${slug}`, method: "PATCH", body }),
      invalidatesTags: ["PRODUCTS", "PRD_STATS"],
    }),
    deleteProductBySlug: build.mutation({
      query: (slug) => ({ url: `/products/${slug}`, method: "DELETE" }),
      invalidatesTags: ["PRODUCTS", "PRD_STATS"],
    }),
    createProduct: build.mutation({
      query: (body) => ({ url: `/products`, method: "POST", body }),
      invalidatesTags: ["PRODUCTS", "PRD_STATS"],
    }),
    getProductStats: build.query({
      query: () => ({ url: "/products/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["PRD_STATS"],
    }),
  }),
});

export const {
  useGetProductBySlugQuery,
  useGetAllProductsQuery,
  useUpdateProductBySlugMutation,
  useCreateProductMutation,
  useDeleteProductBySlugMutation,
  useGetProductStatsQuery,
} = productsApi;

export default productsApi;
