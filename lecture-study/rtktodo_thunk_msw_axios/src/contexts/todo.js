
// context? => 전역 상태 관리 도구, 다른 라이브러리의 의존도가 생기지 않음
// 전역 상태 관리해야하는 이유? 

import { createContext, useReducer } from "react";


// 1. props drilling, 현재 해당 컴포넌트에는 필요하지 않음에도 자식 컴포넌트에게 props를 전달 하기위하여
// 2. 부모가 알지 못하는 상태를 알고 있는가?


//순서
// 1. 냉장고 만들기
export const TodoContenxt = createContext()
// 2. 기본값 만들기
const initialState = [];
// 3. provider => 왜? 사용하는 영역을 감싸주기 위해서
// 4. 전역으로 사용할 state 생성 --> useReducer(o), useState 
// 5. reudcer 생성
// const [todoList, dispatch] = useReducer()
//       ------상태명,------ dispatcher명 = useReducer(reducer함수, 기본값)
// 6. redcuer 함수 생성
const todoReducer = (staet, action) => {}
// 7. Provider 내가 전역으로 사용하고자하는 값을 value로 전달
// 8. 주의사항, 보내야할 데이터가 여러개라면 구조 분해 할당해서 참조할 수 있도록 객체로 전달
const TodoProvider = ({children}) => {
    const [todoList, dispatch] = useReducer(todoReducer, initialState)
    // state는 그냥 상태를 생성할 뿐
    // 그러나 reducer는 reducer함수를 통해 업데이트 로직을 외부 파일로 분리하여 해당 로직을 재사용
    return (
        <TodoContenxt.Provider value={[todoList, dispatch]}>
            {children}
        </TodoContenxt.Provider>
    )
}
export default TodoProvider
// 9. app.js에 감싸주면 끝
// 10. 어디서는 쉽게 참조할 수 있도록 useContext를 해당 파일에 만들어서 export




