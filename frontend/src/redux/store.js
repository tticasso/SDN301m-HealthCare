import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slides/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
