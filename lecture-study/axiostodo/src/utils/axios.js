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
// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//   },
//   withCredentials: true,
// });

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

/*
axios interceptor로 accessToken의 관심사 분리

  1. 기존 코드는 axiosInstance 를 생성할 때 헤더에 Authorization을 생성하는 로직이 포함되어있어 이를 인터셉터로 분리함으로써 코드의 가독성과 유지보수성을 높일 수 있다.

  2. 기존 코드는 토큰을 axios instance에 직접 설정하고 있어 토큰 변경 시 최신 토큰을 반영하지 못하는 문제를 일으킬 수 있어 인터셉터를 사용하여 매 요청마다 최신 토큰을 가져오는 로직으로 관심사 분리를 하여 활용할 수 있다. 
*/
