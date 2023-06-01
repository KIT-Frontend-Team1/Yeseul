## Mocking 이란?

- Mock(모의 데이터)를 만들어서 활용하는 방식

: 일반적으로 데이터를 fetch 해야하는 경우 통신을 통해 응답을 내려 줄 백엔드 서버가 있어야하는데 초기 개발 시 서버 구축이 되지 않아 데이터가 없는 단계에서 프론트엔드 개발자들은 목데이터로 테스팅을 하기 위해 API 모킹을 하는 과정을 거친다

이때 API를 moking 해주는 MSW 라이브러리를 사용한다. msw를 사용하면 mock 서버를 구축하지 않아도 API를 네트워크 수준에서 모킹할 수 있다. msw 의 service worker가 HTTP 요청을 가로챔으로써 가능하다.

여기서 service worker란 웹 애플리케이션의 메인 스레드와 분리된 별도의 백그라운드 스레드에서 실행시킬 수 있는 기술 중 하나이다.

msw에서 API를 모킹하는 것은 실제 백엔드 API 통신과 크게 다르지 않게 작성할 수 있으므로 나중에 목 API를 실제 API로 대체하는 것이 쉬워 프론트엔드 개발 생산성을 높일 수 있다.

참고 / https://uiop5809.tistory.com/234

---

MSW는 Mock Service Worker의 약자이며 API를 모킹할 때 사용하는 도구이다. 리소스 요청을 가로채서 수정할 수 있는 Service Worker의 기능을 사용하여 모킹할 수 있다. Storybook으로 시각적 테스트를 하며 개발할 때 API 모킹이 필요할 때가 있다. API의 다양한 응답에 따라 달라져야 하는 컴포넌트를 시각적으로 테스트할 때 MSW가 매우 유용하게 사용된다.

참고 / https://fe-developers.kakaoent.com/2022/220317-integrate-msw-storybook-jest/

### 1. msw 설치

```
npm install msw --save-dev
```

### 2. mocks 폴더 생성

```
mkdir src/mocks
```

### 3. handlers.js 생성

- mock API 구현 시 브라우저에서 받은 request를 가로챘을 때 임의의 응답을 해주는 핸들러 작성이 필요

- src/mocks/handlers

### 4. browser.js (서비스 워커 생성)

- src/mocks/browser

### 5. service worker 코드 생성

```
npx msw init public/ --save
```

- mockServiceWorker.js 생성

### 6. worker 삽입

- 서비스 워커를 구동하는 코드를 삽입

```javascript
// index.js
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}
```

### 7. API 요청을 위한 컴포넌트 작성

- Pokemon API 를 활용하여 캐릭터 이미지와 캐릭터명 가져오기

### 8. npm start
