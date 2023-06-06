import NavigationBtn from "../NavigationBtn";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addCount, minusCount } from "../../reducer/cart";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddCount = () => {
    dispatch(addCount(cart[0].id));
  };

  const handleMinusCount = () => {
    dispatch(minusCount(cart[0].id));
  };
  return (
    <S.Wrapper>
      <S.CartBox>
        <h1>Your Shopping Cart</h1>
        <S.TitleLine></S.TitleLine>
        <ul>
          <li style={{ fontSize: "18px" }}>
            <span>{cart[0].name}</span>
            <span>{cart[0].price.toFixed(2)}$</span>
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>x{cart[0].count}</span>
            <div>
              <button onClick={handleAddCount}>+</button>
              <button onClick={handleMinusCount}>-</button>
            </div>
          </li>
        </ul>
      </S.CartBox>
      <NavigationBtn isFirstPage to={"/todo"} />
    </S.Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CartBox = styled.div`
  margin-bottom: 80px;
  background-color: #fff;
  border-radius: 12px;
  width: 320px;
  height: auto;
  padding: 40px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;

  :hover {
    transform: translateY(-5px);
  }

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #1f883d;
  }

  li {
    display: flex;
    justify-content: space-between;
  }

  li:first-of-type {
    margin-bottom: 30px;
  }

  button {
    color: #fff;
    padding: 4px 8px;
    background-color: #1f883d;
    margin-left: 10px;
    border-radius: 4px;
  }
`;

const TitleLine = styled.div`
  height: 1px;
  background-color: #ececec;
  margin-bottom: 20px;
`;

const S = {
  Wrapper,
  CartBox,
  TitleLine,
};
