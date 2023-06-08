import styled from "styled-components";
import NavigationBtn from "../NavigationBtn";
import { box, flexCenter } from "../../styles/common";
import TodoList from "./TodoList";
import AddList from "./AddList";

const Todo = () => {
  return (
    <S.Wrapper>
      <S.TodoBox>
        <h1>오늘 할 일 📝</h1>
        <S.TitleLine></S.TitleLine>
        <TodoList />
        <AddList />
      </S.TodoBox>
      <NavigationBtn to={"/board"} />
    </S.Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  height: 100vh;
  ${flexCenter}
`;

const TodoBox = styled.div`
  width: 400px;
  ${box}

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #1f883d;
  }
`;

const TitleLine = styled.div`
  height: 1px;
  background-color: #ececec;
  margin-bottom: 20px;
`;

const S = {
  Wrapper,
  TodoBox,
  TitleLine,
};
