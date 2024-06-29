import api from "./api";

const adminsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmins: build.query({
      query: () => ({ url: "/admin" }),
      transformResponse: (response) => response.data,
      providesTags: ["ADMINS"],
    }),
    deleteAdminById: build.mutation({
      query: (id) => ({ url: `/admin/${id}`, method: "DELETE" }),
      invalidatesTags: ["ADMINS"],
    }),
    updateAdminRole: build.mutation({
      query: ({ id, role }) => ({ url: `/admin/role/${role}/${id}`, method: "PATCH" }),
      invalidatesTags: ["ADMINS"],
    }),
    createAdmin: build.mutation({
      query: (body) => ({ url: `/admin`, method: "POST", body }),
      invalidatesTags: ["ADMINS"],
    }),
  }),
});

export const { useGetAllAdminsQuery, useDeleteAdminByIdMutation, useCreateAdminMutation, useUpdateAdminRoleMutation } =
  adminsApi;

export default adminsApi;
