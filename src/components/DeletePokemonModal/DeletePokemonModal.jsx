/* eslint-disable react/prop-types */
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteModal } from "../../slices/modalDisplayStatusSlice";

import { removePokemon } from "../../slices/pokemonListSlice";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import { toast } from "react-toastify";

export default function DeletePokemonModal({ pokemon }) {
  //   console.log(pokemon.id);
  let dispatch = useDispatch();

  function handleDelete() {
    dispatch(removePokemon(pokemon.id));
    deleteDoc(doc(db, "pokemons", pokemon.id)).then(() => {
      dispatch(deleteModal(false));
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
    <main className="w-screen h-screen absolute top-0 left-0 bg-transparent backdrop-blur flex justify-center items-center text-gray-800">
      <section className="w-1/2 h-1/4 p-4 bg-white rounded-xl drop-shadow-lg flex flex-col gap-4 sm:w-[80%] mobile:w-[95%] sm:h-max tall:h-max">
        {/* heading */}
        <div className="flex justify-between items-center font-bold text-3xl mobile:text-2xl">
          <h1>Delete your Pokemon!!!</h1>

          <GrFormClose
            className="hover:outline hover:outline-8 hover:outline-offset-0 hover:outline-gray-100 hover:rounded-full hover:bg-gray-100"
            onClick={() => dispatch(deleteModal(false))}
          />
        </div>

        <p className="text-xl font-semibold mobile:text-lg">{`Are you sure you want to delete ${pokemon.details.name}?`}</p>

        <div className="flex-1 flex justify-start items-end gap-4 ">
          <button
            onClick={handleDelete}
            className="bg-gray-800 text-white text-xl pl-4 pr-4 p-2 rounded-md hover:bg-gray-900 mobile:text-lg"
          >
            Yes
          </button>
          <button
            onClick={() => dispatch(deleteModal(false))}
            className="bg-gray-800 text-white text-xl pl-4 pr-4 p-2 rounded-md hover:bg-gray-900 mobile:text-lg"
          >
            No
          </button>
        </div>
      </section>
    </main>
  );
}
