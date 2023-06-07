import styled from "styled-components";
import { useParams } from "react-router-dom";
import BasicButton from "../../components/Button/Button";
import { flexCenter, flexAlignCenter } from "../../styles/common";
import TodoAddModal from "./components/Modal/add-modal";
import TodoList from "./components/List/todo-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePrevModal from "../../hooks/use-prevmodal";
import useCrud from "hooks/use-crud";

const TodoPage = () => {
  const [isAddTodoMadal, setIsAddTodoModal, handleAdd] = usePrevModal(false);
  const { addTodo } = useCrud();

  const showTodoToastMessage = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    toast
      .promise(addTodo(title, content), {
        pending: "TODO LOADING",
        success: "TODO SUCCESS",
        error: "TODO ERROR",
      })
      .then(() => setIsAddTodoModal(false))
      .catch((err) => {
        if (err.type === "empty content") alert(err.message);
      });
  };

  // 변수를 객체로 선언(옵션의 재사용을 위해) -> autoClose={2000} 대신
  const toastOption = {
    autoClose: 2000,
    theme: "colored",
  };

  return (
    <>
      {isAddTodoMadal && (
        <TodoAddModal onAddTodo={showTodoToastMessage} onClose={handleAdd} /> // 기존 개별 함수 사용 시 handleCloseTodoMadal
      )}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <S.Content>
            <TodoList />
          </S.Content>
          <S.ButtonBox>
            <BasicButton variant={"primary"} size={"full"} onClick={handleAdd}>
              {/* 기존 개별 함수 사용 시 handleAddTodoMadal */}
              추가
            </BasicButton>
          </S.ButtonBox>
        </S.Container>
      </S.Wrapper>
      <ToastContainer {...toastOption} />
      {/* <ToastContainer autoClose={2000} /> */}
    </>
  );
};

export default TodoPage;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
  color: ${({ theme }) => theme.PALETTE.fontColor};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  ${flexCenter}
`;

const S = {
  Wrapper,
  Container,
  Title,
  ButtonBox,
  Content,
};
