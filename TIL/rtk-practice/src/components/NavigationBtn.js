import { useNavigate } from "react-router-dom";

const NavigationBtn = ({ isFirstPage, isLastPage, to }) => {
  const navigate = useNavigate();

  const onPrevPage = () => {
    navigate(-1);
  };

  const onNextPage = () => {
    navigate(to);
  };

  return (
    <div>
      {!isFirstPage && <button onClick={onPrevPage}>prev</button>}
      {!isLastPage && <button onClick={onNextPage}>next</button>}
    </div>
  );
};

export default NavigationBtn;
