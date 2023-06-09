import { useRecoilState } from "recoil";
import { todoListState } from "../../recoil/todo/atoms";

// todoList 표시와 수정, 삭제
const TodoItem = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState); // atom 상태 읽기, 쓰기
  // todoList를 읽고 업데이트하고 완료 표시, 삭제하는데 사용하는 setter 함수 사용 위해 useRecoilState를 사용

  const index = todoList.findIndex((todo) => todo === item);

  // 내용 수정
  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  // 완료 상태
  const toggleItemComplete = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  // 삭제
  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };
  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemComplete}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  // 인덱스 -1까지 배열 복사, 새로운 값으로 대체(수정), index+1번 부터 끝까지 복사
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
} // 해당 인덱스 삭제하는 로직
