import { useState } from "react";
import styled from "styled-components";

function Comment({ name, content, onUpdate, onDelete }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateContent, setUpdateContent] = useState(content);

  // onUpdate함수 인자로 변경된 값을 넘겨주고, isUpdate를 false로 만들어 기존 UI 보여주기
  const handleUpdate = () => {
    onUpdate(updateContent);
    setIsUpdate(false);
  };
  /*
    수정버튼 클릭시 isUpdate가 true 조건으로 바뀌어 input과 저장버튼 UI가 보여짐
    저장 버튼 클릭시 handleUpdate 함수가 실행되어 isUpdate값을 false로 바꾸어 기존 수정, 삭제 UI가 다시 보여짐
  */
  return (
    <S.CommentItem>
      <p>
        작성자: <span>{name}</span>
      </p>
      {isUpdate ? (
        <>
          <input
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
          />
          <button onClick={handleUpdate}>저장</button>
        </>
      ) : (
        <>
          <p>
            댓글 내용: <span>{content}</span>
          </p>
          <button onClick={() => setIsUpdate(true)}>수정</button>
          <button onClick={onDelete}>삭제</button>
        </>
      )}
    </S.CommentItem>
  );
}
export default Comment;

const CommentItem = styled.li`
  border: 1px solid #000;
  margin: 10px;
`;

const S = {
  CommentItem,
};
