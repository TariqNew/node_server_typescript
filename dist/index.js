import http from "node:http";
import { handleRequest } from "./controller/controller.js";
const server = http.createServer(handleRequest);
server.listen(3000, () => {
    console.log("Server running at port 3000");
});
