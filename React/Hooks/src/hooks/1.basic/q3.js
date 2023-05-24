import { useEffect, useState } from "react";
import Q3components from "../../components/1.basic/q3components";

function Q3() {
  /* 
    문제3
    useEffect useState에 관련한 문제입니다
    단체 줄넘기 대회에 출전하였습니다

    줄넘기 시작 버튼을 누르면 
    Q3components 컴포넌트가 보입니다.

    Q3components 내부에는

    해당 컴포넌트가 보이기 시작한 시점부터
    2초마다 줄넘기 횟수가 1회 씩 증가하는 비즈니스 로직이 존재합니다

    또한, 이러한 줄넘기 횟수 증가는 q3.js(index)에서도 확인할 수 있도록
    <p> 줄넘기 횟수 : 0 </p> 에 횟수로 표시됩니다

    줄넘기 중지 버튼을 누르면
    해당 컴포넌트는 보이지 않아야하며, 줄넘기 횟수도 더이상 증가해서는 안됩니다.
    또한, 줄넘기 횟수는 0으로 고정되어야합니다.
  */
  // const [count, setCount] = useState(0); // count 변경 함수

  // useEffect(() => {
  //   if (!count) return; // count의 값이 변경될 때만 실행해라

  //   // 2초마다 1씩 증가하는 로직, count 값이 +1씩 진행됨
  //   const counting = setInterval(() => {
  //     setCount((prev) => prev + 1);
  //   }, 2000);

  //   // cleanUp 기능, 메모리 누수 방지(리턴으로 clearInterval을 실행하지 않으면 count 값이 2씩 증가한다. 왜죠?)
  //   return () => {
  //     clearInterval(counting);
  //   };
  // }, [count]); // 의존성 배열에 count를 넣어주어 count 값이 변경될 때마다 실행

  // // console.log(count);

  // // 줄넘기 시작 버튼 클릭시 isCountFunc 를 true 값으로 지정
  // const onCountUp = () => {
  //   setCount(count + 1); // 1로 초기화하지 않으면 0, 1을 건너뛰고 2부터 UI에 보여지고 이렇게 억지로 값을 초기화하면 0부터 늘어나지 않고 1부터 바로 보여짐..
  // };

  // const onCountStop = () => {
  //   setCount(0); // 중지 버튼 클릭 시 0으로 초기화 (줄넘기 횟수는 0으로 고정)
  // };

  // 다른 풀이
  const [count, setCount] = useState(0); // count 변경 함수
  const [isCountFunc, setIsCountFunc] = useState(false);

  useEffect(() => {
    if (!isCountFunc) return; // isCountFunc의 값이 true일 때만 실행해라

    // 2초마다 1씩 증가하는 로직, count 값이 +1씩 진행됨
    const counting = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 2000);

    // cleanUp 기능, 메모리 누수 방지(리턴으로 clearInterval을 실행하지 않으면 count 값이 2씩 증가한다. 왜죠?)
    return () => {
      clearInterval(counting);
    };
  }, [isCountFunc]); // 의존성 배열에 isCountFunc를 넣어주어 isCountFunc 값이 변경될 때마다 실행

  // console.log(count);

  // 줄넘기 시작 버튼 클릭시 isCountFunc 를 true 값으로 지정
  const onCountUp = () => {
    setIsCountFunc(true);
  };

  const onCountStop = () => {
    setIsCountFunc(false); // 줄넘기 시작 버튼 클릭시 isCountFunc 를 false 값으로 지정하여 uesEffect 실행이 끝남
    setCount(0); // 중지 버튼 클릭 시 0으로 초기화 (줄넘기 횟수는 0으로 고정)
  };

  return (
    <>
      <h1>문제3</h1>
      <div>
        <p> 줄넘기 횟수 : {count} </p>
        {count ? <Q3components /> : null}
        {/* {isCountFunc && <Q3components />} */}
        {/* isCountFunc가 true일 때만 컴포넌트 보여주고 false면 안보이게, onCountUp 함수 실행 시 true이므로 화면에 보여주기, onCountStop 함수 실행시 isCountFunc가 false 조건으로 변경되어 회면에서 사라짐 */}
        <p>
          <button onClick={onCountUp}>줄넘기 시작</button>
        </p>
        <p>
          <button onClick={onCountStop}>줄넘기 중지</button>
        </p>
      </div>
    </>
  );
}
export default Q3;
