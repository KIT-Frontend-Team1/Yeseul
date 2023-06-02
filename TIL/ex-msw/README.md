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

- rest 방식으로 핸들러를 작성할 때, rest뒤에 HTTP 메서드를 붙인다.
  - ex) rest.post(), rest.get()
  - 첫 번째 인자로는 URL의 경로가 들어오고, 두 번째 인자로는 첫 번째 인자의 처리 로직이 들어온다

- 현재는 임의 코드를 집어넣었다

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

### 5. service worker 코드 생성

- 위 과정만 진행된다고 해서 msw 를 바로 사용할 수 있는 것이 아니다. 초기화 과정이 필요

- mockServiceWorker.js가 생성됨

```
npx msw init public/ --save
```

### 6. worker 삽입

- 서비스 워커를 구동하는 코드를 삽입

```javascript
// index.js
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}
```

- npm start하여 console창에 [MSW] Mocking enabled. 가 확인하면 모킹이 활성화된 것이다 (이제 get, post 요청을 보낼 때 모킹 응답이 올 준비가 됐다)

### 7. 컴포넌트 만들어 API 데이터 가져오기

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

### 8. msw로 데이터 가져오기

- handlers.js 수정

- GET 요청을 가로채서 ctx.json 에 작성한 값을 임의로 보여주는 과정

- rest.get 으로 https://jsonplaceholder.typicode.com/users URL 요청이 들어왔을 때 ctx.json()에  작성해준(내가 의도한 응답) 배열을 json 형태로 응답한다

- 여기서
  - req : 요청에 관한 역할을 처리하는 변수
  - res : 응답을 리턴할 때 쓰이는 함수
  - ctx : 응답 처리에 대한 내용을 나타내는 변수

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

이렇게 msw를 사용함으로써 실제 데이터가 아닌 API를 모킹하여 애플리케이션을 테스트 할 수 있다. 이는 백엔드 API가 완성되지 않았을 때 모킹을 통하여 애플리케이션을 시뮬레이션 및 테스트 하는데 용이하고, 나중에 실제 백엔드 API의 응답으로 대체할 때 URL만 수정해주면 되므로 코드의 수정이 간단하고 용이하여 개발을 더 빠르고 효율적으로 할 수 있다는 장점이 있다.
