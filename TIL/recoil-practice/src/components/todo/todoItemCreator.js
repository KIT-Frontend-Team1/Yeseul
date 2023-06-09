/*
1. input에 입력한 값 저장하여 
2. addItem 함수가 실행될 때 추가되어 렌더링하기
*/

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../recoil/todo/atoms";

// todo 아이템 생성
const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState); // todoListState 업데이트 하기 위해 useSetRecoilState: 쓰기 전용(setter return)

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChangeInputValue = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChangeInputValue} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;

let id = 0;
function getId() {
  return id++;
}
