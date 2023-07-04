/* eslint-disable react/prop-types */
/**
 * This component is used to display the details of the pokemon selected
 * Here user can edit details as well as delete pokemon
 */
// importing firebase related methods
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { storage } from "../../../firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { setDoc } from "firebase/firestore";

// importing hooks
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

// importing components
import LoadingPage from "../LoadingPage/LoadingPage";
import EditPokemonModal from "../EditPokemonModal/EditPokemonModal";

// importing images
import desktopBG from "../../assets/dashboardDesktopWallpaper.jpg";
import mobileBG from "../../assets/dashboardMobileWallpaper.jpg";
import tabletBG from "../../assets/dashboardTabletWallpaper.jpg";

// importing action creators
import { editModal } from "../../slices/modalDisplayStatusSlice";
import { setStatus, statusSelector } from "../../slices/loadingSlice";
import { removePokemon } from "../../slices/pokemonListSlice";
import { editPokemon } from "../../slices/pokemonListSlice";

import { toast } from "react-toastify";

// loader function to load the pokemon details selected
export async function pokemonDetailLoader({ params }) {
  let obj = {};
  const querySnapshot = await getDocs(collection(db, "pokemons"));
  querySnapshot.forEach((doc) => {
    if (doc.id == params.pokemonID) {
      obj.id = params.pokemonID;
      obj.details = doc.data();
    }
  });
  return obj;
}

