import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/global";
import { Provider } from "react-redux";
import router from "./routes/routing";
import { store } from "./store/store";
import { worker } from "__mock__/handler";
function App() {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}
export default App;
