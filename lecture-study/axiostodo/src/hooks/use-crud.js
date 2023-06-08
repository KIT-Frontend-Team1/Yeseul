import Apis from "apis/api.todo";
import { useEffect } from "react";
import { axiosInstance } from "utils/axios";

const useCrud = () => {
  const apis = Apis("/todo");

  // 조회 함수
  const getTodoList = async () => {
    // const res = await axiosInstance.get("/todo");
    // setTodoList(res.data.data);

    // api call 관심사 분리
    await apis.getApi();
  };

  useEffect(() => {
    getTodoList();
  }, []);

  // 추가 함수
  // async는 Promise를 리턴하므로 안에 리턴 써주지 않아도 됨
  const addTodo = async (title, content) => {
    // await axiosInstance.post("/todo", {
    //   title,
    //   content,
    // });

    // api call 관심사 분리
    await apis.addApi(title, content);
  };

  // 수정, 체크 함수
  const handleUpdateTodo = async (id, content, state) => {
    // await axiosInstance.put(`/todo/${id}`, { id, content, state });

    // api call 관심사 분리
    await apis.updateApi(id, content, state);
  };

  const handleDeleteTodo = async (id) => {
    // await axiosInstance.delete(`/todo/${id}`, { id });

    // api call 관심사 분리
    await apis.deleteApi(id);
  };

  return {
    addTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useCrud;
