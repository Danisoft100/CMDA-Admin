import api from "./api";

const pendingPaymentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Get all pending registrations/payments
    getPendingRegistrations: build.query({
      query: ({ limit, page, searchBy, type }) => ({
        url: "/admin/pending-payments",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(type ? { type } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["PENDING_PAYMENTS"],
    }),

    // Get pending registration stats
    getPendingRegistrationStats: build.query({
      query: () => ({ url: "/admin/pending-payments/stats" }),
      transformResponse: (response) => response.data,
      providesTags: ["PENDING_STATS"],
    }),

    // Refresh a specific pending payment
    refreshPendingPayment: build.mutation({
      query: ({ reference, type, source, bulkRefresh = false }) => ({
        url: "/admin/pending-payments/refresh",
        method: "POST",
        body: {
          ...(bulkRefresh ? { bulkRefresh: true } : { reference, type, source }),
        },
      }),
      invalidatesTags: ["PENDING_PAYMENTS", "PENDING_STATS", "SUBSCRIPTIONS", "DONATIONS", "EVENTS"],
    }),

    // Get pending event registrations specifically
    getPendingEventRegistrations: build.query({
      query: ({ limit, page, searchBy, eventSlug }) => ({
        url: "/admin/pending-payments/events",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(eventSlug ? { eventSlug } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["PENDING_EVENTS"],
    }),

    // Get pending subscription payments
    getPendingSubscriptionPayments: build.query({
      query: ({ limit, page, searchBy, role, region }) => ({
        url: "/admin/pending-payments/subscriptions",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(role ? { role } : {}),
          ...(region ? { region } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["PENDING_SUBSCRIPTIONS"],
    }),

    // Get pending donation payments
    getPendingDonationPayments: build.query({
      query: ({ limit, page, searchBy, areasOfNeed }) => ({
        url: "/admin/pending-payments/donations",
        params: {
          limit,
          page,
          ...(searchBy ? { searchBy } : {}),
          ...(areasOfNeed ? { areasOfNeed } : {}),
        },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["PENDING_DONATIONS"],
    }),

    // Manually verify and confirm payment
    manuallyConfirmPayment: build.mutation({
      query: ({ reference, type, confirmationData }) => ({
        url: "/admin/pending-payments/confirm",
        method: "POST",
        body: { reference, type, confirmationData },
      }),
      invalidatesTags: ["PENDING_PAYMENTS", "PENDING_STATS", "SUBSCRIPTIONS", "DONATIONS", "EVENTS"],
    }),

    // Get payment verification details
    getPaymentVerificationDetails: build.query({
      query: ({ reference, source }) => ({
        url: `/admin/pending-payments/verify/${reference}`,
        params: { source },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetPendingRegistrationsQuery,
  useGetPendingRegistrationStatsQuery,
  useRefreshPendingPaymentMutation,
  useGetPendingEventRegistrationsQuery,
  useGetPendingSubscriptionPaymentsQuery,
  useGetPendingDonationPaymentsQuery,
  useManuallyConfirmPaymentMutation,
  useGetPaymentVerificationDetailsQuery,
} = pendingPaymentsApi;

export default pendingPaymentsApi;
