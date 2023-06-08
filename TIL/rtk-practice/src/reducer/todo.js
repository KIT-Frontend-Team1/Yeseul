import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 0,
      content: "코코랑 산책하기 🦊",
      state: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodo(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
      return state;
    },
    updateTodo(state, action) {
      return state;
    },
    completeTodo(state, action) {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      state.todos[index].state = action.payload.state;
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { getTodo, addTodo, updateTodo, completeTodo, deleteTodo } =
  todoSlice.actions;
