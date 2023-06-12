import { rest } from "msw";
import { listMock } from "../datas/list.data";

// listMock 조회하기 (read)
export const getList = rest.get("/api/list", async (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(listMock));
});

// lists 배열에 값 추가하기(create)
export const addList = rest.post("/api/list", async (req, res, ctx) => {
  let content;
  await req.json().then((data) => {
    content = data.content;
  });

  return res(
    ctx.status(200),
    ctx.json({
      id: Math.floor(Math.random() * 100000),
      content,
      state: false,
    })
  );
});
