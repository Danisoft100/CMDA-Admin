import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import tokenSlice from "../features/auth/tokenSlice";
import api from "../api/api";

const rootReducer = combineReducers({
  auth: authSlice,
  token: tokenSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
