import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

// console.log(BANK_LIST);
// console.log(ACCOUNT_FORM);

// 1. select option 동적 추가하기
const $form = document.getElementById("account-send-form");
const $bankSelector = document.getElementById("bank-selector");
const $accountList = document.getElementById("account-list");

// BANK_LIST 키값만 뽑아 bankArr 배열로 만들기
function bankList(bank) {
  const bankArr = [];
  for (let key in bank) {
    bankArr.push(bank[key]);
  }

  // bankArr 순회하여 select innerHTML 요소로 동적 추가
  const banks = bankArr.map(
    (bank, i) => `<option value="${bank}">${bank}</option>`
  );
  // select 태그 선택하여 innerHTML로 집어넣기
  $bankSelector.innerHTML = banks;
}
bankList(BANK_LIST);

// 은행선택
let selectBank = "성용은행"; // 나중에 첫번째 값 바뀌었을 때 문제됨(이 부분 다시 생각해보자)
$bankSelector.addEventListener("input", function () {
  selectBank = $bankSelector.options[$bankSelector.selectedIndex].text;
  console.log(selectBank);
});

// 2. 숫자 외 입력 방지
const $accountInput = document.getElementById("account-input");
const maxLeng = $accountInput.getAttribute("maxlength");

$accountInput.addEventListener("keyup", function (e) {
  const regExp = /[0-9]/g;
  // console.log(e.target.value);
  // input에 숫자만 넣을 수 있음
  if (!regExp.test(this.value)) {
    alert("숫자만 입력하세요");
    e.target.value = "";
  }
});

// 계좌번호 12자리 입력하여 submit 누르면 ul innerHTML에 동적 추가
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  // BANK_LIST 키를 가져오기
  const bankList = Object.keys(BANK_LIST);
  const bankListKey = bankList.find((key) => BANK_LIST[key] === selectBank);
  // console.log(bankListKey); // 선택된 option의 번호가 찍힘

  // ACCOUNT_FORM의 값을 가져오기(미해결 부분**)
  console.log(ACCOUNT_FORM[bankListKey]);
  // if submit 시 #accout의 길이 12자리 미만이면 alert(')
  if ($accountInput.value.length !== 12) {
    alert("12자리를 입력하세요");
  } else {
    if (!$accountInput.value) return;
    const $li = document.createElement("li");

    $accountList.appendChild($li);
    $li.appendChild(
      document.createTextNode(`${selectBank} : ${ACCOUNT_FORM[bankListKey]}`)
    ); // ACCOUNT_FORM[bankListKey] <= $accountInput.value
  }
  // submit 후 공백
  $accountInput.value = "";
});
