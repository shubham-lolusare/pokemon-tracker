import { configureStore } from "@reduxjs/toolkit";

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
