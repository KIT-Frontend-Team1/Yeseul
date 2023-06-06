import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routing";
import GlobalStyles from "./styles/global";
import { Provider } from "react-redux";
import { store } from "./store/cart-store";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
