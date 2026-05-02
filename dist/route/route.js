import { IncomingMessage } from "node:http";
export function bookRoute(req) {
    if (req.method === "GET" && req.url === "/books") {
        return { type: "list" };
    }
    if (req.method === "GET" && req.url?.startsWith("/books/")) {
        const idValue = req.url.split("/")[2];
        const id = Number(idValue);
        if (!Number.isInteger(id) || id < 1) {
            return { type: "badRequest" };
        }
        return { type: "detail", id };
    }
    if (req.method === "POST" && req.url === "/books") {
        return { type: "create" };
    }
    return { type: "notFound" };
}
