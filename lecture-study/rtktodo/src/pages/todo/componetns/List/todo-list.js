import { useDispatch, useSelector } from "react-redux";
import OneTodo from "./one-todo";

const TodoList = () => {
  // todo의 state를 객체로 보냈으므로 todo.todos를 해야 배열이 들어옵니다
  const todoList = useSelector((state) => state.todo.todos);

  return (
    <>
      {todoList.map((todo) => (
        <OneTodo todo={todo} />
      ))}
    </>
  );
};
export default TodoList;
