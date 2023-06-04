// import { useState } from "react";
import BasicButton from "components/Button/Button";
import * as S from "./style";
// import useInput from "../../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  // let email = "";
  // let password = "";
  // const [email, setEmail] = useState("");
  // const [email, onChangeEmail] = useInput();
  // const [password, onChangePassword] = useInput();
  const navigation = useNavigate();

  const onPressSignIn = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value, e.target.password.value);
    // console.log(email, password);
    // console.log("sign-in");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:9000/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", res.data.data.token);
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // if (email === "test" && password === "testtest") {
    //   // todo page로 이동, return!!! 안해주면 아래 return alert 실행됨
    //   return navigation("todo/1", {
    //     state: {
    //       email,
    //       password,
    //     },
    //   });
    // }
    // return alert("아이디와 비밀번호를 확인해주세요");
  };

  return (
    <S.Form onSubmit={onPressSignIn}>
      <S.InputBox>
        <label>이메일 </label> <input name="email" />
      </S.InputBox>
      <S.InputBox>
        <label>비밀번호 </label> <input name="password" />
      </S.InputBox>
      <BasicButton variant={"primary"} shape={"default"} size={"full"}>
        로그인
      </BasicButton>
    </S.Form>
  );
};

export default SignInForm;
