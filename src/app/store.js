import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "../components/LoadingPage/loadingSlice";

export default configureStore({
  reducer: {
    status: statusReducer,
  },
});