export default function PokemonDetailPage() {
  let navigate = useNavigate();
  let navigation = useNavigation();

  let pokemonData = useLoaderData();

  let pokemonList = useSelector((state) => state.pokemonList);
  let editModalStatus = useSelector(
    (state) => state.modalDisplayStatus.editModal
  );
  let status = useSelector(statusSelector);

  let dispatch = useDispatch();

  let [image, setImage] = useState(null);

  useEffect(() => {
    if (pokemonList.length == 0) {
      navigate("/dashboard");
    }
  });

  // this function deleted the pokemon from firestore database as well as redux store
  function handleDeletePokemon() {
    dispatch(setStatus("loading"));
    dispatch(removePokemon(pokemonData.id));
    deleteDoc(doc(db, "pokemons", pokemonData.id)).then(() => {
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
      navigate("/dashboard");
    });
  }

  // this functionwill be used to update the image of the pokemon
  function handleUpdateImage(e) {
    e.preventDefault();

    dispatch(setStatus("loading"));

    if (image != null) {
      const imageRef = ref(storage, pokemonData.details.name);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setDoc(doc(db, "pokemons", pokemonData.id), {
                name: pokemonData.details.name,
                desc: pokemonData.details.desc,
                image: url,
                category: pokemonData.details.category,
                height: pokemonData.details.height,
                weight: pokemonData.details.weight,
                gender: pokemonData.details.gender,
                abilities: pokemonData.details.abilities,
                weakness: pokemonData.details.weakness,
              })
                .then(() => {
                  dispatch(
                    editPokemon({
                      id: pokemonData.id,
                      details: {
                        name: pokemonData.details.name,
                        desc: pokemonData.details.desc,
                        image: url,
                        category: pokemonData.details.category,
                        height: pokemonData.details.height,
                        weight: pokemonData.details.weight,
                        gender: pokemonData.details.gender,
                        abilities: pokemonData.details.abilities,
                        weakness: pokemonData.details.weakness,
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
    <main className="relative h-screen w-screen overflow-hidden">
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

      <section className="scrollBar relative w-full h-full bg-gray-100/90 p-4 flex flex-col gap-4 overflow-y-scroll xs:p-2">
        <section className="w-2/3 self-center flex flex-col items-center gap-4 sm:w-full">
          {/* name */}
          <h1 className="pl-4 pr-4 text-center mb-4 border-t-8 border-l-8 border-r-8 border-gray-800 pt-4 rounded-3xl text-4xl font-bold sm:break-words w-full">
            {pokemonData.details.name.toUpperCase()}
          </h1>

          <div className="w-full flex gap-4 sm:flex-col sm:items-center tall:flex-col tall:items-center">
            {/* pokemon image */}
            <div className="relative w-[500px] h-[500px] border-8 rounded-xl shadow-md border-double bg-gray-800 border-orange-500 sm:w-[80%] mobile:w-full">
              <img
                src={pokemonData.details.image}
                className="w-full h-full object-contain"
              />

              {/* image select input */}
              <div className="w-full absolute bottom-0 left-0 flex items-center">
                <input
                  id="pokemonImage"
                  name="pokemonImage"
                  className="w-full bg-white/50 border-t-2 border-orange-500 rounded-bl file:bg-gray-800 file:outline-0 file:text-white file:cursor-pointer cursor-pointer file:border-0 file:p-2 "
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />

                {/* button to submit image change */}
                <button
                  onClick={handleUpdateImage}
                  className="h-full rounded-br p-2 text-white flex justify-center items-center border-t-2 border-orange-500 bg-gray-800"
                >
                  Update
                </button>
              </div>
            </div>

            {/* pokemon details */}
            <div className="p-4 scrollBar w-[500px] h-[500px] bg-orange-500/30 rounded-lg flex flex-col gap-4 sm:w-[80%] mobile:w-full overflow-y-scroll sm:overflow-visible sm:h-max">
              {/* description */}
              <p className="text-lg">{pokemonData.details.desc}</p>

              {/* category */}
              <div className="bg-orange-500 p-2 rounded-md text-center font-bold">
                {pokemonData.details.category}
              </div>

              <div className="w-full flex justify-evenly items-center gap-4 flex-col">
                {/* height */}
                <div className="bg-gray-800 text-white w-full text-center p-2 rounded-md">
                  Height: {pokemonData.details.height};
                </div>

                {/* weight */}
                <div className="bg-gray-800 text-white w-full text-center p-2 rounded-md">
                  Weight: {pokemonData.details.weight}kgs
                </div>

                {/* gender */}
                <div className="bg-gray-800 text-white w-full text-center p-2 rounded-md">
                  Gender: {pokemonData.details.gender}
                </div>
              </div>

              {/* abilities */}
              <div className="bg-gray-800 text-white w-full p-2 pl-4 pr-4 rounded-md">
                <h1>Ablities</h1>
                <div className="mt-2 flex flex-wrap gap-2 flex-grow">
                  {pokemonData.details.abilities.map((item, index) => {
                    return (
                      <div
                        className="bg-rose-500 p-2 rounded-md text-center"
                        key={index + 1}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* weaknesses */}
              <div className="bg-gray-800 text-white w-full p-2 pl-4 pr-4 rounded-md">
                <h1>Weaknesses</h1>
                <div className="mt-2 flex flex-wrap gap-2 flex-grow">
                  {pokemonData.details.weakness.map((item, index) => {
                    return (
                      <div
                        className="bg-rose-500 p-2 rounded-md text-center"
                        key={index + 1}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* button */}
          <div className="w-full h-full flex justify-evenly items-center gap-4 text-white sm:w-[80%] mobile:w-full tall:w-[100%]">
            {/* edit */}
            <button
              onClick={() => dispatch(editModal(true))}
              className="bg-gray-800 w-full p-4 rounded-xl text-lg sm:text-base hover:bg-gray-900"
            >
              Edit
            </button>

            {/* delete */}
            <button
              onClick={handleDeletePokemon}
              className="bg-gray-800 w-full p-4 rounded-xl text-lg sm:text-base hover:bg-gray-900"
            >
              Delete
            </button>
          </div>

          {/* go back */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-800 p-4 rounded-xl text-lg sm:text-base hover:bg-gray-900 w-full h-full flex justify-evenly items-center gap-4 text-white sm:w-[80%] mobile:w-full tall:w-[100%]"
          >
            Go To Dashboard
          </button>
        </section>
      </section>

      {/* conditionally rendering loading page */}
      {navigation.state === "loading" && <LoadingPage />}

      {/* conditionally rendering loading page */}
      {status === "loading" && <LoadingPage />}

      {/* conditionally rendering the edit pokemon modal */}
      {editModalStatus && <EditPokemonModal pokemon={pokemonData} />}
    </main>
  );
}
