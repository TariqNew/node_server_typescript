import { ServerResponse } from "node:http";

export function sendJson(
  res: ServerResponse,
  status: number,
  payload: unknown,
) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export function sendError(
  res: ServerResponse,
  status: number,
  message: string,
) {
  return sendJson(res, status, { error: message });
}
