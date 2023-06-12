import styled from "styled-components";
import { spaceBetween } from "../../styles/common";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addList } from "../../reducer/list";

const AddList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onAddList = () => {
    const newTodo = {
      id: Math.floor(Math.random() * 100000),
      content: text,
      state: false,
    };
    dispatch(addList(newTodo));
    setText("");
  };

  const onChangeText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <S.AddWrapper>
      {/* <S.TitleLine></S.TitleLine> */}
      <S.AddContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="text" value={text} onChange={onChangeText} />
          <button type="submit" onClick={onAddList}>
            add
          </button>
        </form>
      </S.AddContent>
    </S.AddWrapper>
  );
};

export default AddList;

const AddWrapper = styled.div`
  margin-top: 20px;
`;

const TitleLine = styled.div`
  height: 1px;
  background-color: #ececec;
  margin-bottom: 20px;
`;

const AddContent = styled.div`
  width: 100%;
  ${spaceBetween}

  button {
    color: #fff;
    padding: 4px 8px;
    background-color: #1f883d;
    margin-left: 10px;
    border-radius: 4px;
  }

  form {
    width: 180%;
    display: flex;
    justify-content: space-between;
  }

  input {
    width: 80%;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid rgb(182, 182, 182);
    outline: none;
  }
`;

const S = {
  AddWrapper,
  AddContent,
  TitleLine,
};
