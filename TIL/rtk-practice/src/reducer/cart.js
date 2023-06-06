import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
// };

export const cartSlice = createSlice({
  name: "carts",
  initialState: [{ id: 0, name: "Apple Watch", count: 1, price: 50 }],
  reducers: {
    addCount(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      state[index].count++;
      state[index].price += 50;
    },
    minusCount(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (state[index].count === 0) return state;
      state[index].count--;
      state[index].price -= 50;
    },
  },
});

export const { addCount, minusCount } = cartSlice.actions;
