import { setupWorker } from "msw";
import * as TodoApi from "./apis/todo.api";

const handler = [...Object.values(TodoApi)];
// export한 함수들이 객체 형태로 * = TodoApi 담겨 전달. 해당 객체의 객체의 키의 밸류인 함수들을 배열로 생성
//TodoApi의 values들 > getTodo, addTodo, deleteTodo를 한번에 등록

export const worker = setupWorker(...handler);
// 모킹 워커 생성 후 핸들러 등록
