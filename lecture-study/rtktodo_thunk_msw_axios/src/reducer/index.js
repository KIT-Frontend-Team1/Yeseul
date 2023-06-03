import { combineReducers } from "redux";
import { todoSlice } from "./todo"; // 1. todoSlice를 import

// 2. todo에 todoSlice.reducer 를 넣어준다
export const rootReducer = combineReducers({ todo: todoSlice.reducer });
