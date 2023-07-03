import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  addModal: false,
  editModal: false,
};

let modalDisplayState = createSlice({
  name: "modalDisplayState",
  initialState,
  reducers: {
    addModal: (state, action) => {
      state.addModal = action.payload;
    },
    editModal: (state, action) => {
      state.editModal = action.payload;
    },
  },
});

export const { addModal, editModal } = modalDisplayState.actions;

export default modalDisplayState.reducer;
