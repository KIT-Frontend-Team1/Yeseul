import { useTodoStore } from "contexts/todo.context";
import OneTodo from "./one-todo";
import useCrud from "hooks/use-crud";

const TodoList = () => {
  const { todoList } = useTodoStore();
  const { handleUpdateTodo, handleDeleteTodo } = useCrud();

  return (
    <>
      {todoList.map((todo) => (
        <OneTodo
          todo={todo}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </>
  );
};

export default TodoList;
