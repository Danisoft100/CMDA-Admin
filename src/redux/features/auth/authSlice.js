import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  verifyEmail: "",
  notAllowed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setVerifyEmail: (state, action) => {
      state.verifyEmail = action.payload;
    },
    toggleNotAllowed: (state, action) => {
      state.notAllowed = action.payload;
    },
  },
});

export const { setUser, logout, setVerifyEmail, toggleNotAllowed } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
