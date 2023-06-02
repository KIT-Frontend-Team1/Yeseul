import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값인 initialState 만들어준다
const initialState = {
  todos: [], // 1-1 todos라는 빈배열 설정
  addTodoState: {
    // 1-2 todo를 추가할 때의 상태 설정(데이터를 백엔드와 통신하여 db에 넣어줘야하므로 비동기 통신 과정-시간이 걸림)
    loading: false, // 1-3 데이터 추가될 때 로딩페이지, 초기 상태는 false(로딩 페이지 보여주면 x)
    done: false, // 1-4 성공 or 통신 끝, 초기 상태 요청하지 않았으므로 false
    err: null, // 1-5 에러 메세지, 초기값 null (요청하지 않았으므로)
  },
};

// 2. reducer 만들기 : rtk에서 createSlice import한다.
export const todoSlice = createSlice({
  name: "todo", // 2-1. createSlice의 이름 설정
  initialState, // 2-2. 초기값, initialState: initialState 키와 값이 같으면 값 생략 가능
  reducers: {
    // 2-3. reducer 로직 작성
    addTodo(state, action) {
      // [...state, action.payload] 기존 불변성 지키는 로직
      // immer, 불변성으로 자동으로 지켜주는 라이브러리, 불변성을 지킬 필요 없음
      state.todos.unshift(action.payload);
    },
    updateTodo(state, action) {
      // 업데이트 로직 작성
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].content = action.payload.content;
      state.todos[index].state = action.payload.state;
    },
    updateTodoEdit(state, action) {
      // const { id, content, state: newState } = action.paylod 이런 방식으로 작성하여
      // 이렇게 작성하는 방법도 있음
      // const index = state.todos.findIndex(
      //   (todo) => todo.id === id
      // );
      // state.todos[index].content = content;
      // state.todos[index].state = newState;

      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].content = action.payload.content;
      state.todos[index].state = action.payload.state;
    },
    deleteTodo(state, action) {
      // 삭제 로직 작성
      // const { id } = action.payload;
      // state.todos = state.todos.filter((todo) => todo.id !== id);

      // 한 줄로 바꾸기
      // state.todos = state.todos.filter((todo) => todo.id !== action.payload);

      // splice 사용해보기
      const index = state.todos.findIndex((todo) => todo.id === action.payload);

      state.todos.splice(index, 1);
    },
  },
});

export const { addTodo, updateTodo, updateTodoEdit, deleteTodo } =
  todoSlice.actions;
// 액션 자동생성 createAction 함수를 만들지 않아도 dispatch의 action명을 함수로 사용하여 매개변수에 액션 객체를 전달받을 수 있다

// ex) dispatchEvent(addTodo(newTodo))
