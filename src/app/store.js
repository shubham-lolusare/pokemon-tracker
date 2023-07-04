// this file is the redux store with three slices
/**
 * One Slice to monitor loading status
 * Second one to store the status of modal display
 * Third one to manage the pokemon data stored
 */
import { configureStore } from "@reduxjs/toolkit";

// importing reducers
import statusReducer from "../slices/loadingSlice";
import modalDisplayStatusReducer from "../slices/modalDisplayStatusSlice";
import pokemonListReducer from "../slices/pokemonListSlice";

export default configureStore({
  reducer: {
    status: statusReducer,
    modalDisplayStatus: modalDisplayStatusReducer,
    pokemonList: pokemonListReducer,
  },
});
