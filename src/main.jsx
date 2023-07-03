import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./app/store.js";
import { dashBoardDataLoader } from "./components/DashBoard/DashBoard.jsx";
import { pokemonDetailLoader } from "./components/PokemonDetailPage/PokemonDetailPage.jsx";

import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import DashBoard from "./components/DashBoard/DashBoard.jsx";
import PokemonDetailPage from "./components/PokemonDetailPage/PokemonDetailPage.jsx";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route
        path="dashboard"
        element={<DashBoard />}
        loader={dashBoardDataLoader}
      ></Route>
      <Route
        path="/:pokemonID"
        element={<PokemonDetailPage />}
        loader={pokemonDetailLoader}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
