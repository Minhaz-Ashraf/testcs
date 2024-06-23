import { createSlice } from "@reduxjs/toolkit";

export const redDotSlice = createSlice({
  name: "redDot",
  initialState: {
    isThere: false,
  },

  reducers: {
    isNotification: (state) => {
      state.isThere = true;
    },
    isNotNotification: (state) => {
      state.isThere = false;
    },
  },
});

export const { isNotification, isNotNotification } = redDotSlice.actions;
export const notificationStore = (state) => state.redDot;
export default redDotSlice.reducer;