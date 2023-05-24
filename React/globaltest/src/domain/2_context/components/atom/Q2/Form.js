import { useUserStore } from "../../../../../store/3_context";
import ContextQ2Form2 from "./Form2";

const ContextQ2Form = () => {
  const [userList, dispatch] = useUserStore();

  // input에 입력한 값 추가 form 제출하면 userList에 추가되는 함수 구현하기
  const addUserList = (e) => {
    e.preventDefault();
    // 1. 먼저 각 input의 값을 가져온다
    const id = Math.floor(Math.random() * 10000);
    const name = e.target.name.value;
    const nickname = e.target.nickname.value;

    // 2. input 값 공백일 때는 실행하지 않기, 얼리리턴
    if (name === "" || nickname === "") {
      return;
    }

    // 3. 객체 추가 로직
    dispatch({ type: "ADD_USER", payload: { id, name, nickname } });

    // 다른 방법
    // dispatch({
    //   type: "ADD_USER",
    //   name: e.target.name.value,
    //   nickname: e.target.nickname.value,
    // });

    // 4. 추가 이후 input값 비워주기
    e.target.name.value = "";
    e.target.nickname.value = "";
  };

  // 배열에 값 잘 추가 되었는지 확인하는 디버깅 과정
  // useEffect(() => {
  //   console.log(userList);
  // }, [userList]);
  console.log("Q2Form: ", userList);

  return (
    <div>
      <form onSubmit={addUserList}>
        <h1>Q2Form</h1>
        <input placeholder="name" name="name" />
        <input placeholder="nick-name" name="nickname" />
        <button>추가</button>
        <ContextQ2Form2 />
      </form>
    </div>
  );
};
export default ContextQ2Form;
