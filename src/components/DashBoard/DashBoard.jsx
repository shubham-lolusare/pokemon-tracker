import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";

import desktopBG from "../../assets/dashboardDesktopWallpaper.jpg";
import mobileBG from "../../assets/dashboardMobileWallpaper.jpg";
import tabletBG from "../../assets/dashboardTabletWallpaper.jpg";

import { FaPlus } from "react-icons/fa";
import AddPokemonModal from "../AddPokemonModal/AddPokemonModal";
import { useDispatch, useSelector } from "react-redux";
import { addModal } from "../../slices/modalDisplayStatusSlice";

import {
  loadPokemon,
  pokemonListSelector,
} from "../../slices/pokemonListSlice";
import { useEffect } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export async function dashBoardDataLoader() {
  let arr = [];
  const querySnapshot = await getDocs(collection(db, "pokemons"));
  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, details: doc.data() });
  });
  // console.log("loader");
  return arr;
}

export default function DashBoard() {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let pokemonLoaderData = useLoaderData();

  let pokemonList = useSelector(pokemonListSelector);

  let addModalStatus = useSelector(
    (state) => state.modalDisplayStatus.addModal
  );

  useEffect(() => {
    dispatch(loadPokemon(pokemonLoaderData));
  }, [pokemonLoaderData]);

  return (
    <main className="relative h-screen w-screen">
      {/* this component will display the image according to the device width */}
      <section className="absolute left-0 top-0 w-full h-full z-[-1] ">
        <picture>
          {/* for mobiles */}
          <source
            media="(max-width: 520px)"
            srcSet={mobileBG}
            className="w-full h-full"
          />
          {/* for tablets */}
          <source
            media="(max-width: 912px)"
            srcSet={tabletBG}
            className="w-full h-full"
          />
          {/* default for desktops */}
          <img src={desktopBG} className="w-full h-full" />
        </picture>
      </section>

      <section className="relative w-full h-full bg-gray-100/90 p-4 flex flex-col gap-4 xs:p-2">
        <h1 className="text-6xl font-bold text-gray-800 flex justify-center items-center gap-[8vw] sm:gap-10 mobile:flex-col mobile:gap-2 mobile:text-4xl xs:text-2xl">
          {"POKEMON TRACKER".split(" ").map((word, index) => (
            <div
              className="w-full flex justify-between items-center"
              key={index + 1}
            >
              {word.split("").map((letter, index) => (
                <span key={index + 1}>{letter}</span>
              ))}
            </div>
          ))}
        </h1>

        <section className="w-[900px] self-center flex-1 flex flex-col gap-4 sm:w-full overflow-hidden">
          <h1 className="text-center text-3xl font-bold xs:text-lg">
            My Pokemons
          </h1>
          {pokemonList.length != 0 ? (
            <section className="overflow-y-scroll scrollBar pr-2 flex flex-wrap gap-4 sm:justify-center ">
              {pokemonList.map((pokemon) => {
                return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
              })}
            </section>
          ) : (
            <p className="text-center">No pokemons added</p>
          )}
        </section>

        <button
          className="absolute bottom-12 right-12 text-2xl bg-gray-800 text-yellow-50 p-4 rounded-full hover:outline hover:outline-8 hover:outline-offset-0 hover:outline-gray-300"
          onClick={() => dispatch(addModal(true))}
        >
          <FaPlus className="bg-transparent" />
        </button>
      </section>

      {navigation.state === "loading" && <LoadingPage />}

      {addModalStatus && <AddPokemonModal />}
    </main>
  );
}
