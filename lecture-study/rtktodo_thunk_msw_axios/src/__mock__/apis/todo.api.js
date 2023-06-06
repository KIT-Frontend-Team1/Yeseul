import { todoMock } from "__mock__/datas/todo.data";
import { rest } from "msw";

// 1. rest 임포트
// 2. rest.get 에 백엔드에 요청할 링크(url) /api/todo
// 3. ctx.status(200) -> 성공했을 때
// 4. todoMock 가 json의 형태로 전달됨
// 5. context => 특정 객체에 접근하기 위한 핸들러
export const getTodo = rest.get("/api/todo", async (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(todoMock));
  // frontend request -> response todoMock
});

export const addTodo = rest.post("/api/todo", async (req, res, ctx) => {
  let title;
  let content;

  // 비동기로 가지고 오기 때문에 변수로 선언해준 것임
  // 클라이언트에게 title(data.title)과 content를 받아서 응답을 해줌
  await req.json().then((data) => {
    title = data.title;
    content = data.content;
  });

  return res(
    ctx.status(200),
    ctx.json({
      id: Math.floor(Math.random() * 1000000),
      title,
      content,
      status: false,
    })
    // client request(title, content) -> reponse newTodo(title, content)
  );
});

export const updateTodo = rest.patch(
  "/api/todo/:id/update",
  async (req, res, ctx) => {
    const { id } = req.params;
    let content;
    await req.json().then((data) => {
      content = data.content;
    });
    return res(
      ctx.status(200),
      ctx.json({
        id,
        content,
      })
    );
  }
);

export const checkTodo = rest.patch("/api/todo/:id", async (req, res, ctx) => {
  const { id } = req.params;
  let state;
  await req.json().then((data) => {
    state = data.state;
  });
  return res(
    ctx.status(200),
    ctx.json({
      id,
      state,
    })
  );
});

export const deletetodo = rest.delete("/api/todo/:id", (req, res, ctx) => {
  const { id } = req.params; // /api/todo/:id 여기 id 받아오는 방법임
  return res(
    ctx.status(200),
    ctx.json({
      id,
    })
  );
});

// api 등록 -> msw 생성(handler) -> msw 동작(App.js)
