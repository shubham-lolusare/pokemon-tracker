/**
 * This slicse keeps the track of the loading status
 * The status may be the network fectiong or route loading
 */
import { createSlice } from "@reduxjs/toolkit";

let status = createSlice({
  name: "status",
  initialState: {
    value: "idle",
  },
  reducers: {
    setStatus: (state, action) => {
      state.value = action.payload;
    },
  },
});

// exporting action creators
export const { setStatus } = status.actions;

// exporting reducer
export default status.reducer;

// exporting selector function
export const statusSelector = (state) => {
  return state.status.value;
};
