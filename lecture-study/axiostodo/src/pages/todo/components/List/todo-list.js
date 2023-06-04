import OneTodo from "./one-todo";
import { axiosInstance } from "utils/axios";

// axiosInstance로 체크, 수정, 삭제 구현하기
const TodoList = ({ todoList, setTodoList }) => {
  // 체크 함수, setTodoList state를 true > false, false > true 로 바꿔주기
  const handleCheckTodo = async (id, state) => {
    try {
      const newTodoList = [...todoList];
      const todo = newTodoList.find((todo) => todo.id === id);
      todo.state = !state; // 현재 state 반대값
      await axiosInstance.put(`/todo/${id}`, { id, state });
      setTodoList(newTodoList); // UI 업데이트
    } catch (err) {
      console.err("Error!");
    }
  };

  // 수정 함수
  const handleUpdateTodo = async (id, content) => {
    try {
      await axiosInstance.put(`/todo/${id}`, { id, content });
      const newTodoList = [...todoList];
      const todo = newTodoList.find((todo) => todo.id === id);
      todo.content = content;
      setTodoList(newTodoList);
    } catch (err) {
      console.error("Error!");
    }
  };

  // 삭제 함수
  const handleDeleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`, { id });
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

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
