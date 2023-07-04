/* eslint-disable react/prop-types */
/**
 * This component is used to display the modal for editing pokemon details
 */
// importing icons
import { GrFormClose } from "react-icons/gr";

// importing hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// importing action creators
import { editModal } from "../../slices/modalDisplayStatusSlice";
import { statusSelector } from "../../slices/loadingSlice";
import { editPokemon } from "../../slices/pokemonListSlice";

// importing components
import LoadingPage from "../LoadingPage/LoadingPage";

// importing firebase related methods
import { db } from "../../../firebaseConfig";
import { setStatus } from "../../slices/loadingSlice";
import { doc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

export default function EditPokemonModal({ pokemon }) {
  let dispatch = useDispatch();

  let navigate = useNavigate();

  let status = useSelector(statusSelector);

  // state for form input
  let [name, setName] = useState(pokemon.details.name);
  let [desc, setDesc] = useState(pokemon.details.desc);
  let [category, setCategory] = useState(pokemon.details.category);
  let [height, setHeight] = useState(pokemon.details.height);
  let [weight, setWeight] = useState(pokemon.details.weight);
  let [gender, setGender] = useState(pokemon.details.gender);
  let [abilities, setAbilities] = useState(
    pokemon.details.abilities.join(", ")
  );
  let [weakness, setWeakness] = useState(pokemon.details.weakness.join(", "));

  // this function will edit the pokemon details in redux store as well as firestore database
  function handleEditPokemon(e) {
    e.preventDefault();

    dispatch(setStatus("loading"));

    setDoc(doc(db, "pokemons", pokemon.id), {
      name: name,
      desc: desc,
      image: pokemon.details.image,
      category: category,
      height: height,
      weight: weight,
      gender: gender,
      abilities: abilities.split(",").map((word) => word.trim()),
      weakness: weakness.split(",").map((word) => word.trim()),
    })
      .then(() => {
        dispatch(
          editPokemon({
            id: pokemon.id,
            details: {
              name: name,
              desc: desc,
              image: pokemon.details.image,
              category: category,
              height: height,
              weight: weight,
              gender: gender,
              abilities: abilities.split(",").map((word) => word.trim()),
              weakness: weakness.split(",").map((word) => word.trim()),
            },
          })
        );
        dispatch(setStatus("idle"));
        dispatch(editModal(false));
        toast.success("Pokemon modified", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/dashboard");
      })
      // catch block for setDoc
      .catch((error) => {
        dispatch(setStatus("idle"));
        toast.error(error.message, {
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
    <main className="w-screen h-screen fixed top-0 left-0 bg-transparent backdrop-blur flex justify-center items-center text-gray-800">
      <section className="w-1/2 h-[75%] p-4 bg-white rounded-xl drop-shadow-lg flex flex-col gap-4 sm:w-[80%] mobile:w-[95%]">
        {/* heading */}
        <div className="flex justify-between items-center font-bold text-3xl">
          <h1>Edit your Pokemon</h1>
          {/* <button> */}
          <GrFormClose
            className="hover:outline hover:outline-8 hover:outline-offset-0 hover:outline-gray-100 hover:rounded-full hover:bg-gray-100"
            onClick={() => dispatch(editModal(false))}
          />
          {/* </button> */}
        </div>

        {/* form to edit pokemon details */}
        <form
          className="scrollBar flex-1 flex flex-col gap-4 overflow-y-scroll pr-2"
          onSubmit={handleEditPokemon}
        >
          {/* name */}
          <div className="w-full">
            <label htmlFor="pokemonName" className="text-lg font-bold">
              Name<span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              id="pokemonName"
              name="pokemonName"
              className="w-full p-2 pl-2 pr-2 border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              placeholder="Your Pokemon Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* description */}
          <div className="w-full">
            <label htmlFor="pokemonName" className="text-lg font-bold">
              Description<span className="text-red-800">*</span>
            </label>
            <textarea
              id="pokemonName"
              name="pokemonName"
              rows="5"
              className="scrollBar w-full p-2 pl-2 pr-2 border-2 border-gray-800 resize-y rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              placeholder="You Pokemon Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* category */}
          <div className="w-full">
            <label htmlFor="pokemonCategories" className="text-lg font-bold">
              Category<span className="text-red-800">*</span>
            </label>
            <select
              type="text"
              id="pokemonCategories"
              name="pokemonCategories"
              className="scrollBar w-full p-2 pl-2 pr-2 border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Your Pokemon Category
              </option>
              <option value="Normal">Normal</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Grass">Grass</option>
              <option value="Rock">Rock</option>
              <option value="Fighting">Fighting</option>
              <option value="Psychic">Psychic</option>
              <option value="Ghost">Ghost</option>
              <option value="Bug">Bug</option>
              <option value="Poison">Poison</option>
              <option value="Flying">Flying</option>
              <option value="Electric">Electric</option>
              <option value="Ground">Ground</option>
              <option value="Ice">Ice</option>
              <option value="Dragon">Dragon</option>
              <option value="Dark">Dark</option>
              <option value="Steel">Steel</option>
              <option value="Fairy">Fairy</option>
            </select>
          </div>

          {/* height*/}
          <div className="w-full">
            <label htmlFor="pokemonHeight" className="text-lg font-bold">
              Height<span className="text-red-800">*</span>
            </label>
            <input
              type="number"
              id="pokemonHeight"
              name="pokemonHeight"
              className="w-full p-2 pl-2 pr-2 border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              placeholder="Your Pokemon Height in Inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          {/* weight */}
          <div className="w-full">
            <label htmlFor="pokemonWeight" className="text-lg font-bold">
              Weight<span className="text-red-800">*</span>
            </label>
            <input
              type="number"
              id="pokemonWeight"
              name="pokemonWeight"
              className="w-full p-2 pl-2 pr-2 border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              placeholder="Your Pokemon Weight in KGS"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* gender */}
          <div className="w-full">
            <label htmlFor="pokemonGender" className="text-lg font-bold">
              Gender<span className="text-red-800">*</span>
            </label>
            <select
              type="text"
              id="pokemonGender"
              name="pokemonGender"
              className="scrollBar w-full p-2 pl-2 pr-2 border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Your Pokemon Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* abilities */}
          <div className="w-full">
            <label htmlFor="pokemonAbilities" className="text-lg font-bold">
              Abilities<span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              id="pokemonAbilities"
              name="pokemonAbilities"
              className="w-full p-2 pl-2 pr-2 border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              placeholder="Abilities seperate by comma"
              value={abilities}
              onChange={(e) => setAbilities(e.target.value)}
            />
          </div>

          {/* weaknessess */}
          <div className="w-full">
            <label htmlFor="pokemonWeakness" className="text-lg font-bold">
              Weaknesses<span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              id="pokemonWeakness"
              name="pokemonWeakness"
              className="w-full p-2 pl-2 pr-2 border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800"
              required
              placeholder="Weaknesses seperated by comma"
              value={weakness}
              onChange={(e) => setWeakness(e.target.value)}
            />
          </div>

          {/* submit button */}
          <input
            type="submit"
            value="Save my pokemon"
            className="w-max p-2 pl-6 pr-6 bg-gray-800 rounded-md text-white cursor-pointer hover:bg-gray-900"
          />
        </form>
      </section>

      {/* conditionally rendering the loading page */}
      {status === "loading" && <LoadingPage />}
    </main>
  );
}
