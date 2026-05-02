import { IncomingMessage, ServerResponse } from "node:http";
import { bookRoute } from "../route/route.js";
import { books } from "../model/model.js";
import { sendError, sendJson } from "../handler/handler.js";
export function handleRequest(req, res) {
    const route = bookRoute(req);
    switch (route.type) {
        case "list":
            return GetAllBooks(res);
        case "detail":
            return GetBookById(res, route.id);
        case "create":
            return handleCreateBook(req, res);
        case "notFound":
            return sendError(res, 404, "Route not found");
        case "badRequest":
            return sendError(res, 400, "Bad Request");
        default:
            return sendError(res, 400, "Invalid request");
    }
}
export function GetAllBooks(res) {
    return sendJson(res, 200, books);
}
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                if (!body) {
                    return resolve({});
                }
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
        req.on("error", reject);
    });
}
export async function handleCreateBook(req, res) {
    try {
        const body = await parseJsonBody(req);
        if (typeof body !== "object" || body === null) {
            return sendError(res, 400, "Request body must be a JSON object");
        }
        const bookData = body;
        if (typeof bookData.name !== "string" ||
            typeof bookData.author !== "string" ||
            typeof bookData.publisher !== "string" ||
            typeof bookData.year !== "number" ||
            typeof bookData.pages !== "number" ||
            typeof bookData.genre !== "string" ||
            typeof bookData.available !== "boolean") {
            return sendError(res, 400, "Missing or invalid book data");
        }
        const newBook = {
            id: books.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1,
            name: bookData.name,
            author: bookData.author,
            publisher: bookData.publisher,
            year: bookData.year,
            pages: bookData.pages,
            genre: bookData.genre,
            available: bookData.available,
        };
        books.push(newBook);
        return sendJson(res, 201, newBook);
    }
    catch (error) {
        return sendError(res, 400, "Invalid JSON body");
    }
}
export function GetBookById(res, id) {
    const book = books.find((item) => item.id === id);
    if (!book) {
        return sendError(res, 404, `Book with id ${id} not found`);
    }
    return sendJson(res, 200, book);
}
