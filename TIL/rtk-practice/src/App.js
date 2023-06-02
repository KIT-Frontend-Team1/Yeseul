import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routing";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
