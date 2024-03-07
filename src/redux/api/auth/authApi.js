import api from "../api";

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
  }),
});

export const { useLoginMutation, usePasswordForgotMutation, usePasswordResetMutation } = authApi;

export default authApi;
