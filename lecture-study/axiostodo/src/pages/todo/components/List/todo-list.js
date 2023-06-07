import { useTodoStore } from "contexts/todo.context";
import OneTodo from "./one-todo";
import useCrud from "hooks/use-crud";

const TodoList = () => {
  const { todoList } = useTodoStore();
  const { handleCheckTodo, handleUpdateTodo, handleDeleteTodo } = useCrud();

  return (
    <>
      {todoList.map((todo) => (
        <OneTodo
          todo={todo}
          handleCheckTodo={handleCheckTodo}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </>
  );
};

export default TodoList;
