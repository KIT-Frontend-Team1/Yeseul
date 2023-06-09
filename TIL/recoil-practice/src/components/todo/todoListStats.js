import { useRecoilValue } from "recoil";
import { todoListStateState } from "../../recoil/todo/selectors";

// 완료 여부에 따른 개수와 퍼센트 필터링하여 보여주기
const TodoListStats = () => {
  const { totalNum, totalCompletedNum, totalUnCompletedNum, percentCompleted } =
    useRecoilValue(todoListStateState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUnCompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
};

export default TodoListStats;
