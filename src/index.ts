import http from "node:http";

const server = http.createServer((req, res)=> {
    // res.writeHead(200, "text/plain")

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello, I'm working");
})

server.listen(3000, ()=>{
    console.log("Server running at port 3000");
})