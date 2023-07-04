/**
 * This component is used to display all the pokemons that are added
 */

// importing hooks
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// mporting components
import LoadingPage from "../LoadingPage/LoadingPage";
import AddPokemonModal from "../AddPokemonModal/AddPokemonModal";
import PokemonCard from "../PokemonCard/PokemonCard";

// importing images
import desktopBG from "../../assets/dashboardDesktopWallpaper.jpg";
import mobileBG from "../../assets/dashboardMobileWallpaper.jpg";
import tabletBG from "../../assets/dashboardTabletWallpaper.jpg";

// importing icons
import { FaPlus } from "react-icons/fa";

// importing action creators
import { addModal } from "../../slices/modalDisplayStatusSlice";
import {
  loadPokemon,
  pokemonListSelector,
} from "../../slices/pokemonListSlice";

// importing firebase related methods
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

// loader function which loads pokemon data on routing
export async function dashBoardDataLoader() {
  let arr = [];
  const querySnapshot = await getDocs(collection(db, "pokemons"));
  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, details: doc.data() });
  });
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

      {/* heading */}
      <section className="relative w-full h-full bg-gray-100/90 p-4 flex flex-col gap-4 xs:p-2">
        <Link
          to="/"
          className="text-6xl font-bold text-gray-800 flex justify-center items-center gap-[8vw] sm:gap-10 mobile:flex-col mobile:gap-2 mobile:text-4xl xs:text-2xl"
        >
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
        </Link>

        <section className="w-[900px] self-center flex-1 flex flex-col gap-4 sm:w-full overflow-hidden sm:mb-14 ">
          <h1 className="text-center text-3xl font-bold xs:text-lg">
            My Pokemons
          </h1>

          {/* pokemon cards */}
          {pokemonList.length != 0 ? (
            <section className="overflow-y-scroll scrollBar pr-2 flex flex-wrap gap-4 sm:justify-center ">
              {pokemonList.map((pokemon) => {
                return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
              })}
            </section>
          ) : (
            <p className="text-center">No pokemons present</p>
          )}
        </section>

        {/* Add modal button */}
        <button
          className="fixed bottom-12 right-12 sm:bottom-0 sm:left-[-5px] sm:right-[-5px] sm:rounded-none sm:h-12 sm:flex sm:justify-center sm:items-center bg-gray-800 text-white p-4 rounded-full hover:outline hover:outline-8 hover:outline-offset-0 hover:outline-gray-300"
          onClick={() => dispatch(addModal(true))}
        >
          <FaPlus className="sm:hidden" />
          <span className="hidden sm:block">Add your Pokemon</span>
        </button>
      </section>

      {/* conditionally rendering the loading page */}
      {navigation.state === "loading" && <LoadingPage />}

      {/* conditionally rendering the Add pokemon modal */}
      {addModalStatus && <AddPokemonModal />}
    </main>
  );
}
