import { atom } from "recoil";

// atom 리스트를 todoListState를 통해 key값(고유한 값)과 초기값(빈배열) 설정
export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});
