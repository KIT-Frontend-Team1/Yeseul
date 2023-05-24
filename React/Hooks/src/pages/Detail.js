import { useNavigate, useParams } from "react-router-dom";
import productList from "../__mock__/products.json";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

function DetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.productNumber);
  // console.log(productList);
  // console.log(productList.products);

  const productArr = productList.products;
  const [productDetails, setProductDetail] = useState();

  // const [productDetail, setProductDetail] = useState(
  //   productArr.filter(
  //     (product) => product.productNumber === params.productNumber
  //   )[0]
  // );

  /*
  useEffect를 활용하여 products 데이터에서
  올바른 데이터를 찾아내어 해당 데이터만 따로 state로 관리합니다

  params.productNumber === productArr[i].productNumber 조건 필터링해서 보여주기
  */

  useEffect(() => {
    const findProductDetail = productArr.find(
      (product) => product.productNumber === params.productNumber
    );
    setProductDetail(findProductDetail);

    // 단, 없는 번호 상품으로 접근 시 state페이지로 돌아가도록 구현해주세요
    if (!findProductDetail) {
      navigate("/state");
    }
  }, [params.productNumber, productArr, navigate]);

  return (
    productDetails && (
      <div>
        {/* 
      상세 페이지는 자유롭게 꾸미시면 됩니다.
      아직 해당 부분의 진도가 나가지 않았기 때문에 주소의 파람을 가지고 올 수 있는 방법은
      미리 콘솔에 찍어두었습니다.
    */}
        {/* {params.productNumber} */}
        <S.Item>
          <h3>
            Product Info <S.Span>제품정보</S.Span>
          </h3>
          {/* <h4>{productDetails.productDetail}</h4> */}
          <h5>{productDetails.productName}</h5>
          <p>상품번호: {productDetails.productNumber}</p>
          <p>가격: {productDetails.productPrice}원</p>
          <p>사이즈: {productDetails.productSize}</p>
          <p>평점: {productDetails.productRating}</p>
          <p>리뷰: {productDetails.productReview}</p>
        </S.Item>
        <S.Review>
          <h3>
            Review <S.Span>리뷰</S.Span>
          </h3>
          {productDetails.Review.map((item) => (
            <S.ReviewList>
              <p>작성자: {item.reviewer}</p>
              <p>내용: {item.review}</p>
              <p>좋아요: {item.rating}</p>
            </S.ReviewList>
          ))}
        </S.Review>
      </div>
    )
  );
}
export default DetailPage;

const Item = styled.li`
  list-style: none;
  border: 1px solid #000;
  cursor: pointer;
  width: 300px;
  margin: 16px auto;
`;

const Span = styled.span`
  color: #777;
  font-size: 14px;
`;

const Review = styled.ul`
  border: 1px solid #000;
  width: 300px;
  margin: 16px auto;
`;

const ReviewList = styled.li`
  border-bottom: 1px solid #000;
  width: 280px;
  margin: 16px auto;
`;

const S = {
  Item,
  Span,
  Review,
  ReviewList,
};
