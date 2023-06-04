import { useEffect, useState } from "react";

const useAuthValidation = (email, password, passwordConfirm) => {
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    passwordConfirm: null,
  });

  useEffect(() => {
    // 조건에서 오류!
    if (!email && !password) return setDisabled(true);

    if (
      email.includes("@") &&
      password.length >= 8 &&
      password === passwordConfirm
    ) {
      return setDisabled(false);
    }

    if (email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: {
          message: "",
        },
      }));
    }

    console.log(email);
    console.log(email.includes("@"));

    if (!email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: {
          message: "이메일 형식이 올바르지 않습니다.",
        },
      }));
    }
    // else {
    //   setErrors((prev) => ({
    //     ...prev,
    //     email: {
    //       message: "",
    //     },
    //   }));
    // }

    // if (password.length >= 8) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     password: {
    //       message: "",
    //     },
    //   }));
    // }
    if (password.length >= 8) {
      setErrors((prev) => ({
        ...prev,
        password: {
          message: "",
        },
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: {
          message: "비밀번호 길이를 8자리 이상 입력해주세요",
        },
      }));
    }

    if (password !== passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: {
          message: "비밀번호를 확인해주세요",
        },
      }));
    }

    if (password === passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: {
          message: "",
        },
      }));
    }
  }, [email, password, passwordConfirm]);
  return { disabled, errors };
};

export default useAuthValidation;
