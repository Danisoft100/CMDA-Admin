import api from "./api";

const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: ({ limit, page, searchBy }) => ({
        url: "/orders",
        params: { limit, page, ...(searchBy ? { searchBy } : {}) },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["ORDERS"],
    }),
    getSingleOrder: build.query({
      query: (id) => ({ url: `/orders/${id}` }),
      transformResponse: (response) => response.data,
    }),
    updateOrder: build.mutation({
      query: ({ id, body }) => ({ url: `/orders/update-status/${id}`, method: "PATCH", body }),
      invalidatesTags: ["ORDERS", "ORDER_STATS"],
    }),
    getOrderStats: build.query({
      query: () => ({ url: "/orders/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["ORDER_STATS"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetOrderStatsQuery, useGetSingleOrderQuery, useUpdateOrderMutation } =
  ordersApi;

export default ordersApi;
