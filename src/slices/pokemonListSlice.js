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
  },
});

export const { loadPokemon, addPokemon, removePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;

export function pokemonListSelector(state) {
  return state.pokemonList;
}
