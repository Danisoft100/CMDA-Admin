import api from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    // LOGIN
    login: build.mutation({
      query: (payload) => ({ url: "/admin/login", method: "POST", body: payload }),
    }),
    // FORGOT PASSWORD
    passwordForgot: build.mutation({
      query: (body) => ({ url: "/admin/initiate-password-reset", method: "POST", body }),
      transformErrorResponse: (response) => response.data?.message,
    }),
    // RESET PASSWORD
    passwordReset: build.mutation({
      query: (body) => ({ url: "/admin/password/reset", method: "POST", body }),
      transformErrorResponse: (response) => response.data?.message,
    }),
    getProfile: build.query({
      query: () => ({ url: "/admin/profile" }),
      transformResponse: (response) => response.data,
      providesTags: ["ADM_PROFILE"],
    }),
    updateProfile: build.mutation({
      query: (body) => ({ url: "/admin/profile", method: "PATCH", body }),
      transformResponse: (response) => response.data,
      providesTags: ["ADM_PROFILE"],
    }),
    changePassword: build.mutation({
      query: (body) => ({ url: "/admin/profile/change-password", method: "POST", body }),
      providesTags: ["ADM_PROFILE"],
    }),
  }),
});

export const {
  useLoginMutation,
  usePasswordForgotMutation,
  usePasswordResetMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;

export default authApi;
