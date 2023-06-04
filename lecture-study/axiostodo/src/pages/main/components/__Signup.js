import * as S from "./style";
import BasicButton from "../../../components/Button/Button";
import useInputs from "../../../hooks/use-inputs";
import { useEffect, useState } from "react";

const SignUpForm = () => {
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

  // const disabled = !isEmail || !isPassword || !isPasswordConfirm;
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // const isEmail = email.includes("@");
  // const isPassword = password.length >= 8;
  // const isPasswordConfirm = password === passwordConfirm;
  // 위 처럼 선언하면 렌더링할 때마다 함수가 호출됨

  // 렌더링시 새로운 함수의 호출을 방지하기 위해 useCallback의 사용, 굳이?
  // const emailCheck = useCallback(() => {
  //   // console.log(email); // event.target.value
  //   const isValid = email.includes("@");
  //   setIsEmail(isValid);
  // }, [email]);

  // const pwCheck = useCallback(() => {
  //   const isPwValid = password.length >= 8;
  //   setIsPassword(isPwValid);
  // }, [password]);

  // const pwCheckConfirm = useCallback(() => {
  //   const isValid = password === passwordConfirm;
  //   setIsPasswordConfirm(isValid);
  // }, [password, passwordConfirm]);

  // const emailCheck = () => {
  //   console.log(email); // 디버깅, state로 인해 onChange시 입력 값 콘솔에서 확인
  //   const isValid = email.includes("@"); // 입력값에 @ 포함하는지 여부에 따라 true(isValid) / false(!isValid)
  //   console.log(isValid); // 맞는지 확인하는 과정
  //   setIsEmail(isValid); // isEmail 변수를 isValid로 업데이트하여 @값의 유무에 따라 true, false값을 가짐. @가 포함할 때 true고 포함하지 않으면 false이므로 !isEmail 일 때 에러 메세지
  // };

  // useEffect 훅을 사용하여 email, password, passwordConfirm 값이 변경될 때마다 해당 함수를 실행하는 로직, 각각의 입력 필드에 대한 유효성 검사를 실시하고, 검사 결과를 상태로 업데이트
  useEffect(() => {
    const emailCheck = () => {
      // console.log(email); // 디버깅, state로 인해 onChange시 입력 값 콘솔에서 확인
      const isValid = email.includes("@"); // 입력값에 @ 포함하는지 여부에 따라 true(isValid) / false(!isValid)
      // console.log(isValid); // 맞는지 확인하는 과정
      setIsEmail(isValid); // isEmail 변수를 isValid로 업데이트하여 @값의 유무에 따라 true, false값을 가짐. @가 포함할 때 true고 포함하지 않으면 false이므로 !isEmail 일 때 에러 메세지
    };
    // 위와 같은 코드다
    // const emailCheck = () => {
    //   if (email.includes("@")) {
    //     setIsEmail(true);
    //   } else {
    //     setIsEmail(false);
    //   }
    // };

    const pwCheck = () => {
      // console.log(password); // state로 인해 onChange시 입력 값 콘솔에서 확인
      const isValid = password.length >= 8;
      // console.log(isValid);
      setIsPassword(isValid);
    };

    const pwCheckConfirm = () => {
      // console.log(passwordConfirm); // state로 인해 onChange시 입력 값 콘솔에서 확인
      const isValid = password === passwordConfirm;
      // console.log(isValid);
      setIsPasswordConfirm(isValid);
    };
    emailCheck();
    pwCheck();
    pwCheckConfirm();
  }, [email, password, passwordConfirm]);

  // disabled
  // isEmail, isPassword, isPasswordConfirm의 상태값이 변경될 때마다 호출하고, 모든 유효성 검사가 완료(true조건)되었을 때 폼 유효성을 판단하고 그 결과를 isFormValid 상태로 업데이트
  useEffect(() => {
    setIsFormValid(isEmail && isPassword && isPasswordConfirm);
  }, [isEmail, isPassword, isPasswordConfirm]);

  const onPressSignUp = (e) => {
    e.preventDefault();
    // 모든 유효성이 true일 때 로그인 성공 창과 콘솔을 확인
    if (isFormValid) {
      alert("로그인 성공!");
      console.log(`email: ${email}, password: ${password}`);
    }
  };

  return (
    <S.Form onSubmit={onPressSignUp}>
      <S.InputBox>
        <label>이메일 </label> <input onChange={onChangeForm} name="email" />
      </S.InputBox>
      {!isEmail && email.length > 0 && (
        <S.ErrMsg>이메일 형식이 올바르지 않습니다</S.ErrMsg>
      )}
      <S.InputBox>
        <label>비밀번호 </label>{" "}
        <input onChange={onChangeForm} name="password" />
      </S.InputBox>
      {!isPassword && password.length > 0 && (
        <S.ErrMsg>비밀번호 길이를 8자리 이상 입력해주세요</S.ErrMsg>
      )}
      <S.InputBox>
        <label>비밀번호 확인 </label>{" "}
        <input onChange={onChangeForm} name="passwordConfirm" />
      </S.InputBox>
      {!isPasswordConfirm && (
        <S.ErrMsg>비밀번호와 비밀번호 확인이 일치하지 않습니다</S.ErrMsg>
      )}
      <BasicButton
        variant={"primary"}
        shape={"default"}
        size={"full"}
        disabled={!isFormValid}
      >
        회원가입
      </BasicButton>
    </S.Form>
  );
};

export default SignUpForm;
