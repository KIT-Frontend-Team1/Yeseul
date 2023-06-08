import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { spaceBetween } from "../../styles/common";
import { completeTodo, deleteTodo } from "../../reducer/todo";

const TodoList = () => {
  const todoList = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const onIsCompleted = (id) => {
    dispatch(completeTodo({ id, state: !todoList[0].state }));
    console.log(todoList[0].state);
  };

  const onDeleteList = (id) => {
    dispatch(deleteTodo({ id }));
    console.log("delete");
  };

  return (
    <>
      {todoList.map((todo) => (
        <S.ListWrapper state={todo.state}>
          <div>
            <span>{todo.content}</span>
          </div>
          <S.ListRight>
            <input
              type="checkbox"
              onChange={() => onIsCompleted(todo.id, todo.state)}
            />
            <button>edit</button>
            <button onClick={() => onDeleteList(todo.id)}>delete</button>
          </S.ListRight>
        </S.ListWrapper>
      ))}
    </>
  );
};

export default TodoList;

const ListWrapper = styled.li`
  ${spaceBetween}
  align-items: center;

  span {
    color: ${({ state }) => (state ? "#aaa" : "#ff7517")};
    font-weight: 700;
    text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  }
`;

const ListRight = styled.div`
  display: flex;

  button {
    color: #fff;
    padding: 4px 8px;
    background-color: #1f883d;
    margin-left: 10px;
    border-radius: 4px;
  }
`;

const S = {
  ListWrapper,
  ListRight,
};
