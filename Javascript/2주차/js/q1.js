/*
변수 위치 찾기
변수 a는 main 함수 안에서 사용된다
변수 b는 dom api selector로 다른 이벤트에서 사용된다
변수 c는 메인 함수 안에서 실행되는 콜백함수 solution의 인자이다
변수 d는 솔루션 함수에서 전달받은 c를 다른 형태로 바꿔준다.
변수 e는 main함수의 최종 반환 값으로 향후 다른 함수에서 재사용된다.
*/

// 변수 b는 dom api selector로 다른 이벤트에서 사용된다
// const b = document.querySelector('.exam');

let e = 0;

function solution(add) {
  //변수 d는 솔루션 함수에서 전달받은 c를 다른 형태로 바꿔준다.
  let d = parseInt(add); // d에 정수 10이 담김
  add *= d; // add = 10 * 10 = 100
  return add;
  // console.log(add); // 디버깅
}

function parse() {
  console.log(main(solution));
}
function main(solution) {
  // 변수 a는 main 함수 안에서 사용된다
  let a = 5;
  // console.log(a) // 디버깅

  // 변수 c는 메인 함수 안에서 실행되는 콜백함수 solution의 인자이다
  let c = "10";
  e = solution(c) + a;

  // 변수 e는 main함수의 최종 반환 값으로 향후 다른 함수에서 재사용된다.
  return e;
}

console.log(main(solution));
parse();
