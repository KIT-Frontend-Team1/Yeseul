/*
3. 배열 다루기
당신이 구현하고하자 하는 함수는
배열과 정수를 파라미터로 전달 받습니다.

함수 이름은 정해지지 않았으니 마음대로 하셔도 괜찮습니다.

전달받은 배열은 정확히 각 요소마다 값을 10을 더합니다.
이후 값이 10씩 더해진 배열에서, 나머지 파라미터로 전달받은 정수가 있는지 확인하여

값이 없다면 콘솔에 검사하고자 하는 값이 없다는 로그를 보인 후 함수를 종료하세요

값이 있다면 해당 숫자를 제외한 배열을 반환하는 함수를 만드세요.

최종 목표

1. 해당 함수는 배열과 검사하고자 하는 수를 파라미터로 전달 받습니다.
2. 해당 함수는 배열의 각 요소에 10을 더한 후 검사하고자 하는 수가 있는지 검사합니다.
3. 만약 값이 없다면 결과값이 없습니다를 콘솔에 로그합니다.
4. 값이 있다면 검사하고자하는 수를 제외한 배열을 반환합니다.
5. 값이 없을 때 console.log에 undefined가 찍혀서는 안됩니다.

ex) 
const arr = [1,2,3,4,5]
const a = 함수명(arr, 11)
console.log (a)

결과값
[12,13,14,15] ( 값 있음 )
"결과값이 없습니다" ( 값 없음 )
*/

// 1. array라는 함수를 선언하고 파라미터로 arr 배열, 확인 정수값 intNumber
function array(arr, intNumber) {
  // 2. 해당 함수는 배열의 각 요소에 10을 더한 후 검사하고자 하는 수가 있는지 검사
  for (const index in arr) {
    arr[index] += 10; // console.log(arr) => [ 11, 12, 13, 14, 15 ]
  }
  
  // 3. early return 확인할 값(intNumber)이 arr 배열에 포함되지 않을 때
  if (!arr.includes(intNumber)) return "결과값이 없습니다.";

  // 4. 그 경우가 아니라면 arr 배열에서 확인할 값(intNumber)과 다른 요소들만 필터하여 리턴
  return arr.filter(elem => elem !== intNumber);
}

// 값이 없는 경우 확인
const a = array([1, 2, 3, 4, 5], 9);
console.log(a); // 결과값이 없습니다.

// 값이 있는 경우 확인
const b = array([1, 2, 3, 4, 5], 11);
console.log(b); // [ 12, 13, 14, 15 ]












// 1. 기본 for문
// const arr = [1, 2, 3];
// for (let i = 0; i < arr.length; i++) {
//   arr[i] += 10;
// }
// console.log(arr);

// 2. for...in
// const arr = [1, 2, 3];
// for (const index in arr) {
//   arr[index] += 10;
// }
// console.log(arr);
