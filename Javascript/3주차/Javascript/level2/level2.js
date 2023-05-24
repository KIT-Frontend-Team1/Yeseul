import { RESERVATION_LIST } from "./reservation .js";
// console.log(RESERVATION_LIST);
// console.log(RESERVATION_LIST[0].name);

/* 
예약 고객확인하기
예약번호 확인 버튼 submit 이벤트
1. 이름과 연락처 둘중 하나라도 맞지 않으면
이름 input 의 value 또는 연락처 input 의 value가 RESERVATION_LIST 키에 없으면 
-> alert('일치하는 내역이 없습니다.') 띄우고 innerHTML에 "일치하는 내역이 없습니다."
2. 이름, 연락처 모두 만족하면 RESERVATION_LIST의 number값 가져와 innerHTML에 보여주기
*/

const $form = document.querySelector("form");
const $userName = document.querySelector("input[name='user-name']");
const $userPhone = document.querySelector("input[name='user-phone']");
const $reservationNumber = document.getElementById("reservation-number");
// console.log($userName)
// console.log($userPhone)

function findList() {
  const findCustomer = RESERVATION_LIST.filter(
    (v) => v.name === $userName.value && v.phone === $userPhone.value
  );
  console.log(findCustomer); // filter한 배열의 요소인 오브젝트가 찍힘
  if (findCustomer.length === 0) {
    // 일치하는 항목이 없는 경우 -> result 배열의 길이가 0인 조건으로 확인
    alert("일치하는 내역이 없습니다.");
    $reservationNumber.innerHTML = `일치하는 내역이 없습니다`;
  } else {
    // 입력한 각 input의 value와 findCustomer의 프로퍼티 값이 일치하는 경우
    $reservationNumber.innerHTML = findCustomer[0].number;
    // console.log(findCustomer.length); // 1
  }
}

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  findList();
});

// else 조건
// else (findCustomer[0].name !== $userName.value && findCustomer[0].phone !== $userPhone.value) {
//   $reservationNumber.innerHTML = `${findCustomer[0].number}`;
//   // console.log(findCustomer.length) // 1
// }
