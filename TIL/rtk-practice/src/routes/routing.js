import { Navigate, createBrowserRouter } from "react-router-dom";
import Cart from "../components/cart";
import Todo from "../components/todo";
import Board from "../components/board";

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
        element: <Board />,
      },
    ],
  },
]);

export default router;
