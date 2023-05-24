// import { useEffect } from "react";
import { useUserStore } from "../../../../../store/3_context";

const ContextQ2Form2 = () => {
  const [userList, dispatch] = useUserStore();
  // 1.button onClick 했을 때 userList 배열에 isEdit:true 속성 추가하는 함수 구현

  const onAddisEditAttribute = () => {
    dispatch({ type: "ADD_ISEDIT", payload: { isEdit: true } });
  };

  // useEffect(() => {
  //   onAddisEditAttribute();
  //   console.log(userList);
  // }, []);

  console.log("Q2Form2: ", userList);

  return (
    <div>
      <h1>Q2Form2</h1>
      <button onClick={onAddisEditAttribute}>STATUS 추가</button>
    </div>
  );
};
export default ContextQ2Form2;
