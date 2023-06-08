import styled from "styled-components";
import { spaceBetween } from "../../styles/common";

const AddList = () => {
  return (
    <S.AddWrapper>
      {/* <S.TitleLine></S.TitleLine> */}
      <S.AddContent>
        <input type="text" />
        <button>add</button>
      </S.AddContent>
    </S.AddWrapper>
  );
};

export default AddList;

const AddWrapper = styled.div`
  margin-top: 30px;
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

  input {
    width: 80%;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid rgb(182, 182, 182);
  }
`;

const S = {
  AddWrapper,
  AddContent,
  TitleLine,
};
