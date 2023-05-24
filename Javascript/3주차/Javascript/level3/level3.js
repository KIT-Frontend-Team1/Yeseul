/* 
레시피 재료 추가하기
*/

/*
1. input 재료명 value 입력하고 용량 인풋에 value를 입력하고
2. 추가 버튼 클릭시
3. table tr뒤에 <!-- <tr>
        <td>`(재료인풋밸류)`</td>
        <td>`(용량인풋밸류)`</td>
        <td><button>삭제</button></td>
      </tr> -->
      가 동적으로 생성
4. 삭제 버튼 누르면 tr 지우기
5. 제출 버튼 누르면 ul 안에 <li>`${재료인풋밸류} : ${용량인풋밸류}`</li> 한번에 보여짐 innerHTML 값으로 보여주면 될 듯
*/

const $ingredient = document.querySelector('input[name="ingredient"]');
const $weight = document.querySelector('input[name="weight"]');
const $plusBtn = document.querySelector("form > button"); // 추가 버튼

const $form = document.querySelector("form");
const $table = document.querySelector("table");
const $tbody = document.querySelector("tbody");

let array = [];
let plusArr = [];
// 1. input 값 배열에 담기
$form.addEventListener("submit", function (e) {
  e.preventDefault();

  // forEach 돌려서 새배열 array에 재료명 push, includes
  const $ingredientRow = document.querySelectorAll(".ingredient");
  // console.log($ingredientRow.innerText);

  $ingredientRow.forEach((v) => {
    array.push(v.innerText);
  });
  console.log(array);

  // 같은 재료이름으로 추가했을 때 이미 array 배열에 담긴 것은 alert띄우기
  if (array.includes($ingredient.value)) {
    alert("이미 존재하는 재료입니다.");
    // 그 외의 일반적 상황
  } else {
    // 추가할 때마다 재료, 무게 배열 생성
    const listArr = [];
    listArr.push({ 재료: $ingredient.value, 무게: $weight.value });
    console.log(listArr);
    
    // 추가시 재료, 무게가 누적으로 배열 생성됨
    plusArr.push({ 재료: $ingredient.value, 무게: $weight.value });
    console.log(plusArr);
    // 인풋 값 공백일 때 sumbit 이벤트 방지
    if ($ingredient.value.length === 0) return;
    if ($weight.value.length === 0) return;
    // 예외처리 후 일반적 상황 tbody에 동적 추가
    $tbody.innerHTML += `<tr>
    <td class="ingredient">${listArr[0].재료}</td>
    <td class="weight">${listArr[0].무게}</td>
    <td><button class="deleteTr">삭제</button></td>
    </tr>`;
  }

  // 추가된 리스트만 삭제하기
  // 1. 삭제 버튼 눌렀을 때 부모의 부모 tr을 삭제해야함
  const $deletTr = document.querySelectorAll(".deleteTr");
  $deletTr.forEach((v) => {
    v.addEventListener("click", function (e) {
      const deleteTrParent = this.parentElement;
      // console.log(deleteTrParent); // <td><button class="deleteTr">삭제</button></td>
      const deleteTr = deleteTrParent.parentElement;
      // console.log(deleteTr) // tr 테이블
      let deleteValue = deleteTr.querySelector(".ingredient").innerText;
      // console.log(deleteTr.querySelector(".ingredient").innerText);
      plusArr = plusArr.filter((v) => v.재료 !== deleteValue);
      array = array.filter((v) => v.재료 !== deleteValue);
      deleteTr.remove();
    });
  });
});

// 제출 버튼을 클릭했을 때 li를 추가 text > class="ingredient"의 text : class="weight"의 text
const $submitButton = document.getElementById("submit_button");
const $ul = document.getElementById("ingredient-list");
$submitButton.addEventListener("click", () => {
  $ul.innerHTML = "";
  plusArr.forEach((v) => {
    const $li = document.createElement("li");
    $li.innerText = `${v.재료} : ${v.무게}`;
    $ul.appendChild($li);
  });
  console.log(plusArr);
});
