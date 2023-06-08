import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const box = css`
  margin-bottom: 80px;
  background-color: #fff;
  border-radius: 12px;
  height: auto;
  padding: 40px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;

  :hover {
    transform: translateY(-5px);
  }
`;

export const spaceBetween = css`
  display: flex;
  justify-content: space-between;
`;
