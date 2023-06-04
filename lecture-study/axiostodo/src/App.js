import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
// import router1 from './routes/routing';
// import MainPage from './pages/main';
// import TodoPage from './pages/todo';
// import Layout from './components/Layout';
import router1 from "./routes/routing";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router1} />
    </ThemeProvider>
    // <BrowserRouter>
    // {/* HTML5를 지원하는 브라우저의 URL의 변화를 감지 */}
    // <Routes>
    // {/* 하위에 있는 Route 컴포넌트 중 url과 path가 일치하는 컴포넌트만 보여주는 역할 */}
    //   <Route element={<Layout />}>
    //     <Route path='/' element={<MainPage />} />
    //     <Route path='/todo/:todoId' element={<TodoPage />} />
    //   </Route>
    // </Routes>
    // </BrowserRouter>
    /*
    BrowserRouter(URL 감지) -> Routes(하위에 route 중에 경로에 맞는 컴포넌트를 보여주는 역할)
    Outlet -> routes에 의해 가져와진 컴포넌트를 outlet으로 가지고 올 수 있음
  */
  );
}

export default App;
