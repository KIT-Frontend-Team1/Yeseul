import * as S from "./style";
import BasicButton from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useRef } from "react";
// 강사님의 말씀.. watch 쓰지 말라고하심,,!
const SignUpForm = () => {
  const {
    handleSubmit, // form onSubmit에 들어가는 함수
    register, // onChange 등의 이벤트 객체 생성
    watch, // register를 통해 받은 모든 값 확인
    formState: { errors, isSubmitting }, // errors: register의 에러 메세지 자동 출력, isSubmitting: 중복제출 방지(근데 뭐랄까 이거 먹히는 거 맞음?)
  } = useForm();

  // console.log(watch("email")); // email에 입력돠는 값 확인

  const password = useRef(); // ref 생성
  password.current = watch("password"); // watch를 이용하여 password 필드 값 가져오기, password.current에 값 넣어주기

  const onChangeFormLib = (data) => {
    // if (data) alert("로그인 성공");
    console.log("회원가입 정보", data);
  };

  return (
    <S.Form onSubmit={handleSubmit(onChangeFormLib)}>
      <S.InputBox>
        <label>이메일 </label>{" "}
        <input
          {...register("email", {
            required: { value: true, message: "이메일을 입력해주세요" },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일 형식이 올바르지 않습니다",
            },
          })}
        />
        {/* { required: true } 는 인풋에 값을 무조건 적어줘야 넘어감 */}
      </S.InputBox>
      {errors?.email && <S.ErrMsg>{errors?.email?.message}</S.ErrMsg>}
      {/* {errors?.email?.type === "pattern" && (
        <S.ErrMsg>{errors?.email?.message}</S.ErrMsg>
      )} */}
      <S.InputBox>
        <label>비밀번호 </label>{" "}
        <input
          name="password"
          type="password"
          {...register("password", {
            required: { value: true, message: "비밀번호를 입력해주세요" },
            minLength: {
              value: 8,
              message: "비밀번호 길이를 8자리 이상 입력해주세요",
            },
          })}
        />
      </S.InputBox>
      {/* {errors.password?.type === "required" && (
        <S.ErrMsg>{errors?.password?.message}</S.ErrMsg>
      )} */}
      {/* {errors.password?.type === "minLength" && (
        <S.ErrMsg>{errors?.password?.message}</S.ErrMsg>
      )} */}
      {errors.password && <S.ErrMsg>{errors?.password?.message}</S.ErrMsg>}
      {/* 한번에 써주는 방법! 각 속성에 맞지 않으면 각 에러 메세지 */}
      <S.InputBox>
        <label>비밀번호 확인 </label>{" "}
        <input
          name="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: { value: true, message: "비밀번호 확인을 입력해주세요" },
            validate: (value) => value === password.current, // password와 passwordConfirm이 같은지 체크하는 부분, value가 passwordConfirm 입력 값과 21번줄 password.current 이 같은지 확인
          })}
        />
      </S.InputBox>
      {errors?.passwordConfirm?.type === "required" && (
        <S.ErrMsg>{errors?.passwordConfirm?.message}</S.ErrMsg>
      )}
      {errors?.passwordConfirm?.type === "validate" && (
        <S.ErrMsg>비밀번호가 일치하지 않습니다.</S.ErrMsg>
      )}
      <BasicButton
        variant={"primary"}
        shape={"default"}
        size={"full"}
        disabled={isSubmitting} // 이건 안먹는다?
      >
        회원가입
      </BasicButton>
    </S.Form>
  );
};

export default SignUpForm;
