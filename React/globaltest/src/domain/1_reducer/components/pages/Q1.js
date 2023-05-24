import NavigateButton from "../../../../components/NavigateButton";
import Q1Form from "../atom/Form";
import ReducerQ1List from "../atom/List";
import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../../../../store/1_reducer";
import { useReducer } from "react";
import ingredientReducer from "../../../../store/1_reducer";

const ReducerQ1Page = () => {
  /* 
      문제 1)
      로직 분리하기
    
      재료 추가 로직 분리하기

      1) 재료 추가 로직 작성하기
      2) 재료 삭제 로직 작성하기

      3) 위 로직을 현재 컴포넌트가 아닌 비즈니스 로직을 분리하여
          src/store/1_reducer.js에 구현해보세요
    */

  const initialState = [
    { id: 1, name: "피자 도우", price: 1000 },
    { id: 2, name: "토마토 소스", price: 500 },
    { id: 3, name: "치즈", price: 1000 },
    { id: 4, name: "피망", price: 500 },
    { id: 5, name: "양파", price: 500 },
  ];

  const [itemList, dispatch] = useReducer(ingredientReducer, initialState);

  /* 
  재료, 가격 input에 입력하여 
  추가 버튼 클릭 시 li 아래로 추가 되어야함
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100000);
    const name = e.target.name.value;
    const price = e.target.price.value;

    const newIngredient = {
      id,
      name,
      price,
    };

    dispatch({ type: ADD_INGREDIENT, payload: newIngredient });
  };

  const handleRemove = (id) => {
    dispatch({ type: DELETE_INGREDIENT, payload: id });
  };

  return (
    <>
      <h2>문제 1</h2>
      <table>
        <thead>
          <tr>
            <th>재료</th>
            <th>가격</th>
          </tr>
        </thead>
        <ReducerQ1List ingredients={itemList} onRemove={handleRemove} />
      </table>
      <Q1Form onSubmit={handleSubmit} />
      <NavigateButton isFistPage to={"/2_context/q1"} />
    </>
  );
};
export default ReducerQ1Page;

/* 리팩토링
    : 1_reducer 에 커스텀 훅을 만들어 사용
*/
// import NavigateButton from "../../../../components/NavigateButton";
// import Q1Form from "../atom/Form";
// import ReducerQ1List from "../atom/List";
// import useIngredientReducer from "../../../../store/1_reducer";

// const ReducerQ1Page = () => {
//   /*
//       문제 1)
//       로직 분리하기

//       재료 추가 로직 분리하기

//       1) 재료 추가 로직 작성하기
//       2) 재료 삭제 로직 작성하기

//       3) 위 로직을 현재 컴포넌트가 아닌 비즈니스 로직을 분리하여
//           src/store/1_reducer.js에 구현해보세요
//     */

//   const { ingredients, addIngredient, deleteIngredient } =
//     useIngredientReducer();

//   /*
//   재료, 가격 input에 입력하여
//   추가 버튼 클릭 시 li 아래로 추가 되어야함
//   */
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const id = Math.floor(Math.random() * 100000);
//     const name = e.target.name.value;
//     const price = e.target.price.value;

//     const newIngredient = {
//       id,
//       name,
//       price,
//     };

//     addIngredient(newIngredient);
//   };

//   const handleRemove = (ingredientId) => {
//     deleteIngredient(ingredientId);
//   };

//   return (
//     <>
//       <h2>문제 1</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>재료</th>
//             <th>가격</th>
//           </tr>
//         </thead>
//         <ReducerQ1List ingredients={ingredients} onRemove={handleRemove} />
//       </table>
//       <Q1Form onSubmit={handleSubmit} />
//       <NavigateButton isFistPage to={"/2_context/q1"} />
//     </>
//   );
// };
// export default ReducerQ1Page;
