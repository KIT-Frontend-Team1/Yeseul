import { useRecoilValue } from "recoil";
import { todoListState } from "../../recoil/todo/atoms";
import TodoItemCreator from "./todoItemCreator";
import TodoItem from "./todoItem";
import TodoListFilters from "./todoListFilters";
import TodoListStats from "./todoListStats";
import { filteredTodoListSTate } from "../../recoil/todo/selectors";

const TodoList = () => {
  // const todoList = useRecoilValue(todoListState);
  // useRecoilValue로 atom 설정 읽기 가능

  const todoList = useRecoilValue(filteredTodoListSTate);
  // 필터링된 todo 보여주기 todoListState -> filteredTodoListSTate

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
