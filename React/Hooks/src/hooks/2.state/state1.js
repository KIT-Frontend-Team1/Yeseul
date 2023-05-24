import { useState } from "react";
import PlayListMock from "../../__mock__/playList.json";

function State1() {
  /*
    문제 1.

    state를 다루기 위한 기초 문제입니다.
    음악 목록 10가지의 mock data가 있습니다.

    아래에 추가버튼을 눌러 목록에 리스트를 추가하고
    삭제 버턴을 눌렀을 때 데이터가 삭제될 수 있도록 해주세요
  */
  console.log(PlayListMock.playlist);
  /* 데이터 콘솔에 찍어두었으니 확인해볼 것 */
  /*
1. mock데이터인 playlist를 먼저 ul 안의 li 값으로 가져올 것, 배열 형태의 값을 map로 순회하여 값을 가져온다
2. <li> 안에 h3 - title, p - signer 추가로 삭제 버튼을 생성해준다.
3. PlayListMock.playlist를 playList state 배열의 useState의 초기값으로 생성한다.
4. 각 input에 onChange 함수로 실시간으로 입력한 값을 value로 설정한 값({title}, {signer})에 담아주어
  추가할 변수를 생성하여 {} 객체 형태로 담아준다
5. setPlayList로 값을 추가해줄 것인데 기존의 값을 복사하여 그대로 가져오고 추가할 값은 뒤에 적어준다(불변성)
[...prevList, newSong] -> 해석 [...prevList, { title: title, signer: signer}] 여기서 프로퍼티 키와 값이 같으면 생략할 수 있다.
[...prevList, { title, signer}], 기존 데이터 뒤에 추가되어 onAddPlayList 함수가 실행될 때마다 값이 추가되는 것을 UI상으로 확인 가능하다.
*/

  /**
   * 수정 보완 코드 1 ~ 8 넘버링
   */

  const [playList, setPlayList] = useState(PlayListMock.playlist);

  // 1. state 값 하나로 묶어서 사용하기
  const [song, setSong] = useState({
    title: "",
    signer: "",
  });

  // 2. state를 하나의 객체값으로 관리하면 기존 코드처럼 같은 기능을 하는 함수를 따로 작성할 필요가 없다(재사용성)
  // 3. 새로운 객체를 선언하여 상태 업데이트 최적화
  const onChangeInputValue = (e) => {
    const { name, value } = e.target;
    setSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  // playlist 추가 함수
  const onAddPlayList = () => {
    // 4. 객체로 관리하면 값을 가져올 때 키와 값이 같지 않아 생략할 수 없는데 이 부분은 아쉬운 점?
    const newSong = { title: song.title, signer: song.signer };
    // 5. 보완 코드(추가함) newSong의 값이 비워져있을 때 추가버튼 클릭 시 li에 추가되는 것 막아주는 로직
    if (newSong.title === "" || newSong.signer === "") return;
    setPlayList((prevList) => [...prevList, newSong]); // 기존값은 그대로 복사, 기존값 뒤에 객체 형태의 newSong을 추가하여 클릭 이벤트시 UI에 보여줌

    // 6. input값 비워주는 로직 따로 작성할 필요가 없음
    setSong({ title: "", signer: "" });
  };

  // 선택한 li 삭제 함수
  const onRemovePlayList = (i) => {
    /*
    7. 삭제 클릭 시 확인 메세지로 재확인 (UX 고려)
    8. 가독성, 삭제 목록을 변수에 담아 가독성을 높임, 디버깅 시에도 용이
    */
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const deletePlayList = playList.filter((_, idx) => idx !== i);
      setPlayList(deletePlayList);
    }
  };

  return (
    <>
      <h1>문제1</h1>
      <ul>
        {/* list */}
        {/* 예시 데이터입니다 */}
        {playList.map((list, i) => (
          <li key={i}>
            <h3>{list.title}</h3>
            <p>{list.signer}</p>
            <button onClick={() => onRemovePlayList(i)}>삭제</button>
          </li>
        ))}
        <li>
          <h3>Summer</h3>
          <p>Joe Hisaishi</p>
        </li>
      </ul>
      <div>
        <p>
          곡명 :{" "}
          <input
            name="title"
            value={song.title}
            onChange={onChangeInputValue}
          />
        </p>
        <p>
          가수/작곡 :{" "}
          <input
            name="signer"
            value={song.signer}
            onChange={onChangeInputValue}
          />
        </p>
        <p>
          <button onClick={onAddPlayList}>추가</button>
        </p>
      </div>
    </>
  );
}

export default State1;

// 1차 코드
// import { useState } from "react";
// import PlayListMock from "../../__mock__/playList.json";

// function State1() {
//   /*
//     문제 1.

//     state를 다루기 위한 기초 문제입니다.
//     음악 목록 10가지의 mock data가 있습니다.

