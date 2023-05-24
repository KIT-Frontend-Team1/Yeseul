import styled from "styled-components";

function ProductCard({ item, onNavigate }) {
  const won = item.productPrice;
  const number = won.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return (
    <S.Item onClick={onNavigate}>
      <h4>{item.productName}</h4>
      <p>상품번호: {item.productNumber}</p>
      <p>가격: {number}원</p>
      <p>사이즈: {item.productSize}</p>
      <p>평점: {item.productRating}</p>
      <p>리뷰: {item.productReview}</p>
    </S.Item>
  );
}
export default ProductCard;

const Item = styled.li`
  border: 1px solid #000;
  cursor: pointer;
  width: 300px;
  margin: 16px auto;
`;

const S = {
  Item,
};
