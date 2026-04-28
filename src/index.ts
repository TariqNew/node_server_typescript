import http from "node:http";

const server = http.createServer((req, res) => {
  //Handling the route manually through if condition
  if (req.url === "/contacts" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify([
        {
          id: 1,
          book: "Hello Dr",
        },
        {
          id: 2,
          book: "Unanswered cries",
        },
        {
          id: 3,
          book: "Passed like a shadow",
        },
        {
          id: 4,
          book: "Three suitors, One husband",
        },
        {
          id: 5,
          book: "Mama Ntilie",
        },
      ]),
    );
  } else if (req.url?.startsWith("/contacts/") && req.method === "GET") {
    const id = req.url.split("/")[2];
    if (!id) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Please provide the value id</h1>");
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        id: id,
        book: `Hello ${id}`,
      }),
    );
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    return res.end("<h1>Page Not found!</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server running at port 3000");
});
