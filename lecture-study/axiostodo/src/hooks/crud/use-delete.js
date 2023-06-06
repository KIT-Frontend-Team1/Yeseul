import { axiosInstance } from "utils/axios";
import { deleteTodoApi } from "./api.todo";

const useDelete = (endpoint, todoList, setTodoList) => {
  const handleDeleteTodo = async (id) => {
    try {
      // await axiosInstance.delete(`${endpoint}/${id}`, { id });

      // api call 관심사 분리
      await deleteTodoApi(endpoint, id);

      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return handleDeleteTodo;
};

export default useDelete;
