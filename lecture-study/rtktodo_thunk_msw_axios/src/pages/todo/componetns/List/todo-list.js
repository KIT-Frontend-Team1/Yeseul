import { useDispatch, useSelector } from "react-redux";
import OneTodo from "./one-todo";
import { getTodo } from "reducer/todo";
import { useEffect } from "react";

const TodoList = () => {
  // todo의 state를 객체로 보냈으므로 todo.todos를 해야 배열이 들어옵니다
  const todoList = useSelector((state) => state.todo.todos);
  const { loading } = useSelector((state) => state.todo.addTodoState);
  console.log(loading);
  const dispatch = useDispatch();

  const todoMockData = () => {
    dispatch(getTodo());
  };

  useEffect(() => {
    todoMockData();
  }, []);

  if (loading) return <div>loading...</div>; // early return
  return (
    <>
      {/* loading ? () : () 이런식으로 삼항연산자 써도 됨 */}
      {todoList.map((todo) => (
        <OneTodo todo={todo} />
      ))}
    </>
  );
};
export default TodoList;
