import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  addModal: false,
  deleteModal: false,
};

let modalDisplayState = createSlice({
  name: "modalDisplayState",
  initialState,
  reducers: {
    addModal: (state, action) => {
      state.addModal = action.payload;
    },
    deleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
  },
});

export const { addModal, deleteModal } = modalDisplayState.actions;

export default modalDisplayState.reducer;
