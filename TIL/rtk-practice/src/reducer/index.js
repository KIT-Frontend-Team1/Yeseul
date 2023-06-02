import { combineReducers } from "@reduxjs/toolkit";
import { cartSlice } from "./cart";

export const rootReducer = combineReducers({ cart: cartSlice.reducer });
