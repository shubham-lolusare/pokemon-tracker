/* eslint-disable react/prop-types */
/**
 * This component is used to display the pokemon card which lets user to delete the
 * pokemon and display the name and category of the pokemon
 */
// importing icons
import { MdDelete } from "react-icons/md";

// imporitng hooks
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// importing action creators
import { removePokemon } from "../../slices/pokemonListSlice";
import { setStatus, statusSelector } from "../../slices/loadingSlice";

// importing firebase related methods
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import { toast } from "react-toastify";

// importing components
import LoadingPage from "../LoadingPage/LoadingPage";

export default function PokemonCard({ pokemon }) {
  let dispatch = useDispatch();

  let status = useSelector(statusSelector);

  // this function will handle deleteing the pokemon from redux store as wll as firestore data base
  function handleDeletePokemon() {
    dispatch(setStatus("loading"));
    dispatch(removePokemon(pokemon.id));
    deleteDoc(doc(db, "pokemons", pokemon.id)).then(() => {
      dispatch(setStatus(""));
      toast.success("Pokemon deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  }

  return (
    <>
      <article className="animate-fadein transition-all duration-200 ease-linear hover:scale-95 hover:outline hover:outline-8 hover:outline-offset-[-1px] hover:outline-orange-500/50 relative basis-[250px] max-w-[350px] h-[280px] flex-grow rounded-xl shadow-md">
        {/* pokemon image */}
        <img className="h-full w-full rounded-xl" src={pokemon.details.image} />

        <div className="absolute w-full bottom-0 left-0 bg-black/60 text-white rounded-br-xl rounded-bl-xl p-2 pl-4 pr-4">
          {/* name */}
          <h1 className="text-2xl break-words">{pokemon.details.name}</h1>
          <div className="mt-4 flex items-center justify-between gap-4 ">
            {/* categoryh */}
            <div className="bg-orange-500 p-1 pl-4 pr-4 rounded-md">
              {pokemon.details.category}
            </div>

            {/* more details */}
            <div className="flex-1 flex justify-end items-center gap-4">
              <Link
                to={`/${pokemon.id}`}
                className="cursor-pointer font-semibold hover:text-orange-500"
              >
                More Details
              </Link>

              {/* delete button */}
              <MdDelete
                onClick={handleDeletePokemon}
                className="text-2xl hover:outline hover:outline-8 hover:outline-offset-[-1px] hover:outline-gray-100 hover:rounded-full hover:bg-gray-100 hover:text-black"
              />
            </div>
          </div>
        </div>
      </article>

      {/* conditionally rendering the loading page */}
      {status === "loading" && <LoadingPage />}
    </>
  );
}
