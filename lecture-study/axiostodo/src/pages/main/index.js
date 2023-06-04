import styled from "styled-components";
import SignInForm from "./components/Signin";
import SignUpForm from "./components/Signup";
import { flexCenter } from "styles/common";
import { useState } from "react";
// import { PALETTE } from "../../styles/theme";

const MainPage = () => {
  // let isFormLogin = true;
  const [isFormLogin, setIsFormLogin] = useState(true);

  const onClickFormHeader = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    if (innerText === "LOGIN") return setIsFormLogin(true);
    setIsFormLogin(false);
    console.log(isFormLogin);
  };

  return (
    <S.Container>
      <S.Header>
        <S.LoginHeader isFormLogin={isFormLogin} onClick={onClickFormHeader}>
          LOGIN
        </S.LoginHeader>
        <S.SignUpHeader isFormLogin={isFormLogin} onClick={onClickFormHeader}>
          SIGN
        </S.SignUpHeader>
      </S.Header>
      {isFormLogin ? (
        <SignInForm />
      ) : (
        <SignUpForm setIsFormLogin={setIsFormLogin} />
      )}
    </S.Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  ${flexCenter}
  flex-direction: column;
`;

const Header = styled.div`
  width: 360px;
  height: 48px;
  display: flex;
  /* background-color: #00c7ae; */
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};

  /* Header 밑의 div 선택할 때 */
  div {
    ${flexCenter}
    width: 50%;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  }
`;

const LoginHeader = styled.div`
  background-color: ${({ theme, isFormLogin }) =>
    isFormLogin ? "#e0e0e0" : "#f5f5f5"};
`;
// styled-components는 변수를 속성으로 전달받아
// 헤당 변수 값에 따라 스타일을 조정할 수 있다 = style 변경을 위해 DOM API에 접근할 필요가 없다.

const SignUpHeader = styled.div`
  background-color: ${({ theme, isFormLogin }) =>
    isFormLogin ? "#f5f5f5" : "#e0e0e0"};
`;

const S = {
  Container,
  Header,
  LoginHeader,
  SignUpHeader,
};
