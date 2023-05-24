/*
배열 나누기
함수 division은 특정한 배열을 내가 원하는 원소의 갯수를 길이로 가진 배열들로 분해하려고한다
이후, 해당 배열들을 요소로 갖는 배열을 반환한다

ex) 길이가 80인 배열은 길이가 5로 분해한다면 16개의 배열을 요소로 갖는 배열을 반환한다
ex) [1...80] => [[1...5], [6...10], [11...15], ... , [76...80]]
*/

/*
1. 배열 길이 설정 
2. 분해할 길이 설정
3. 나누고 반환
*/

// 1. 원하는 길이만큼 배열에 담기
const fillArr = Array(80)
  .fill()
  .map((_, index) => {
    return index + 1;
  });
// console.log(fillArr); // 디버깅[ 1, 2, 3, 4, ..80 ]

function division(arr, n) {
  //   // 2. 반환할 빈 배열 선언
  const newArr = [];

  //   // 2. 원하는 길이 / 분해할 길이 연산하여 divide 변수에 담아주기
  //   //		ex) 80 / 5 = 16 => for문을 돌릴 횟수, Math.ceil 을 사용하는 이유는 소수점으로 떨어지는 수를 올림하여야 배열 길이에 넣을 수 있기 때문 79/5 ... 15.8 -> 16
  //   const divide = Math.ceil(arr.length / n);

  // 3. divide 길이만큼 for문 돌리기
  for (let i = 0; i < divide; i++) {
    // 4. 반환할 빈 배열에 기존 arr 배열의 0번 인덱스부터 n-1번 인덱스까지 push
    // -> splice는 기존배열을 수정하므로 splice된 부분은 newArr로 push되기 때문에 다음 배열을 담을때 기존 배열 arr은 계속 0번 인덱스가 되는 것
    newArr.push(arr.splice(0, n));
    // ex) i = 0일때 [ [1, 2, 3, 4, 5] ]
    //		 i = 1일때 [ [1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, ...]]
  }
  return newArr;
}
console.log(division(fillArr, 5));
// console.log(fillArr);

// ---------------------------------------------------------

// 다른 풀이
function division(arr, n) {
  // 	// 2. 반환할 빈 배열 선언
  const newArr = [];

  // 3. for문으로 n개씩 증가하여 담을 조건 만들고 slice 사용하여 각 인덱스에 5개씩 담기
  for (let i = 0; i < fillArr.length; i += n) {
    newArr.push(arr.slice(i, i + n));
  }
  return newArr;
}
console.log(division(fillArr, 5));
// console.log(fillArr);

// slice(startIndex, endIndex-1)
// i=0, slice(0, 0+5) 0~4번 인덱스가 newArr[0]에 담김 [1, 2, 3, 4, 5]
// i=5, slice(5, 5+5) 5~9번 인덱스가 newArr[1]에 담김 [6, 7, 8, 9, 10]
// i=10, slice(10, 10+5) 10~14번 인덱스가 newArr[2]에 담김 [11, 12, 13, 14, 15]
// ...
// i=75, slice(10, 10+5) 10~14번 인덱스가 newArr[15]에 담김 [76, 77, 78, 79, 80]
// i=80 일때 i < fillArr.length 조건에 만족하지 않으므로 for문 종료

// 0 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
// 0 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75
