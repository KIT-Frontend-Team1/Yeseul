import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { spaceBetween } from "../../styles/common";
import { completeTodo, deleteTodo, updateTodo } from "../../reducer/todo";
import { useState } from "react";

const TodoList = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const todoList = useSelector((state) => state.todo.todos);
  const [editContent, setIsEditContent] = useState("");
  const dispatch = useDispatch();

  const onChangeContent = (e) => {
    setIsEditContent(e.target.value);
  };

  const onEditContent = (id) => {
    setIsEditMode((prev) => ({
      ...prev,
      [id]: !prev[id], // 해당 투투리스트의 id 값을 키로 사용하여 true와 false값 변경
      /*
        const prev = {
          0: true,
          1: false
        }
      */
    }));

    if (editContent) {
      // editContent true 일 때만 updateTodo 실행
      dispatch(updateTodo({ id, content: editContent }));
      setIsEditContent("");
    }
  };

  const onIsCompleted = (id, newstate) => {
    dispatch(completeTodo({ id, state: !newstate }));
  };

  const onDeleteList = (id) => {
    dispatch(deleteTodo({ id }));
    console.log("delete");
  };

  return (
    <>
      {todoList.map((todo) => (
        <S.ListWrapper state={todo.state}>
          <div style={{ width: "100%" }}>
            {isEditMode[todo.id] ? (
              <input
                type="text"
                value={editContent}
                onChange={onChangeContent}
              />
            ) : (
              <span>{todo.content}</span>
            )}
          </div>
          <S.ListRight>
            <input
              type="checkbox"
              onChange={() => onIsCompleted(todo.id, todo.state)}
            />
            <button onClick={() => onEditContent(todo.id)}>edit</button>
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
  margin-top: 10px;

  span {
    color: ${({ state }) => (state ? "#aaa" : "#ff7517")};
    font-weight: 700;
    text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  }

  input {
    width: 90%;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid rgb(182, 182, 182);
    outline: none;
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
