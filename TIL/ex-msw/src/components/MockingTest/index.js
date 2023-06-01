import { useState } from "react";

const MockingTest = () => {
  const [data, setData] = useState("");
  const onHandleClick = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.log(`예상치 못한 에러 발생: ${err}`);
      });
  };
  return (
    <div>
      <button onClick={onHandleClick}>data 데이터 가져오기</button>
      {data && (
        <ul>
          {data.map((data) => (
            <p>
              {data.name} : {data.email}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MockingTest;
