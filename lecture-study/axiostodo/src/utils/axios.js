import axios from "axios";

/*
1. axios 인스턴스 생성
2. create메소드 안의 객체 생성
3. baseURL 설정 -> .env에 숨겨야함 (REACT_APP 적어주기 필수!)
  -> REACT_APP_BACKEND_URL = http://localhost:9000
4. baseURL에 REACT_APP_BACKEND_URL 로 작성하기
5. Bearer -> jwt 토큰임을 알려주는 것 (json web token)
6. Authorization 로컬스토리지의 해당 key값으로 accessToken 조회
7. withCredentials: true -> 서버 간의 통신에서 쿠키를 서로 교환 가능하도록 하는 옵션
*/
// Axios or axiosInstance or axiosWithToken 등의 변수명으로 많이 쓰임
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  withCredentials: true,
});
