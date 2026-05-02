import { ServerResponse } from "node:http";
export function sendJson(res, status, payload) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(payload));
}
export function sendError(res, status, message) {
    return sendJson(res, status, { error: message });
}
