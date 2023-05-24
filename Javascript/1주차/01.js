/*
1. 가장 큰 값 구하기
함수의 이름은 maxvalue 입니다. 인자로는 정수들이 들어있는 배열을 파라미터로 전달받습니다.
배열로 전달받은 숫자 중 가장 큰 숫자와 숫자를 내림차순으로 정렬된 배열을 객체 형태로 반환해야 합니다.
ex)
  const a = maxvalue([1,2,3,4,5])
  console.log(a)
  
  결과값
  {
    maxValue: 5,
    sortArr: [ 5, 4, 3, 2, 1 ]
  }
  */

// 1. maxvalue 라는 함수를 선언. 파라미터에 배열이 들어가야함(intNum)
// 2. 빈객체 변수 선언 let result = {}
// 3. 최댓값과 내림차순 정렬 값을 객체 안에 넣어 빈 객체 result에 넣어야함
// 4. 먼저 내림차순 로직으로 배열을 구하고 변수에 할당
// 5. 내림차순 된 배열에서 인덱스 0번 값을 최댓값으로 변수에 할당
// 6. result 객체에 각 값을 추가하여 result 객체를 완성
// 7. 콘솔창 출력하여 확인

// function maxvalue(intNum) {
//   let result = {};
//   let arr = intNum.sort((a, b) => b - a); // 내림차순 [ 5, 4, 3, 2, 1 ]
//   let max = arr[0]; // 5

//   result.maxValue = max;
//   result.sortArr = arr;

//   return result;
// }

// 2번 방법(나름의 리팩토링)
function maxvalue(intNum) {
  let maxValue = Math.max(...intNum); // 최댓값 구하기(스프레드)
  let sortArr = intNum.sort((a, b) => b - a); // 내림차순 정렬로 [ 5, 4, 3, 2, 1 ]

  // 객체 안에 변수를 프로퍼티 키로 넣어 {키: 값}을 리턴
  return { maxValue, sortArr };
}

const a = maxvalue([1, 2, 3, 4, 5]);
console.log(a); // { maxValue: 5, sortArr: [ 5, 4, 3, 2, 1 ] }
