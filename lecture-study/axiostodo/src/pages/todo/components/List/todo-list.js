import { useTodoStore } from "contexts/todo.context";
import OneTodo from "./one-todo";

const TodoList = () => {
  const { todoList } = useTodoStore();

  return (
    <>
      {todoList.map((todo) => (
        <OneTodo todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
