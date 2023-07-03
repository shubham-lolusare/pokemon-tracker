/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeletePokemonModal from "../DeletePokemonModal/DeletePokemonModal";
import { deleteModal } from "../../slices/modalDisplayStatusSlice";

export default function PokemonCard({ pokemon }) {
  let dispatch = useDispatch();

  let deleteModalStatus = useSelector(
    (state) => state.modalDisplayStatus.deleteModal
  );

  return (
    <>
      <article className="animate-fadein transition-all duration-200 ease-linear hover:scale-95 hover:outline hover:outline-8 hover:outline-offset-[-1px] hover:outline-orange-500/50 relative basis-[250px] max-w-[350px] h-[280px] flex-grow rounded-xl shadow-md">
        <img className="h-full w-full rounded-xl" src={pokemon.details.image} />

        <div className="absolute w-full bottom-0 left-0 bg-black/60 text-white rounded-br-xl rounded-bl-xl p-2 pl-4 pr-4">
          <h1 className="text-3xl">{pokemon.details.name}</h1>
          <div className="mt-4 flex items-center justify-between gap-4 ">
            <div className="bg-orange-500 p-1 pl-4 pr-4 rounded-md">
              {pokemon.details.category}
            </div>
            <div className="flex-1 flex justify-end items-center gap-4">
              <Link
                to={`/${pokemon.id}`}
                className="cursor-pointer font-semibold hover:text-orange-500"
              >
                More Details
              </Link>
              <MdDelete
                onClick={() => dispatch(deleteModal(true))}
                className="text-2xl hover:outline hover:outline-8 hover:outline-offset-[-1px] hover:outline-gray-100 hover:rounded-full hover:bg-gray-100 hover:text-black"
              />
            </div>
          </div>
        </div>
      </article>

      {deleteModalStatus && <DeletePokemonModal pokemon={pokemon} />}
    </>
  );
}