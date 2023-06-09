import { selector } from "recoil";
import { todoListFilterState, todoListState } from "./atoms";

// 필터링된 todo 리스트
// atom의 filteredTodoListSTate, todoListState를 사용해서 필터링된 리스트를 파생하는 filteredTodoListSTate selector 구성
export const filteredTodoListSTate = selector({
  key: "filteredTodoListSTate",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);
    // 둘 중 하나라도 변하면 filteredTodoListSTate 재실행

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show UnCompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

// todo 리스트 통계
export const todoListStateState = selector({
  key: "todoListStateState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length; // todo 항목 총 갯수
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length; // 완료된 항목 갯수
    const totalUnCompletedNum = totalNum - totalCompletedNum; // 미완료 항목 갯수 (전체 - 완료)
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum; // 완료 항목 백분율

    return {
      totalNum,
      totalCompletedNum,
      totalUnCompletedNum,
      percentCompleted,
    };
  },
});
// todoListStateState 읽기 위해 useRecoilState 사용
