import { Navigate, createBrowserRouter } from "react-router-dom";
import Cart from "../components/cart";
import Todo from "../components/todo";
import List from "../components/list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/cart"} />,
  },
  {
    path: "/cart",
    children: [
      {
        path: "",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/todo",
    children: [
      {
        path: "",
        element: <Todo />,
      },
    ],
  },
  {
    path: "/board",
    children: [
      {
        path: "",
        element: <List />,
      },
    ],
  },
]);

export default router;
