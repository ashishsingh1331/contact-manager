import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: {
      message: false,
      status: false,
    },
  },
  reducers: {
    showNotification(state, payload) {
      state.notification = payload.payload;
    },
    hideNotification(state, payload) {
      state.notification = {
        message: false,
        status: false,
      };
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
