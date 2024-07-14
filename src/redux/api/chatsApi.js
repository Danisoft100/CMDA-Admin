import api from "./api";

const chatsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllContacts: build.query({
      query: () => ({ url: "/chats/contacts", cache: "no-cache" }),
      transformResponse: (response) => response.data,
    }),
    getChatHistory: build.query({
      query: (id) => ({ url: `/chats/history/${id}` }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllContactsQuery, useGetChatHistoryQuery, useLazyGetAllContactsQuery } = chatsApi;

export default chatsApi;
