const user = {
  name: '김성용',
  age: 20,
  height: 190,
};

// 문제1. 위의 객체를 아래의 메소드를 이용하여 반환 값을 출력 하고 각 메소드의 기능을 정의할 것

/* 
(1) user[”key”], user.key
(2) Object.keys()
(3) Object.values()
(4) Object.entries()
(5) for in
*/

// (1) 객체의 키로 값을 가져오는 메서드
console.log(user['name']) // 김성용
console.log(user['age']) // 20
console.log(user['height']) // 190

console.log(user.name) // 김성용
console.log(user.age) // 20
console.log(user.height) // 190

// (2) 객체의 키를 배열로 반환
console.log(Object.keys(user)) // [ 'name', 'age', 'height' ]

// (3) 객체의 키값를 배열로 반환
console.log(Object.values(user)) // [ '김성용', 20, 190 ]

// (4) Object.entries() : 객체의 키: 값 요소를 한쌍이 배열의 요소로 지정되어 배열 형태로 반환
console.log(Object.entries(user)) //  [name: '김성용'], [age: 20], [height: 190] ]

// (5) for in : 객체의 각 키와 값에 접근할 수 있다
for(let key in user) {
  console.log(key);
}
// name, age, height

for(let key in user) {
  console.log(user[key]);
}
// 김성용 20 190

console.log('-----2번-----')

// 문제2. 값이 “김성용”인 속성의 key 찾기
const ksy = Object.keys(user).find((key) => user[key] === '김성용');
console.log(ksy);

for(let key in user) {
  if(user[key] === '김성용')
  console.log(key);
}


console.log('-----3번-----')
// 문제3. 깊은 복사를 통해 user 객체의 복사본을 만든 후 name을 본인의 이름으로 수정

const changeUser = {...user};
changeUser.name = '김예슬';
console.log(changeUser)
