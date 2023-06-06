import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 1. 초기값인 initialState 만들어준다
const initialState = {
  todos: [], // 1-1 todos라는 빈배열 설정
  getTodoState: {
    loading: false,
    done: false,
    err: null,
  },
  addTodoState: {
    // 1-2 todo를 추가할 때의 상태 설정(데이터를 백엔드와 통신하여 db에 넣어줘야하므로 비동기 통신 과정-시간이 걸림)
    loading: false, // 1-3 데이터 추가될 때 로딩페이지, 초기 상태는 false(로딩 페이지 보여주면 x)
    done: false, // 1-4 성공 or 통신 끝, 초기 상태 요청하지 않았으므로 false
    err: null, // 1-5 에러 메세지, 초기값 null (요청하지 않았으므로)
  },
  updateTodoState: {
    loading: false,
    done: false,
    err: null,
  },
  checkTodoState: {
    loading: false,
    done: false,
    err: null,
  },
  deleteTodoState: {
    loading: false,
    done: false,
    err: null,
  },
};

// 2. reducer 만들기 : rtk에서 createSlice import한다.
export const todoSlice = createSlice({
  name: "todo", // 2-1. createSlice의 이름 설정
  initialState, // 2-2. 초기값, initialState: initialState 키와 값이 같으면 값 생략 가능
  // extraReducers가 자동으로 로딩, 성공, 실패를 해줌으로 dispatch 한번만 날리면 됨
  extraReducers: (builder) => {
    // getTodo loading
    builder.addCase(getTodo.pending, (state) => {
      // loading일 때?
      state.getTodoState.loading = true;
      state.getTodoState.done = false;
      state.getTodoState.err = null;
    });
    // getTodo fulfilled
    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.getTodoState.loading = false;
      state.getTodoState.done = true;
      state.getTodoState.err = null;
    });
    // getTodo rejected
    builder.addCase(getTodo.rejected, (state, action) => {
      state.getTodoState.loading = false;
      state.getTodoState.done = true;
      state.getTodoState.err = action.payload;
    });

    // addTodo loading
    builder.addCase(addTodo.pending, (state) => {
      // loading일 때?
      state.addTodoState.loading = true;
      state.addTodoState.done = false;
      state.addTodoState.err = null;
    });
    // addTodo fulfilled
    builder.addCase(addTodo.fulfilled, (state, action) => {
      // thunk가 return한 값은 action.payload
      state.todos.unshift(action.payload);
      state.addTodoState.loading = false;
      state.addTodoState.done = true;
      state.addTodoState.err = null;
    });
    // addTodo rejected
    builder.addCase(addTodo.rejected, (state, action) => {
      state.addTodoState.loading = false;
      state.addTodoState.done = true;
      state.addTodoState.err = action.payload;
    });

    // UPDATE
    builder.addCase(updateTodo.pending, (state) => {
      // loading일 때?
      state.updateTodoState.loading = true;
      state.updateTodoState.done = false;
      state.updateTodoState.err = null;
    });
    // updateTodo fulfilled
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === Number(action.payload.id)
      );
      console.log(index);
      // if (index !== -1) {
      state.todos[index].content = action.payload.content;
      // }
      state.updateTodoState.loading = false;
      state.updateTodoState.done = true;
      state.updateTodoState.err = null;
    });
    // updateTodo rejected
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.updateTodoState.loading = false;
      state.updateTodoState.done = true;
      state.updateTodoState.err = action.payload;
    });

    // CHECK UPDATE
    builder.addCase(checkTodo.pending, (state) => {
      // loading일 때?
      state.checkTodoState.loading = true;
      state.checkTodoState.done = false;
      state.checkTodoState.err = null;
    });
    // checkTodo fulfilled
    builder.addCase(checkTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === Number(action.payload.id)
      );
      console.log(index);
      if (index !== -1) {
        state.todos[index].state = action.payload.state;
      }
      state.checkTodoState.loading = false;
      state.checkTodoState.done = true;
      state.checkTodoState.err = null;
    });
    // checkTodo rejected
    builder.addCase(checkTodo.rejected, (state, action) => {
      state.updateTodoState.loading = false;
      state.updateTodoState.done = true;
      state.updateTodoState.err = action.payload;
    });

    // DELETE
    builder.addCase(deleteTodo.pending, (state) => {
      // loading일 때?
      state.deleteTodoState.loading = true;
      state.deleteTodoState.done = false;
      state.deleteTodoState.err = null;
    });
    // deleteTodo fulfilled
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      // thunk가 return한 값은 action.payload
      state.todos = state.todos.filter(
        (todo) => todo.id !== Number(action.payload.id)
      );
      state.deleteTodoState.loading = false;
      state.deleteTodoState.done = true;
      state.deleteTodoState.err = null;
    });
    // deleteTodo rejected
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.deleteTodoState.loading = false;
      state.deleteTodoState.done = true;
      state.deleteTodoState.err = action.payload;
    });
  },
});

// createAsyncThunk 써보기
// todo/addTodo 얘가 타입명
export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async ({ title, content }) => {
    // msw로 만든 가상 백엔드와 데이터 통신
    // 데이터 통신 -> client -> request
    // method (get, post, delete, patch, put, header, options...) 명은 -> 백엔드에서 정해주는 것임(server) -> rest api 자원의 이름에 맞게
    console.log(title, content);
    const res = await axios.post("/api/todo", { title, content });
    // console.log(res) 얘 무조건 콘솔 찍어보자!
    // res.data --> 백엔드에서 response한 값은 data 키에 담긴다
    console.log(res);
    return res.data;
  }
);

export const getTodo = createAsyncThunk("todo/getTodo", async () => {
  const res = await axios.get("/api/todo");
  return res.data;
});

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, content }) => {
    console.log(id, content);
    const res = await axios.patch(`/api/todo/${id}/update`, { content });
    console.log(res);
    return res.data;
  }
);

export const checkTodo = createAsyncThunk(
  "todo/checkTodo",
  async ({ id, state }) => {
    console.log(id, state);
    const res = await axios.patch(`/api/todo/${id}`, { state });
    console.log(res);
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async ({ id }) => {
    console.log(id);
    const res = await axios.delete(`/api/todo/${id}`);
    console.log(res);
    console.log(res.data);
    return res.data; // action.payload
  }
);
