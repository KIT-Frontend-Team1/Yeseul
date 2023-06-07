import Apis from "apis/api.todo";
import { useEffect } from "react";
import { axiosInstance } from "utils/axios";

const useCrud = () => {
  const apis = Apis();

  // 조회 함수
  const getTodoList = async () => {
    try {
      // const res = await axiosInstance.get("/todo");
      // setTodoList(res.data.data);

      // api call 관심사 분리
      await apis.getTodoApi();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  // 추가 함수
  // async는 Promise를 리턴하므로 안에 리턴 써주지 않아도 됨
  const addTodo = async (title, content) => {
    try {
      if (!title || !content) {
        const err = new Error();
        err.type = "empty content";
        err.message = "빈칸을 채워주세요";
        throw err;
      }

      // await axiosInstance.post("/todo", {
      //   title,
      //   content,
      // });

      // api call 관심사 분리
      await apis.addTodoApi(title, content);
    } catch (err) {
      throw err;
    }
  };

  // 수정 함수
  const handleUpdateTodo = async (id, content, state) => {
    try {
      // await axiosInstance.put(`/todo/${id}`, { id, content, state });

      // api call 관심사 분리
      await apis.updateTodoCheckApi(id, content, state);
    } catch (err) {
      console.error("Error!");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // await axiosInstance.delete(`/todo/${id}`, { id });

      // api call 관심사 분리
      await apis.deleteTodoApi(id);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useCrud;
