import { axiosInstance } from "utils/axios";
import { useState, useEffect } from "react";
import { addTodoApi, getTodoApi } from "../../apis/api.todo";

const useAdd = (endpoint) => {
  const [todoList, setTodoList] = useState([]);

  const getTodoList = async () => {
    try {
      // const res = await axiosInstance.get(endpoint);
      // console.log(res);
      // setTodoList(res.data.data);

      // api call 관심사 분리
      const resData = await getTodoApi(endpoint);
      setTodoList(resData);
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
      // if (!title || !content) {
      //   const err = new Error();
      //   err.type = "empty content";
      //   err.message = "빈칸을 채워주세요";
      //   throw err;
      // }

      // await axiosInstance.post(endpoint, {
      //   title,
      //   content,
      // });

      // api call 관심사 분리
      await addTodoApi(endpoint, title, content);
      getTodoList();
    } catch (err) {
      throw err;
    }
  };

  return [todoList, setTodoList, addTodo];
};

export default useAdd;
