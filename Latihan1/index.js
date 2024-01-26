const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "aplication/json" });
    return res.end(JSON.stringify({ message: "Hello World" }));
  }
  if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "aplication/json" });
    return res.end(JSON.stringify({ message: "About Page !" }));
  }
  res.writeHead(404, { "Content-Type": "aplication/json" });
  res.end(JSON.stringify({ error: "Page Not Found !" }));
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
