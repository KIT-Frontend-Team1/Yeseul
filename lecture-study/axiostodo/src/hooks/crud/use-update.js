import { axiosInstance } from "utils/axios";

const useUpdate = (endpoint, todoList, setTodoList) => {
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

  return [handleCheckTodo, handleUpdateTodo];
};

export default useUpdate;
