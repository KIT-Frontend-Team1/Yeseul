const users = [
  {
    id: 1,
    name: '김사과',
    age: 20,
    height: 190,
  },
  {
    id: 2,
    name: '이수박',
    age: 32,
    height: 185,
  },
  {
    id: 3,
    name: '오렌지',
    age: 20,
    height: 180,
  },
  {
    id: 4,
    name: '이멜론',
    age: 28,
    height: 175,
  },
];

const $info = document.querySelector('#info');
let index = 0;
function infoPaint() {
  $info.innerHTML = `
      <div>${users[index].name}</div>
      <div>${users[index].age}</div>
      <div>${users[index].height}</div>
  `;
}
infoPaint() // 0번 인덱스를 첫 화면으로 시작

/* 
유저 목록 순서대로 보여주기
다음 버튼을 누르면 다음 유저가 보여져야합니다. 단, 마지막 유저일 시 다음은 다시 첫번째 유저가 되어야합니다.
이전 버튼을 누르면 이전 유저가 보여져야합니다. 단, 첫번째 유저일 시 이전은 마지막 유저가 되어야합니다.

또한 DOM API와 배열을 다뤄야할 때 인덱스가 필요한 시점이나 상황이 언제일지 고민해보세요 :)
*/

const $buttons = document.querySelectorAll('button');

const prevBtnHandle = () => {
  index--; // prev 버튼 클릭시 index -1씩 감소하여 각 인덱스의 div 내용을 보여줌
  // console.log(index)
  if(index < 0) index = users.length - 1; // index가 0보다 작아질 때 index값을 마지막 인덱스 위치로 돌려주어 연속적으로 보여준다
  infoPaint()
}

const nextBtnHandle = () => {
  index++; // next 버튼 클릭시 index +1씩 증가하여 각 인덱스의 div 내용을 보여줌
  // console.log(index)
  if(index > users.length - 1) index = 0; // index 번호가 배열의 마지막 길이를 넘어가면 0 으로 초기화
  infoPaint()
}


$buttons[0].addEventListener('click', prevBtnHandle)
$buttons[1].addEventListener('click', nextBtnHandle)