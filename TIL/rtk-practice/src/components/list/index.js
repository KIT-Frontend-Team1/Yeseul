import styled from "styled-components";
import NavigationBtn from "../NavigationBtn";
import { box, flexCenter } from "../../styles/common";
import PlanList from "./PlanList";
import AddList from "./AddList";

const List = () => {
  return (
    <S.Wrapper>
      <S.ListBox>
        <h1>Study Planner 📝</h1>
        <S.TitleLine></S.TitleLine>
        <PlanList />
        <AddList />
      </S.ListBox>
      <NavigationBtn isLastPage />
    </S.Wrapper>
  );
};

export default List;

const Wrapper = styled.div`
  height: 100vh;
  ${flexCenter}
`;

const ListBox = styled.div`
  width: 400px;
  ${box}

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #1f883d;
  }
`;

const TitleLine = styled.div`
  height: 1px;
  background-color: #ececec;
  margin-bottom: 20px;
`;

const S = {
  Wrapper,
  ListBox,
  TitleLine,
};
