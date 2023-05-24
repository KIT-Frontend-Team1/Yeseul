// 재료 추가, 삭제 로직 짜기
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

// 추가, 삭제 기능 reducer
const ingredientReducer = (state, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return [...state, action.payload];
    }
    case DELETE_INGREDIENT: {
      return state.filter((item) => item.id !== action.payload);
    }
    default: {
      return state;
    }
  }
};
export default ingredientReducer;

// 리팩토링, reducer 커스텀 훅으로 빼기
// import { useReducer } from "react";

// const initialState = [
//   { id: 1, name: "피자 도우", price: 1000 },
//   { id: 2, name: "토마토 소스", price: 500 },
//   { id: 3, name: "치즈", price: 1000 },
//   { id: 4, name: "피망", price: 500 },
//   { id: 5, name: "양파", price: 500 },
// ];

// export const ADD_INGREDIENT = "ADD_INGREDIENT";
// export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

// // 추가, 삭제 기능 reducer
// const ingredientReducer = (state, action) => {
//   switch (action.type) {
//     case ADD_INGREDIENT: {
//       return [...state, action.payload];
//     }
//     case DELETE_INGREDIENT: {
//       return state.filter((item) => item.id !== action.payload);
//     }
//     default: {
//       return state;
//     }
//   }
// };

// const useIngredientReducer = () => {
//   const [ingredients, dispatch] = useReducer(ingredientReducer, initialState);

//   const addIngredient = (ingredient) => {
//     dispatch({ type: ADD_INGREDIENT, payload: ingredient });
//   };

//   const deleteIngredient = (ingredientId) => {
//     dispatch({ type: DELETE_INGREDIENT, payload: ingredientId });
//   };

//   return {
//     ingredients,
//     addIngredient,
//     deleteIngredient,
//   };
// };

// export default useIngredientReducer;
