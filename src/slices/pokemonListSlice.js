/**
 * This slice is used to store the pokemon data
 * This slice enalesto perform all the CRUD operation on storestate
 */

import { createSlice } from "@reduxjs/toolkit";
let initialState = [];

let pokemonSlice = createSlice({
  name: "pokemonList",
  initialState,
  reducers: {
    loadPokemon: (state, action) => {
      return action.payload;
    },
    addPokemon: (state, action) => {
      state.push(action.payload);
    },
    removePokemon: (state, action) => {
      return state.filter((item) => {
        return item.id != action.payload;
      });
    },
    editPokemon: (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.id) {
          item.details = action.payload.details;
        }
      });
    },
  },
});

// exporting action creators
export const { loadPokemon, addPokemon, removePokemon, editPokemon } =
  pokemonSlice.actions;

// exporting reducer
export default pokemonSlice.reducer;

// exporting selector function
export function pokemonListSelector(state) {
  return state.pokemonList;
}
