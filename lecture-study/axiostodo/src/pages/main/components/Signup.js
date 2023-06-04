import * as S from "./style";
import BasicButton from "../../../components/Button/Button";
import useInputs from "../../../hooks/use-inputs";
import { useEffect, useState } from "react";
import useAuthValidation from "../../../hooks/use-auth-validation";
import axios from "axios";

const SignUpForm = ({ setIsFormLogin }) => {
  const [{ email, password, passwordConfirm }, onChangeForm] = useInputs({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  /*
  (기초?)
  email은 email 양식을 지켜야하며 (@ 포함)
  password는 8글자 이상 작성 되어야한다.

  password - passwordConfirm이 달라졌을 때 실시간으로
  비밀번호와 비밀번호 확인이 다르지 않은지 확인하라는 에러 메세지 > div로

  BasicButton은
  데이터가 모두 채워져있지 않으면 disabled
  유효성이 검사되지 않으면 disabled --> 아이디와 비밀번호 양식을 확인해주세요 에러 메세지
  비밀번호와 비밀번호 확인이 다르면 disabled --> CSS 속성도 변경(회색)

  login의 email 로직에도 똑같이 useInputs를 적용하고 유효성 적용 후
  커스텀 훅으로 함수 재사용 할 것

  (1) state 최적화
  (2) custom hook 작성법 (모듈화)

  +

  (심화)
  react-hook-form 이용하여 렌더링 최적화
  단, 장단점을 정리하고 원하는 대로 효과를 거뒀는지 작성할 것
  구현을 목표로 하지 말고 실무에서 자주 사용하는 라이브러리이므로 확실하게 이해하는 것이 중요
  */

  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // console.log({ email });

  // 비밀번호와 비밀번호 확인 로직
  useEffect(() => {
    if (password !== passwordConfirm) {
      // 일치하지 않았을 때 실행문
      setIsPasswordConfirm(false);
    }
    return setIsPasswordConfirm(true); // 일치했을 때 실행문
  }, [password, passwordConfirm]);

  // 커스텀 훅..으로 얘를 뺄 듯
  // const { disabled, errors } = useAuthValidation(
  //   email,
  //   password,
  //   passwordConfirm
  // ); // 유효성 검사, 얘를 useEffect 사용해서 활용

  // console.log(errors);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return; // 이메일, 패스워드 없으면 리턴
    if (!isPasswordConfirm) return; // 비밀번호와 확인 로직 false이면 리턴

    // 백엔드 데이터 통신 , 비동기 promise
    axios
      .post("http://localhost:9000/user/sign", { email, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // alert("축하합니다. 회원가입이 완료되었습니다🤗");
    // setIsFormLogin(true);
  };
  /* ex)
  errors: {
    email: {message: "이메일 양식을 지켜주세요"},
    password: {message: "비밀번호 양식을 지켜주세요"}
  }
  */

  return (
    <S.Form>
      <S.InputBox>
        <label>이메일 </label> <input onChange={onChangeForm} name="email" />
      </S.InputBox>
      {/* {errors.email && <S.ErrMsg>{errors.email.message}</S.ErrMsg>} */}
      <S.InputBox>
        <label>비밀번호 </label>{" "}
        <input onChange={onChangeForm} name="password" />
      </S.InputBox>
      {/* {errors.password && <S.ErrMsg>{errors.password.message}</S.ErrMsg>} */}
      <S.InputBox>
        <label>비밀번호 확인 </label>{" "}
        <input onChange={onChangeForm} name="passwordConfirm" />
      </S.InputBox>
      {/* {errors.passwordConfirm && (
        <S.ErrMsg>{errors.passwordConfirm.message}</S.ErrMsg>
      )} */}
      <BasicButton
        variant={"primary"}
        shape={"default"}
        size={"full"}
        // disabled={disabled}
        onClick={handleSignUpSubmit}
      >
        회원가입
      </BasicButton>
    </S.Form>
  );
};

export default SignUpForm;
