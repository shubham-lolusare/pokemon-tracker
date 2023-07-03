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

export const { setStatus } = status.actions;

export default status.reducer;

export const statusSelector = (state) => {
  return state.status.value;
};
