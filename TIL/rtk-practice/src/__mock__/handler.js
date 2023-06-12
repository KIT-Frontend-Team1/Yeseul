import { setupWorker } from "msw";
import * as ListApi from "./apis/list.api";

const handler = [...Object.values(ListApi)];

export const worker = setupWorker(...handler);
