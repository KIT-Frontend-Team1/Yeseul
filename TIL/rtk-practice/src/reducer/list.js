import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// extraReducer와 createAsyncThunk의 사용

// 1. 초기값 생성
const initialState = {
  lists: [],
  getListState: {
    loading: false,
    done: false,
    err: null,
  },
  addListState: {
    loading: false,
    done: false,
    err: null,
  },
};

// 2. reducer 생성
export const listSlice = createSlice({
  name: "list",
  initialState,
  extraReducers: (builders) => {
    // 2-1. 목데이터 조회하기(pending, fulfilled, rejected 상태)
    builders.addCase(getList.pending, (state) => {
      state.getListState.loading = true;
      state.getListState.done = false;
      state.getListState.err = null;
    });
    builders.addCase(getList.fulfilled, (state, action) => {
      state.lists = action.payload;
      state.getListState.loading = false;
      state.getListState.done = true;
      state.getListState.err = null;
    });
    builders.addCase(getList.rejected, (state, action) => {
      state.getListState.loading = false;
      state.getListState.done = true;
      state.getListState.err = action.payload;
    });

    // 2-2. lists 배열에 plan 추가하기
    builders.addCase(addList.pending, (state) => {
      state.addListState.loading = true;
      state.addListState.done = false;
      state.addListState.err = null;
    });
    builders.addCase(addList.fulfilled, (state, action) => {
      state.lists.push(action.payload);
      state.addListState.loading = false;
      state.addListState.done = true;
      state.addListState.err = null;
    });
    builders.addCase(addList.rejected, (state, action) => {
      state.addListState.loading = false;
      state.addListState.done = true;
      state.addListState.err = action.payload;
    });
  },
});

//
export const getList = createAsyncThunk("list/get", async () => {
  const res = await axios.get("/api/list");
  console.log(res.data);
  return res.data;
});

export const addList = createAsyncThunk("list/add", async ({ content }) => {
  const res = await axios.post("/api/list", { content });
  return res.data;
});
