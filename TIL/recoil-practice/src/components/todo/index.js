import { useRecoilValue } from "recoil";
import { todoListState } from "../../recoil/todo/atoms";
import TodoItemCreator from "./todoItemCreator";
import TodoItem from "./todoItem";
import TodoListFilters from "./todoListFilters";
import TodoListStats from "./todoListStats";

const TodoList = () => {
  const todoList = useRecoilValue(todoListState);

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
