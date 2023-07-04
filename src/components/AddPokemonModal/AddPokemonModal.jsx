/**
 * This modal is used to add the pokemon
 */

// importing icons
import { GrFormClose } from "react-icons/gr";

// importing hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// importing action creators from slices
import { addModal } from "../../slices/modalDisplayStatusSlice";
import { setStatus, statusSelector } from "../../slices/loadingSlice";
import { addPokemon } from "../../slices/pokemonListSlice";

// importing firebase related methods
import { storage, db } from "../../../firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { toast } from "react-toastify";

// importing components
import LoadingPage from "../LoadingPage/LoadingPage";

export default function AddPokemonModal() {
  // Accessing store state for loading status
  let status = useSelector(statusSelector);

  let dispatch = useDispatch();

  // states for form inputs
  let [name, setName] = useState("");
  let [desc, setDesc] = useState("");
  let [image, setImage] = useState(null);
  let [category, setCategory] = useState("");
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [gender, setGender] = useState("");
  let [abilities, setAbilities] = useState("");
  let [weakness, setWeakness] = useState("");

  // this function will add the pokemon to redux store as well as firestore database
  function handleAddPokemon(e) {
    e.preventDefault();

    dispatch(setStatus("loading"));

    if (image != null) {
      const imageRef = ref(storage, name);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              // adding collection
              addDoc(collection(db, "pokemons"), {
                name: name,
                desc: desc,
                image: url,
                category: category,
                height: height,
                weight: weight,
                gender: gender,
                abilities: abilities.split(",").map((word) => word.trim()),
                weakness: weakness.split(",").map((word) => word.trim()),
              })
                .then((data) => {
                  dispatch(
                    addPokemon({
                      id: data.id,
                      details: {
                        name: name,
                        desc: desc,
                        image: url,
                        category: category,
                        height: height,
                        weight: weight,
                        gender: gender,
                        abilities: abilities
                          .split(",")
                          .map((word) => word.trim()),
                        weakness: weakness
                          .split(",")
                          .map((word) => word.trim()),
                      },
                    })
                  );
                  dispatch(setStatus("idle"));
                  dispatch(addModal(false));
                  toast.success("Pokemon added", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                })
                // catch block for addDoc
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
            })
            // catch block for getDownloadurl function
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
        })
        // catch block for uploadBytes function
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
    } else {
      dispatch(setStatus("idle"));
      toast.error("Please select a valid image file", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <main className="w-screen h-screen fixed top-0 left-0 bg-transparent backdrop-blur flex justify-center items-center text-gray-800">
      <section className="w-1/2 h-[75%] p-4 bg-white rounded-xl drop-shadow-lg flex flex-col gap-4 sm:w-[80%] mobile:w-[95%]">
        {/* heading */}
        <div className="flex justify-between items-center font-bold text-3xl">
          <h1>Add your Pokemon</h1>
          {/* <button> */}
          <GrFormClose
            className="hover:outline hover:outline-8 hover:outline-offset-0 hover:outline-gray-100 hover:rounded-full hover:bg-gray-100"
            onClick={() => dispatch(addModal(false))}
          />
          {/* </button> */}
        </div>

        {/* add pokemon form */}
        <form
          className="scrollBar flex-1 flex flex-col gap-4 overflow-y-scroll pr-2"
          onSubmit={handleAddPokemon}
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

          {/* image */}
          <div className="w-full">
            <label htmlFor="pokemonImage" className="text-lg font-bold">
              Image<span className="text-red-800">*</span>
            </label>
            <input
              id="pokemonImage"
              name="pokemonImage"
              className="w-full border-2 border-gray-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-gray-800 file:bg-gray-800 file:outline-0 file:text-white file:cursor-pointer cursor-pointer file:border-0 file:p-2 "
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
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
            value="Add my pokemon"
            className="w-max p-2 pl-6 pr-6 bg-gray-800 rounded-md text-white cursor-pointer hover:bg-gray-900"
          />
        </form>
      </section>

      {/* conditionally rendering the loading page */}
      {status === "loading" && <LoadingPage />}
    </main>
  );
}
