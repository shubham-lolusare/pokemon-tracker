/* eslint-disable react/prop-types */
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import desktopBG from "../../assets/dashboardDesktopWallpaper.jpg";
import mobileBG from "../../assets/dashboardMobileWallpaper.jpg";
import tabletBG from "../../assets/dashboardTabletWallpaper.jpg";
import { useDispatch, useSelector } from "react-redux";
import { editModal } from "../../slices/modalDisplayStatusSlice";
import EditPokemonModal from "../EditPokemonModal/EditPokemonModal";
import { useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { setStatus } from "../../slices/loadingSlice";
import { removePokemon } from "../../slices/pokemonListSlice";
import { toast } from "react-toastify";

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
  let dispatch = useDispatch();
  let editModalStatus = useSelector(
    (state) => state.modalDisplayStatus.editModal
  );

  console.log(pokemonData);

  useEffect(() => {
    if (pokemonList.length == 0) {
      navigate("/dashboard");
    }
  });

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
          <h1 className="text-center mb-4 border-t-8 border-l-8 border-r-8 border-gray-800 pt-4 rounded-3xl pl-[4vw] text-4xl font-bold tracking-[4vw]">
            {pokemonData.details.name.toUpperCase()}
          </h1>
          <div className="w-full flex gap-4 sm:flex-col sm:items-center tall:flex-col tall:items-center">
            <div className="w-[500px] h-[500px] border-8 rounded-xl shadow-md border-double bg-gray-800 border-orange-500 sm:w-[80%] mobile:w-full">
              <img
                src={pokemonData.details.image}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 scrollBar w-[500px] h-[500px] bg-orange-500/30 rounded-lg flex flex-col gap-4 sm:w-[80%] mobile:w-full overflow-y-scroll sm:overflow-visible sm:h-max">
              <p className="text-lg">{pokemonData.details.desc}</p>
              <div className="bg-orange-500 p-2 rounded-md text-center font-bold">
                {pokemonData.details.category}
              </div>

              <div className="w-full flex justify-evenly items-center gap-4 flex-col">
                <div className="bg-gray-800 text-white w-full text-center p-2 rounded-md">
                  Height: {pokemonData.details.height}&quot;
                </div>
                <div className="bg-gray-800 text-white w-full text-center p-2 rounded-md">
                  Weight: {pokemonData.details.weight}kgs
                </div>
                <div className="bg-gray-800 text-white w-full text-center p-2 rounded-md">
                  Gender: {pokemonData.details.gender}
                </div>
              </div>

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

          <div className="w-full h-full flex justify-evenly items-center gap-4 text-white sm:w-[80%] mobile:w-full tall:w-[75%]">
            <button
              onClick={() => dispatch(editModal(true))}
              className="bg-gray-800 w-full p-4 rounded-xl text-lg hover:bg-gray-900"
            >
              Edit
            </button>
            <button
              onClick={handleDeletePokemon}
              className="bg-gray-800 w-full p-4 rounded-xl text-lg hover:bg-gray-900"
            >
              Delete
            </button>
          </div>
        </section>
      </section>

      {navigation.state === "loading" && <LoadingPage />}

      {editModalStatus && <EditPokemonModal pokemon={pokemonData} />}
    </main>
  );
}
