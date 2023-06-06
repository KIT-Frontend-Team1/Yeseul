import { axiosInstance } from "utils/axios";

const useDelete = (endpoint, todoList, setTodoList) => {
  const handleDeleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`${endpoint}/${id}`, { id });
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return handleDeleteTodo;
};

export default useDelete;
