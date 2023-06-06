import { useEffect, useState } from "react";
import { axiosInstance } from "utils/axios";

const useCrud = (endpoint) => {
  const [todoList, setTodoList] = useState([]);

  // 조회 함수
  const getTodoList = async () => {
    try {
      const res = await axiosInstance.get(endpoint);
      console.log(res);
      setTodoList(res.data.data);
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

      await axiosInstance.post(endpoint, {
        title,
        content,
      });
      getTodoList();
    } catch (err) {
      throw err;
    }
  };

  // 체크 함수, setTodoList state를 true > false, false > true 로 바꿔주기
  const handleCheckTodo = async (id, state) => {
    try {
      const newTodoList = [...todoList];
      const todo = newTodoList.find((todo) => todo.id === id);
      todo.state = !state; // 현재 state 반대값
      await axiosInstance.put(`${endpoint}/${id}`, { id, state: !state }); // 전달시에도 !state 해주어야 바뀐 state값이 db에 저장
      setTodoList(newTodoList); // UI 업데이트
    } catch (err) {
      console.err("Error!");
    }
  };

  // 수정 함수
  const handleUpdateTodo = async (id, content) => {
    try {
      await axiosInstance.put(`${endpoint}/${id}`, { id, content });
      const newTodoList = [...todoList];
      const todo = newTodoList.find((todo) => todo.id === id);
      todo.content = content;
      setTodoList(newTodoList);
    } catch (err) {
      console.error("Error!");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`${endpoint}/${id}`, { id });
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return {
    todoList,
    setTodoList,
    addTodo,
    handleCheckTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useCrud;
