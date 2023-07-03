import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useLoaderData } from "react-router-dom";

export async function pokemonDetailLoader({ params }) {
  let obj = {};
  const querySnapshot = await getDocs(collection(db, "pokemons"));
  querySnapshot.forEach((doc) => {
    if (doc.id == params.pokemonID) obj = doc.data();
  });
  return obj;
}

export default function PokemonDetailPage() {
  let pokemonData = useLoaderData();
  return <div></div>;
}
