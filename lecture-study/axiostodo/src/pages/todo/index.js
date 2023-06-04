import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BasicButton from "../../components/Button/Button";
import { flexCenter, flexAlignCenter } from "../../styles/common";
import TodoAddModal from "./components/Modal/add-modal";
import TodoList from "./components/List/todo-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePrevModal from "../../hooks/use-prevmodal";
import { axiosInstance } from "utils/axios";

const TodoPage = () => {
  const params = useParams();
  // const [isAddTodoMadal, setIsAddTodoModal] = useState(false);

  // 커스텀 훅으로 할 수 있을 거 같지 않나요??????
  // usePrevModal 만들어서 할 수 있다(공용 컴포넌트로 >)
  // const handleAddTodoMadal = () => {
  //   setIsAddTodoModal(true);
  //   // setIsAddTodoModal((prev) => !prev)
  // };

  // const handleCloseTodoMadal = () => {
  //   setIsAddTodoModal(false);
  // };

  const [isAddTodoMadal, setIsAddTodoModal, handleAdd] = usePrevModal(false);
  const [todoList, setTodoList] = useState([]);

  /*
  - 낙관적 업데이트(반드시 그 결과와 일치한다는 가정 하에, 성공했다는 가정 하에)
  사용자 경험이 데이터보다 우선시 되어야할 때
  장점 - 사용자가 빠르게 볼 수 있음 (마이페이지, 좋아요, 채팅)
  위험함 - 엣지 케이스 등
  */

  const getTodoList = async () => {
    try {
      const res = await axiosInstance.get("/todo");
      console.log(res);
      setTodoList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  // 낙관적 업데이트
  // useEffect(() => {
  //   const getTodoList = async () => {
  //     try {
  //       const res = await axiosInstance.get("/todo");
  //       console.log(res);
  //       setTodoList(res.data.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getTodoList();
  // }, []);

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

      await axiosInstance.post("/todo", {
        title,
        content,
      });
      getTodoList();
      /*
        데이터의 동기화 호출, 다른 사용자의 업데이트 호출, 안정성
      */

      // setTodoList([res.data.data, ...todoList]);
      /*
      - 낙관적 업데이트
      데이터의 동기화나 일치보다 UX(사용자 경험 ) 개선이 중요할 때 사용
      반드시 실패 했을 때는 에러 핸들링
      */
      setIsAddTodoModal(false);
    } catch (err) {
      throw err;
    }
  };

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
            <TodoList todoList={todoList} setTodoList={setTodoList} />
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
