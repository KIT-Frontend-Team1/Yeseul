import { combineReducers } from "@reduxjs/toolkit";
import { cartSlice } from "./cart";
import { todoSlice } from "./todo";
import { listSlice } from "./list";

export const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  todo: todoSlice.reducer,
  list: listSlice.reducer,
});
