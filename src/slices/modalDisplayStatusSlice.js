/**
 * This slice is used to keep the track of display status of all the modals
 * This can also change the display status of modals
 */
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

// exporting action creators
export const { addModal, editModal } = modalDisplayState.actions;

// expoting reducer
export default modalDisplayState.reducer;
