import { Outlet } from "react-router-dom";

// component used to display toast notification
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}
