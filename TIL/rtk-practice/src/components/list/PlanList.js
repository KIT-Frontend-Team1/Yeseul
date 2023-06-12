import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../reducer/list";
import { useEffect } from "react";

const PlanList = () => {
  const planList = useSelector((state) => state.list.lists);
  const dispatch = useDispatch();

  // listMock 가져오기
  const getListMock = () => {
    dispatch(getList());
  };
  useEffect(() => {
    getListMock();
  }, []); // 첫 화면 렌더링

  return (
    <>
      {planList.map((list) => (
        <li>{list.content}</li>
      ))}
    </>
  );
};

export default PlanList;
