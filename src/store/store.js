import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../slice/contactSlice";
import uiReducer from "../slice/ui-slice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    ui: uiReducer,
  },
});
