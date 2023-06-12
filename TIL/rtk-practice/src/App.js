import { RouterProvider } from "react-router-dom";
import router from "./routes/routing";
import GlobalStyles from "./styles/global";
import { Provider } from "react-redux";
import { store } from "./store/cart-store";
import { worker } from "./__mock__/handler";

function App() {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }

  return (
    <Provider store={store}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
