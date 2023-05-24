import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./adapters/router";
import ModalStoreProvider from "./store/2_context";
import UserStoreProvider from "./store/3_context";

function App() {
  return (
    // <ModalStoreProvider>
    //   <RouterProvider router={router} />
    // </ModalStoreProvider>
    <UserStoreProvider>
      <RouterProvider router={router} />
    </UserStoreProvider>
  );
}

export default App;
