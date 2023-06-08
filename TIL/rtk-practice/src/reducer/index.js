import { combineReducers } from "@reduxjs/toolkit";
import { cartSlice } from "./cart";
import { todoSlice } from "./todo";

export const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  todo: todoSlice.reducer,
});
