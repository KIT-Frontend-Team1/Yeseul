import { createContext, useContext, useReducer } from "react";

const initialState = [{ id: 1, name: "홍길동", nickname: "히히" }];

const UserStore = createContext();
export const useUserStore = () => useContext(UserStore);

// 3-2. userList를 초기화하는 함수 생성
// Lazy Initialization
const init = (initialState) => initialState;

const userReducer = (state, action) => {
  switch (action.type) {
    // 1. Form 값을 입력시 initialState 에 유저 객체값을 추가하는 로직
    case "ADD_USER": {
      return [...state, action.payload];
      // 다른 방법
      // const newUser = { name: action.name, nickname: action.nickname };
      // return [...state, newUser];
    }
    // 2. 기존 객체에 속성값 isEdit: true 추가하는 로직
    case "ADD_ISEDIT": {
      return state.map((user) => ({
        ...user,
        isEdit: true,
      }));
    }
    // 3-1. userList를 초기화하는 로직. 이게 맞는지 의문,,?
    // case "RESET":
    //   return initialState;
    // 3-2. userList를 초기화하는 로직.
    // Lazy Initialization
    case "RESET":
      return init(initialState);

    // 4. SUBMIT 버튼 클릭시 isEdit이 true인 값만 출력하게 함, filter 사용하여 action.payload로 전달되는 값이 true일 때만 해당 로직 실행함. user.isEdit을 payload로 전달하고 true 조건으로 설정해주기. 만약 true가 아니라면 콘솔에 나타내지 않아줌.
    case "SUBMIT":
      if (action.payload) {
        console.log(state.filter((user) => user.isEdit));
      }
      return state;
    default: {
      return state;
    }
  }
};

const UserStoreProvider = ({ children }) => {
  // 3-2. 3번째 인자로 init을 추가 Lazy Initialization
  const [userList, dispatch] = useReducer(userReducer, initialState, init);

  return (
    <UserStore.Provider value={[userList, dispatch]}>
      {children}
    </UserStore.Provider>
  );
};

export default UserStoreProvider;
