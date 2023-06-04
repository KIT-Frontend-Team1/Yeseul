/*
  커스텀 훅이란?

  *훅*을 사용하고 있는 *재사용 가능한* 로직을 모듈화

  재사용 가능성이 없을 훅을 커스텀 훅으로 만드는 것은 옳을까요? 옳지 않을까요? 개발자의 관념에 따라 다른 답이 나올 수 있다..!(고민해볼 필요 있다)

  커스텀 훅 왜 쓰냐?
  의존성 배열 문제 A -> B에서 수정 시 A와 B 모두바꾸어여하는데

  커스텀훅으로 빼면
  A -> 커스텀훅 -> B 커스텀훅을 거치면 A는 B에 의존하지 않고 커스텀훅만 수정하면 A가 B에 의존할 필요가 없다

  커스텀 훅은 어떻게 공부하면 될까?
  - 내가 직접 설계한 프로젝트에서 사용해보기,
  겹치는 로직이 생김 -> 커스텀 훅으로 빼보기(반복되는 로직의 모듈화)
*/

import { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange, setValue];
};

export default useInput;

// const [email, onChangeEmail, setEmail] = useInput(); // [value, onChange, setValue]
// const [password, onChangePassword, setPassword] = useInput(); // [value, onChange, setValue]
