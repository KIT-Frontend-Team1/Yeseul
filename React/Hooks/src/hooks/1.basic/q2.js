import { useRef, useState } from "react";

function Q2() {
  // const arr = [];
  const arr = useRef([]);
  const [forceRender, setForceRender] = useState(false);
  const addRef = useRef();

  // arr 배열에 값 추가하는 함수
  const onAddList = () => {
    // setForceRender((prev) => !prev);
    // console.log(addRef.current.value); // input에 ref={addRef} 속성값 주어 입력값(value) 가져오기
    arr.current.push(addRef.current.value); // arr.current 여기에 input에 입력된 값을 푸시해줌
    console.log(arr.current); // 푸시 잘 되는지 확인 디버깅
  };

  // const onAddList = () => {
  //   setForceRender((prev) => !prev);
  //   arr.push();
  // };

  // 제출 버튼 클릭 함수
  const onSubmitList = () => {
    // console.log(arr.current);

    // if else 사용
    if (arr.current.length !== 0) setForceRender(true); // 배열에 값이 있으면
    else setForceRender(false);

    // 위 두 줄과 같음, early return 사용
    // if (!arr.current.length) return;
    // setForceRender(true);
    // addRef.current.value = ""; // 제출 클릭시 input 값 비워주기 (그냥 해봄)
    // addRef.current.focus(); // 제출 클릭시 input 값에 focus (그냥 해봄)
  };
  /*
    문제2

    2-1)
        useRef에 관련한 문제입니다.

        추가 버튼을 누르면 input에 있던 value는 배열 arr에 추가됩니다.
        그러나, 추가 버튼을 누를 때마다 강제 랜더링 상태가 무조건 적으로 업데이트 됩니다.

        이러한 상황에서 제출버튼을 누르면

        지금까지 추가하였던 목록 배열(arr)이
        <ul>의 li의 항목으로 추가되어야합니다.

        만약 제출되었을 때 아무런 항목이 없다면
        <p>제출된 목록이 없습니다</p>이 노출되어야하며

        제출된 항목이 있다면
        <ul>만 노출되어야 합니다

        이를 useRef의 특성을 고려하여 풀이해보세요 :)

    2-2)
        문제 2-2는 변경 버튼을 클릭하면
        p태그의 색상이 다른 색상으로 변경됩니다.

        이는 state를 사용하는 것이 가장 올바른 방법이지만
        어를 사용할 수 없는 어쩔 수 없는 상황에 놓여있습니다.

        따라서 useRef는 사용하여 해당 문구의 색상을 변경해보세요 :)
  */
  // 2-2
  const colorRef = useRef(null);
  const onChangeColor = () => {
    colorRef.current.style.color = "#6395ff";
  };

  return (
    <>
      <h1>문제2</h1>
      <div>
        <h2>문제 2-1</h2>
        <p>
          <input ref={addRef} />
        </p>
        <p>
          <button onClick={onAddList}>추가</button>
        </p>
        <p>
          <button onClick={onSubmitList}>제출</button>
        </p>

        {!forceRender ? (
          <p>제출된 목록이 없습니다</p>
        ) : (
          <ul>
            {arr.current.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>문제 2-2</h2>
        <p ref={colorRef}> 이 문구는 아래 버튼을 누르면 색상이 바뀝니다</p>
        <button onClick={onChangeColor}>변경</button>
      </div>
    </>
  );
}
export default Q2;

// 혜린님 코드
// import { useState, useRef, useEffect } from "react";

// function Q2() {
//   const arr = useRef([]);
//   const [forceRender, setForceRender] = useState(false);
//   const Input = useRef();
//   const [text, setText] = useState("");
//   const [showList, setShowList] = useState(false);

//   //list에 추가하는 함수
//   //input에 값이 없으면 리턴
//   //arr라는 ref 배열에 input의 value값을 추가함.
//   //input을 비워줌
//   const onAddList = () => {
//     setForceRender((prev) => !prev);
//     if (Input.current.value === "") return;
//     arr.current.push(Input.current.value);
//     Input.current.value = "";
//   };

//   //제출버튼을 누르면 arr에 있던 내용이 list에서 렌더링 되어야 함.
//   //forSubmit이라는 상태를 true로 바꿔서 arr안의 내용이 보이도록 함
//   const onSubmit = () => {
//     setShowList(true);
//   };

//   //2-2
//   //색상을 바꾸는 함수
//   const targetText = useRef();
//   const onClickChangeColor = () => {
//     targetText.current.style.color = "red";
//   };

//   return (
//     <>
//       <h1>문제2</h1>
//       <div>
//         <h2>문제 2-1</h2>
//         <p>
//           <input ref={Input} />
//         </p>
//         <p>
//           <button onClick={onAddList}>추가</button>
//         </p>
//         <p>
//           <button onClick={onSubmit}>제출</button>
//         </p>
//         {/*리스트가 나오는 부분. showList가 true이고 arr가 undefined일때만
//         해당 '제출된 목록이 없습니다.'를 보여줌 */}
//         <ul>
//           {showList && !arr.current.length && (
//             <div>제출된 목록이 없습니다.</div>
//           )}
//           {/* showList가 true이고 arr.length가 0이 아닐때만(무언가 추가됨) 해당
//           list가 렌더링됨*/}
//           {showList &&
//             arr.length !== 0 &&
//             arr.current.map((text) => <li>{text}</li>)}
//         </ul>
//       </div>
//       <div>
//         <h2>문제 2-2</h2>
//         <p ref={targetText}> 이 문구는 아래 버튼을 누르면 색상이 바뀝니다</p>
//         <button onClick={onClickChangeColor}>변경</button>
//       </div>
//     </>
//   );
// }
// export default Q2;

/* 
    문제2

    2-1)
        useRef에 관련한 문제입니다.

        추가 버튼을 누르면 input에 있던 value는 배열 arr에 추가됩니다.
        그러나, 추가 버튼을 누를 때마다 강제 랜더링 상태가 무조건 적으로 업데이트 됩니다.

        이러한 상황에서 제출버튼을 누르면

        지금까지 추가하였던 목록 배열(arr)이 
        <ul>의 li의 항목으로 추가되어야합니다.

        만약 제출되었을 때 아무런 항목이 없다면
        <p>제출된 목록이 없습니다</p>이 노출되어야하며

        제출된 항목이 있다면
        <ul>만 노출되어야 합니다

        이를 useRef의 특성을 고려하여 풀이해보세요 :)

    2-2)
        문제 2-2는 변경 버튼을 클릭하면
        p태그의 색상이 다른 색상으로 변경됩니다.
        
        이는 state를 사용하는 것이 가장 올바른 방법이지만
        어를 사용할 수 없는 어쩔 수 없는 상황에 놓여있습니다.

        따라서 useRef는 사용하여 해당 문구의 색상을 변경해보세요 :)
  */
