import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "reducer";
import logger from "redux-logger";

// .env(환경 변수)
// 환경변수는 언제 사용해야할까?
// 시스템 환경을 변수에 담아서 사용, 경로 생략
// 특정 값을 변수에 담아 숨기기 위해 사용 ex)백엔드 url, 암호화 키(로그인 토큰, 세션 키...)
// dotenv, 기본값 -> node_modules에서 이미 설치 되어있음

/* 
  store -> rtk 전환 : 리덕스툴킷은 devTools를 지원하기 때문에 라이브러리 종속성이 줄었다!
  1. configureStore를 import 한다.
  2. 객체를 넣어줌
  3. 키 reducer : 값 rootReducer 을 넣어준다
  4. devTools는 boolean | DevToolsOptions 둘 중 하나가 들어가야하는데,
      개발 모드일 때만 활성화(true)로 설정한다.
  5. logger middleware로 기본 설정 defaultMiddleware
 */

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development", // 조건식을 활용해서 boolean
  middleware: (defaultMiddleware) => {
    if (process.env.NODE_ENV === "development") {
      return [...defaultMiddleware(), logger];
      // 6. ...defaultMiddleware()를 받지 않으면 기본 설치되어있는 미들웨어를 전부 무시하고 덮어 씌웁니다
      // 7. 현재 상태에서 defaultMiddleware가 없다면 logger만 적용, rtk에서 지원하는 기본 미들웨어를 전부 삭제
    }
    return defaultMiddleware(); // else
  },
});
