// import { useState } from "react";
// import styled from "styled-components";

// function Q1() {
//   /*
//     문제1
//     useState 및 styled-components에 관련한 문제입니다.
//     아래 문제를 통해 어떠한 경우 state를 사용해야하는지 고민하여 풀어보세요

//     1-1 )
//         문제1-1은 input의 value가 placeholder의 값과 같아졌다면
//         초록색 글씨로 올바르게 입력하셨습니다가 노출됩니다.

//         만약 입력하지 않았다면 올바르게 글을 작성해주세요라는 문구가
//         붉은색 글씨로 노출됩니다

//     1-2 )
//         문제1-2는 보이기 버튼을 누른다면

//         button 내부의 텍스트는 숨기기로 바뀌고
//         아래 보이는 p태그가 보여야합니다.

//         반대로 숨기기 텍스트로 바뀐 button을 누르면
//         p태그는 보이지 않아야합니다

//   */
//   // 1-1
//   const [valid, setValid] = useState(false);

//   const onChangeValue = (e) => {
//     // console.log(e.target.value); // 입력값 실시간 확인
//     // console.log(e.target.placeholder); // 김성용
//     if (e.target.value === e.target.placeholder) setValid(true);
//     else setValid(false);

//     // if...else문 대신 이렇게 쓸 수도 있다.
//     // const isValid = e.target.value === e.target.placeholder;
//     // setValid(isValid);
//     // setValid(e.target.value === e.target.placeholder);
//   };

//   /* 1-2.
//   1) onClick이벤트 함수, state변수
//   2) !state로 토글, true일 때 보이기, false일 때 숨기기 text 변경
//   3) true일 때 p태그 "" 또는 null, false일 때 이 문구는 보이기 상태일 때만 볼 수 있습니다
//   */
//   const [show, setShow] = useState(true);

//   const onClickBtn = () => {
//     setShow(!show);
//   };

//   return (
//     <>
//       <h1>문제1</h1>
//       <div>
//         <h2>문제1-1.</h2>
//         <input
//           type="text"
//           placeholder={"김성용"}
//           style={{ textAlign: "center" }}
//           onChange={onChangeValue}
//         />
//         <S.Message valid={valid}>
//           {valid ? "올바르게 입력하셨습니다" : "올바르게 글을 작성해주세요"}
//         </S.Message>
//       </div>

//       <div>
//         <h2>문제1-2. </h2>
//         <button onClick={onClickBtn}>{show ? "보이기" : "숨기기"}</button>
//         {/* <p> {show ? " 이 문구는 보이기 상태일 때만 볼 수 있습니다 " : null}</p> */}
//         {show && <p> " 이 문구는 보이기 상태일 때만 볼 수 있습니다 " </p>}
//       </div>
//     </>
//   );
// }
// export default Q1;

// const Message = styled.p`
//   color: ${(props) => (props.valid ? "green" : "red")};
// `;

// const S = {
//   Message,
// };

import { useState } from "react";
import styled from "styled-components";

function Q1() {
  /* 수정 보완 사항
      1. state 값이 boolean일 때 변수 값 앞에 is 를 붙여 구분
      2. e.target.value === e.target.placeholder인 조건을 변수에 담아 
  */
  const [isValid, setIsValid] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const onChangeValue = (e) => {
    const isValueEqualPlaceholder = e.target.value === e.target.placeholder;
    console.log(isValueEqualPlaceholder);
    if (isValueEqualPlaceholder) setIsValid(true);
    else setIsValid(false);
  };

  const onClickBtn = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <h1>문제1</h1>
      <div>
        <h2>문제1-1.</h2>
        <input
          type="text"
          placeholder={"김성용"}
          style={{ textAlign: "center" }}
          onChange={onChangeValue}
        />
        <S.Message valid={isValid}>
          {isValid ? "올바르게 입력하셨습니다" : "올바르게 글을 작성해주세요"}{" "}
        </S.Message>
      </div>

      <div>
        <h2>문제1-2. </h2>
        <button onClick={onClickBtn}>{isShow ? "보이기" : "숨기기"}</button>
        {isShow && <p> " 이 문구는 보이기 상태일 때만 볼 수 있습니다 " </p>}
      </div>
    </>
  );
}
export default Q1;

const Message = styled.p`
  color: ${(props) => (props.valid ? "green" : "red")};
`;

const S = {
  Message,
};

// 🍎 이전 코드
// import { useState } from "react";
// import styled from "styled-components";

// function Q1() {
//   /*1-1.
//   1) valid state 값
//   1) input의 onChange 이벤트 발생시 onChangeValue 함수 실행, input 입력값과 placeholder 의 값이 같으면 valid 상태를 true 다르면 false
//   2) valid state 값을 이용하여 올바르게 입력하셨습니다 : 올바르게 글을 작성해주세요 문구 노출
//   3) valid state 값을 이용하여 color green : red 변경
//   */
//   const [valid, setValid] = useState(false);

//   const onChangeValue = (e) => {
//     if (e.target.value === e.target.placeholder) setValid(true);
//     else setValid(false);
//   };

//   /* 1-2.
//   1) onClick이벤트 함수, show state 값
//   2) !state로 토글, true일 때 보이기, false일 때 숨기기 text 변경
//   3) true일 때 p태그 "" 또는 null, false일 때 이 문구는 보이기 상태일 때만 볼 수 있습니다
//   */
//   const [show, setShow] = useState(true);

//   const onClickBtn = () => {
//     setShow(!show);
//   };

//   return (
//     <>
//       <h1>문제1</h1>
//       <div>
//         <h2>문제1-1.</h2>
//         <input
//           type="text"
//           placeholder={"김성용"}
//           style={{ textAlign: "center" }}
//           onChange={onChangeValue}
//         />
//         <S.Message valid={valid}>
//           {valid ? "올바르게 입력하셨습니다" : "올바르게 글을 작성해주세요"}{" "}
//         </S.Message>
//       </div>

//       <div>
//         <h2>문제1-2. </h2>
//         <button onClick={onClickBtn}>{show ? "보이기" : "숨기기"}</button>
//         {show && <p> " 이 문구는 보이기 상태일 때만 볼 수 있습니다 " </p>}
//       </div>
//     </>
//   );
// }
// export default Q1;

// const Message = styled.p`
//   color: ${(props) => (props.valid ? "green" : "red")};
// `;

// const S = {
//   Message,
// };