//     아래에 추가버튼을 눌러 목록에 리스트를 추가하고
//     삭제 버턴을 눌렀을 때 데이터가 삭제될 수 있도록 해주세요
//   */
//   console.log(PlayListMock.playlist);
//   /* 데이터 콘솔에 찍어두었으니 확인해볼 것 */

//   const [playList, setPlayList] = useState(PlayListMock.playlist);
//   const [title, setTitle] = useState("");
//   const [signer, setSinger] = useState("");

//   const onAddPlayList = () => {
//     const newSong = { title, signer };
//     setPlayList((prevList) => [...prevList, newSong]); // 기존값은 그대로 복사, 기존값 뒤에 객체 형태의 newSong을 추가하여 클릭 이벤트시 UI에 보여줌
//     setTitle(""); // 추가 후 input값 비워주기
//     setSinger(""); // 추가 후 input값 비워주기
//   };

//   // 선택한 li 삭제 함수, <li key = {i}>의 i 값과 json 데이터의 인텍스가 같지 않은 것만 보여주게해라, 즉 같은 인덱스이면 안보이게해서 삭제된 것처럼 보여주기
//   const onRemovePlayList = (i) => {
//     setPlayList(playList.filter((_, idx) => idx !== i));
//   };

//   return (
//     <>
//       <h1>문제1</h1>
//       <ul>
//         {/* list */}
//         {/* 예시 데이터입니다 */}
//         {playList.map((list, i) => (
//           <li key={i}>
//             <h3>{list.title}</h3>
//             <p>{list.signer}</p>
//             <button onClick={() => onRemovePlayList(i)}>삭제</button>
//           </li>
//         ))}
//         <li>
//           <h3>Summer</h3>
//           <p>Joe Hisaishi</p>
//         </li>
//       </ul>
//       <div>
//         <p>
//           곡명 :{" "}
//           <input value={title} onChange={(e) => setTitle(e.target.value)} />
//         </p>
//         <p>
//           가수/작곡 :{" "}
//           <input value={signer} onChange={(e) => setSinger(e.target.value)} />
//         </p>
//         <p>
//           <button onClick={onAddPlayList}>추가</button>
//         </p>
//       </div>
//     </>
//   );
// }

// export default State1;

// 2차
// function State1() {
//   /*
//     문제 1.

//     state를 다루기 위한 기초 문제입니다.
//     음악 목록 10가지의 mock data가 있습니다.

//     아래에 추가버튼을 눌러 목록에 리스트를 추가하고
//     삭제 버턴을 눌렀을 때 데이터가 삭제될 수 있도록 해주세요
//   */
//   console.log(PlayListMock.playlist);
//   /* 데이터 콘솔에 찍어두었으니 확인해볼 것 */

//   const [playList, setPlayList] = useState(PlayListMock.playlist);
//   // const [title, setTitle] = useState("");
//   // const [signer, setSinger] = useState("");

//   // state 값 하나로 묶어서 사용하기
//   const [song, setSong] = useState({
//     title: "",
//     signer: "",
//   });

//   // 객체 전체를 업데이트 해야함
//   const onChangeValue = (e) => {
//     const { name, value } = e.target;
//     setSong((prevSong) => ({ ...prevSong, [name]: value }));
//   };

//   const onAddPlayList = () => {
//     const newSong = { title: song.title, signer: song.signer };
//     setPlayList((prevList) => [...prevList, newSong]); // 기존값은 그대로 복사, 기존값 뒤에 객체 형태의 newSong을 추가하여 클릭 이벤트시 UI에 보여줌
//     setSong({ title: "", signer: "" }); // 추가 후 input값 비워주기
//   };

//   // 선택한 li 삭제 함수, <li key = {i}>의 i 값과 json 데이터의 인텍스가 같지 않은 것만 보여주게해라, 즉 같은 인덱스이면 안보이게해서 삭제된 것처럼 보여주기
//   const onRemovePlayList = (i) => {
//     setPlayList(playList.filter((_, idx) => idx !== i));
//     // setPlayList((prevList) => prevList.filter((_, idx) => idx !== i));
//   };

//   return (
//     <>
//       <h1>문제1</h1>
//       <ul>
//         {/* list */}
//         {/* 예시 데이터입니다 */}
//         {playList.map((list, i) => (
//           <li key={i}>
//             <h3>{list.title}</h3>
//             <p>{list.signer}</p>
//             <button onClick={() => onRemovePlayList(i)}>삭제</button>
//           </li>
//         ))}
//         <li>
//           <h3>Summer</h3>
//           <p>Joe Hisaishi</p>
//         </li>
//       </ul>
//       <div>
//         <p>
//           곡명 :{" "}
//           <input name="title" value={song.title} onChange={onChangeValue} />
//         </p>
//         <p>
//           가수/작곡 :{" "}
//           <input name="signer" value={song.signer} onChange={onChangeValue} />
//         </p>
//         <p>
//           <button onClick={onAddPlayList}>추가</button>
//         </p>
//       </div>
//     </>
//   );
// }

// export default State1;
