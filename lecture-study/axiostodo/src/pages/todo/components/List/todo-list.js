import useUpdate from "hooks/crud/use-update";
import OneTodo from "./one-todo";
import useDelete from "hooks/crud/use-delete";

const TodoList = ({ todoList, setTodoList }) => {
  const [handleCheckTodo, handleUpdateTodo] = useUpdate(
    "/todo",
    todoList,
    setTodoList
  );

  // 삭제 함수
  const handleDeleteTodo = useDelete("/todo");

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
