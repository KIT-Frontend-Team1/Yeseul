import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItem(state, action) {
      return state;
    },
  },
});

export const { addItem } = cartSlice.actions;
