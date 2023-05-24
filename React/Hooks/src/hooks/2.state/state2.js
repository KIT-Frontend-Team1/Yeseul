import { useState } from "react";
import styled from "styled-components";
import Comment from "../../components/2.state/comment";

// ➡️ 수정, 보완 코드
// ⭐ 이전 코드의 경우 하단 주석 처리
function State2() {
  /*  
    문제 2.

    Q1. 아래 작성된 state의 mock data를 활용하여
        댓글 목록을 화면에 랜더링 해보세요 :)
        Components는 src/components/state/comment.js를 활용하세요
        
    Q2. 댓글 작성 수정 삭제 기능을 구현해보세요 :)
            1. 댓글 작성 기능
            2. 댓글 수정 기능
            3. 댓글 삭제 기능 ( 본인이 작성한 댓글만 삭제할 수 있습니다, myComment 활용 )
    */

  const [post, setPost] = useState({
    title: "안녕하세요 여러분 김성용 강사입니다 :)",
    content: "오늘도 모두 화이팅입니다!",
    User: {
      nickname: "김성용",
      age: 20,
      height: 190,
    },
    Comments: [
      {
        User: {
          nickname: "김사과",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "반하나",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "오렌지",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "이멜론",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "박수박",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
    ],
  });

  /**
   * 수정 보완 코드 1 ~ 8 넘버링
   */
  const [newCo, setNewCo] = useState({
    nickname: "",
    content: "",
  });

  // 1. onChangeNicknameInput, onChangeContentInput 동일한 로직, 하나의 함수로 모듈화하여 재사용성 높임.
  const onChangeCommentInfoValue = (e, value) => {
    setNewCo({
      ...newCo,
      [value]: e.target.value,
    });
    // console.log(value);
  };

  // Comment 추가 함수
  const onAddComment = (e) => {
    // 2. input 값 비어있으면 추가할 수 없게 ealry return 추가
    if (newCo.nickname === "" && newCo.content) return;
    // 새로운 댓글 객체
    const newCom = {
      User: {
        nickname: newCo.nickname, // input 입력값
      },
      content: newCo.content, // input 입력값
      myComment: true, // 자신이 쓴 댓글 조건 생성
    };

    // 새로운 댓글 앞에 추가하여 post 업데이트
    setPost((prevPost) => ({
      ...prevPost,
      Comments: [newCom, ...prevPost.Comments],
    }));
  };

  // 수정함수
  const onUpdateComment = (index, updateContent) => {
    // 수정한 댓글
    const updateComment = {
      ...post.Comments[index], // content 이외의 값은 그대로 복사
      content: updateContent,
    };
    // 댓글 목록 깊은 복사
    const updateComments = [...post.Comments];
    // 수정한 댓글 객체로 댓글 목록 변경, index로 확인하여 변경
    updateComments[index] = updateComment;

    // post 업데이트
    setPost((prevPost) => ({
      ...prevPost,
      Comments: updateComments,
    }));
  };

  // 삭제함수
  const onDeleteComment = (index) => {
    if (post.Comments[index].myComment === true) {
      // 3. 삭제 클릭 시 확인 메세지로 재확인 (UX 고려)
      if (window.confirm("정말 삭제하시겠습니까?")) {
        setPost((prevPost) => ({
          ...prevPost,
          Comments: prevPost.Comments.filter((_, i) => i !== index),
        }));
      }
    }
  };

  return (
    <S.Wrapper>
      <h1>문제2</h1>
      <S.PostBox>
        <S.PostTitle>제목: {post.title}</S.PostTitle>
        <S.PostContent>내용: {post.content}</S.PostContent>
      </S.PostBox>
      <S.PostInfo>
        <p>
          작성자: <span>{post.User.nickname}</span>
        </p>
        <p>
          작성자 나이: <span>{post.User.age}</span>
        </p>
        <p>
          작성자 키: <span>{post.User.height}</span>
        </p>
      </S.PostInfo>
      <div>
        <p>
          댓글 수: <span>{post.Comments.length}</span>
        </p>
        <input
          placeholder="작성자"
          value={newCo.nickname}
          onChange={(e) => onChangeCommentInfoValue(e, "nickname")}
        />
        <input
          placeholder="댓글 내용"
          value={newCo.content}
          onChange={(e) => onChangeCommentInfoValue(e, "content")}
        />
        <button onClick={onAddComment}>댓글 작성</button>
      </div>
      <S.CommentList>
        {/* list */}
        {/* Q1. 댓글 목록을 컴포넌트로 가져오기, 컴포넌트에서 props로 속성을 전달하여 데이터를 map으로 순회하여 리턴하여 보여줌. */}
        {post.Comments.map((item, index) => (
          <Comment
            key={index}
            name={item.User.nickname}
            content={item.content}
            onUpdate={(updateContent) => onUpdateComment(index, updateContent)}
            onDelete={() => onDeleteComment(index)}
          />
        ))}
      </S.CommentList>
    </S.Wrapper>
  );
}
export default State2;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  background-color: #999;
  width: 360px;
  padding: 10px;
`;

const PostTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const PostContent = styled.p`
  color: #fff;
`;

const PostInfo = styled.div`
  width: 360px;
  border: 3px solid #f00;
  padding: 10px;
  margin: 10px;

  p {
    display: flex;
    justify-content: space-around;
  }

  span {
    font-weight: bold;
  }
`;

const CommentList = styled.ul`
  width: 960px;
`;

const S = {
  Wrapper,
  PostBox,
  PostTitle,
  PostContent,
  PostInfo,
  CommentList,
};

// 1차 코드
// import { useState } from "react";
// import styled from "styled-components";
// import Comment from "../../components/2.state/comment";

// function State2() {
//   /*
//     문제 2.

//     Q1. 아래 작성된 state의 mock data를 활용하여
//         댓글 목록을 화면에 랜더링 해보세요 :)
//         Components는 src/components/state/comment.js를 활용하세요

//     Q2. 댓글 작성 수정 삭제 기능을 구현해보세요 :)
//             1. 댓글 작성 기능
//             2. 댓글 수정 기능
//             3. 댓글 삭제 기능 ( 본인이 작성한 댓글만 삭제할 수 있습니다, myComment 활용 )
//     */

//   const [post, setPost] = useState({
//     title: "안녕하세요 여러분 김성용 강사입니다 :)",
//     content: "오늘도 모두 화이팅입니다!",
//     User: {
//       nickname: "김성용",
//       age: 20,
//       height: 190,
//     },
//     Comments: [
//       {
//         User: {
//           nickname: "김사과",
//         },
//         content: "오늘도 화이팅입니다!",
//         myComment: false,
//       },
//       {
//         User: {
//           nickname: "반하나",
//         },
//         content: "오늘도 화이팅입니다!",
//         myComment: false,
//       },
//       {
//         User: {
//           nickname: "오렌지",
//         },
//         content: "오늘도 화이팅입니다!",
//         myComment: false,
//       },
//       {
//         User: {
//           nickname: "이멜론",
//         },
//         content: "오늘도 화이팅입니다!",
//         myComment: false,
//       },
//       {
//         User: {
//           nickname: "박수박",
//         },
//         content: "오늘도 화이팅입니다!",
//         myComment: false,
//       },
//     ],
//   });
//   /*
//   1. 댓글 작성 기능
//     : 각 input의 value를 받아오는 onChange함수가 필요함
//     : 댓글 작성 버튼 onClick시 post 데이터 앞에 추가되고 수정과 삭제 버튼 추가 생성
//   2. 댓글 수정 기능
//   3. 댓글 삭제 기능 ( 본인이 작성한 댓글만 삭제할 수 있습니다, myComment 활용 )
//   */

//   // 새로운 댓글 state 변경 함수
//   // const [nickname, setNickname] = useState("");
//   // const [content, setContent] = useState("");

//   // 하나의 객체로 합치기 > 일단 이거 풀고 해보자
//   const [newCo, setNewCo] = useState({
//     nickname: "",
//     content: "",
//   });

//   // setNicknameInputValue 으로 nicknameInputValue의 값을 작성자 input의 입력값으로 변경하는 함수
//   // const onChangeNicknameInput = (e) => {
//   //   setNickname(e.target.value);
//   // };
//   const onChangeNicknameInput = (e) => {
//     setNewCo({
//       ...newCo,
//       nickname: e.target.value,
//     });
//   };

//   // setContentInputValue 으로 contentInputValue의 값을 댓글 내용 input의 입력값으로 변경하는 함수
//   // const onChangeContentInput = (e) => {
//   //   setContent(e.target.value);
//   // };

//   const onChangeContentInput = (e) => {
//     setNewCo({
//       ...newCo,
//       content: e.target.value,
//     });
//   };

//   // 하나의 onChangeValue 함수와 name, value값을 이용해 같이 사용하고 싶다..! > 수정 보완? 일단 풀고 해보자 input의 onChgange 함수로 각 input값을 입력한 것을 name 속성에 저장,
//   // const onChangeValue = (e) => {
//   //   const { name, value } = e.target;
//   //   setPost((prevUser) => ({ ...prevUser, [name]: value }));
//   // };

//   // 댓글 작성 버튼 누르면 기존 post 객체에 새로운 Comment 객체값 추가
//   const onAddComment = () => {
//     // state가 각각 선언했을 때
//     // const newCom = {
//     //   User: {
//     //     nickname, // input 입력값
//     //   },
//     //   content, // input 입력값
//     //   myComment: true, // 자신이 쓴 댓글 조건 생성
//     // };

//     // state 하나의 객체로 합쳤을 때, 객체의 키값을 이용해 값 가져와야함
//     const newCom = {
//       User: {
//         nickname: newCo.nickname, // input 입력값
//       },
//       content: newCo.content, // input 입력값
//       myComment: true, // 자신이 쓴 댓글 조건 생성
//     };

//     // 기존 post 배열 spread 연산자로 복사(기존 값 훼손하지 않고 그대로 가져오기 위해)한 뒤 Comment 배열 또한 기존 Comment값을 복사하고 새로운 값을 앞에 추가
//     setPost((prevPost) => ({
//       ...prevPost,
//       Comments: [newCom, ...prevPost.Comments],
//     }));
//   };

//   // 수정함수, 인덱스와 수정한 댓글의 내용을 인자로 받는다
//   // find 사용하기 리팩터링
//   const onUpdateComment = (index, updateContent) => {
//     // 수정한 댓글 > 객체로 생성
//     console.log(post.Comments[index]);
//     const updateComment = {
//       ...post.Comments[index], // content 이외의 값은 그대로 복사
//       content: updateContent,
//     };

//     // 댓글 목록 깊은 복사
//     const updateComments = [...post.Comments];
//     // 수정한 댓글 객체로 댓글 목록 변경, index로 확인하여 변경
//     updateComments[index] = updateComment;
//     // console.log(updateComments);

//     // post 값 업데이트
//     setPost((prevPost) => ({
//       ...prevPost,
//       Comments: updateComments,
//     }));
//   };

//   // const onUpdateComment = (index, updateContent) => {
//   //   // 수정한 댓글 > 객체로 생성
//   //   const updateComment = {
//   //     ...post.Comments[index], // content 이외의 값은 그대로 복사
//   //     content: updateContent,
//   //   };

//   //   // 댓글 목록 깊은 복사
//   //   const copyComments = [...post.Comments];
//   //   // 수정한 댓글 객체로 댓글 목록 변경, index로 확인하여 변경
//   //   copyComments[index] = updateComment;

//   //   // const comm = copyComments.find((_, idx) => idx === index);
//   //   // comm.updateContent = updateContent;

//   //   // post 값 업데이트
//   //   setPost((prevPost) => ({
//   //     ...prevPost,
//   //     Comments: copyComments,
//   //   }));
//   // };

//   // myComment가 true인 것만 삭제할 수 있는 기능
//   const onDeleteComment = (index) => {
//     // console.log(post.Comments[index].myComment); // true, false값 확인 디버깅

//     // prevPost.Comments로 이전 상태를 그대로 가져와(복사) 기존 post 객체의 Comments 배열에서 index와 prevPost.Comments의 i(인덱스)가 같지 않은 것만 filter하여 보여주기, 즉 같은 인덱스이면 안 보이게해서 삭제된 것처럼 보여주기
//     if (post.Comments[index].myComment === true) {
//       setPost((prevPost) => ({
//         ...prevPost,
//         Comments: prevPost.Comments.filter((_, i) => i !== index),
//       }));
//     }
//   };

//   return (
//     <S.Wrapper>
//       <h1>문제2</h1>
//       <S.PostBox>
//         <S.PostTitle>제목: {post.title}</S.PostTitle>
//         <S.PostContent>내용: {post.content}</S.PostContent>
//       </S.PostBox>
//       <S.PostInfo>
//         <p>
//           작성자: <span>{post.User.nickname}</span>
//         </p>
//         <p>
//           작성자 나이: <span>{post.User.age}</span>
//         </p>
//         <p>
//           작성자 키: <span>{post.User.height}</span>
//         </p>
//       </S.PostInfo>
//       <div>
//         <p>
//           댓글 수: <span>{post.Comments.length}</span>
//         </p>
//         <input
//           placeholder="작성자"
//           name="User.nickname"
//           value={newCo.nickname} // state가 각각 있을 땐 nickname 으로
//           onChange={onChangeNicknameInput}
//         />
//         <input
//           placeholder="댓글 내용"
//           name="content"
//           value={newCo.content} // state가 각각 있을 땐 content 로
//           onChange={onChangeContentInput}
//         />
//         <button onClick={onAddComment}>댓글 작성</button>
//       </div>
//       <S.CommentList>
//         {/* list */}
//         {/* Q1. 댓글 목록을 컴포넌트로 가져오기, 컴포넌트에서 props로 속성을 전달하여 데이터를 map으로 순회하여 리턴하여 보여줌. */}
//         {post.Comments.map((item, index) => (
//           <Comment
//             key={index}
//             name={item.User.nickname}
//             content={item.content}
//             onUpdate={(updateContent) => onUpdateComment(index, updateContent)}
//             onDelete={() => onDeleteComment(index)}
//           />
//         ))}
//       </S.CommentList>
//     </S.Wrapper>
//   );
// }
// export default State2;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const PostBox = styled.div`
//   background-color: #999;
//   width: 360px;
//   padding: 10px;
// `;

// const PostTitle = styled.p`
//   font-size: 20px;
//   font-weight: bold;
// `;

// const PostContent = styled.p`
//   color: #fff;
// `;

// const PostInfo = styled.div`
//   width: 360px;
//   border: 3px solid #f00;
//   padding: 10px;
//   margin: 10px;

//   p {
//     display: flex;
//     justify-content: space-around;
//   }

//   span {
//     font-weight: bold;
//   }
// `;

// const CommentList = styled.ul`
//   width: 960px;
// `;

// const S = {
//   Wrapper,
//   PostBox,
//   PostTitle,
//   PostContent,
//   PostInfo,
//   CommentList,
// };
