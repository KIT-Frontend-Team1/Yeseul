## msw 테스트 예시

- 테스트 할 때 실제 API를 가로채서 무효화 후 msw로 테스팅

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

- 일단 임의의 데이터를 넣어줌

```javascript
export const handlers = [
  // Handles a POST /login request
  rest.post("/login", null),
  // Handles a GET /user request
  rest.get("/user", null),
];
```

### 4. browser.js (서비스 워커 생성)

- msw에서 제공하는 setupWorker() 함수를 사용하여 서비스 워커 생성

- handlers (요청 핸들러 코드) 를 불러와 인자로 넘겨준다

```javascript
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
```

### 5. worker 삽입

- 서비스 워커를 구동하는 코드를 삽입

```javascript
// index.js
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}
```

- npm start하여 console창에 [MSW] Mocking enabled. 가 확인하면 모킹이 활성화된 것이다 (이제 get, post 요청을 보낼 때 모킹 응답이 올 준비가 됐다)

### 6. 컴포넌트 만들어 API 데이터 가져오기

- API 가져오기 ➡️ https://jsonplaceholder.typicode.com/users

```javascript
import { useState } from "react";

const MockingTest = () => {
  const [data, setData] = useState("");
  const onHandleClick = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.log(`예상치 못한 에러 발생: ${err}`);
      });
  };
  return (
    <div>
      <button onClick={onHandleClick}>data 데이터 가져오기</button>
      {data && (
        <ul>
          {data.map((data) => (
            <p>
              {data.name} : {data.email}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MockingTest;
```

### 7. msw로 데이터 가져오기

- handle.js 수정

- GET 요청을 가로채서 ctx.json 에 작성한 값을 임의로 보여주는 과정

```javascript
import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://jsonplaceholder.typicode.com/users",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            name: "hanpy",
            username: "King",
            email: "hanpy@gmail.com",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
          {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
            email: "Shanna@melissa.tv",
            address: {
              street: "Victor Plains",
              suite: "Suite 879",
              city: "Wisokyburgh",
              zipcode: "90566-7771",
              geo: {
                lat: "-43.9509",
                lng: "-34.4618",
              },
            },
            phone: "010-692-6593 x09125",
            website: "anastasia.net",
            company: {
              name: "Deckow-Crist",
              catchPhrase: "Proactive didactic contingency",
              bs: "synergize scalable supply-chains",
            },
          },
        ])
      );
    }
  ),
];
```

-> 이렇게 함으로써 실제 API가 아닌 가짜 응답을 받아 애플리케이션을 테스트 할 수 있다.
