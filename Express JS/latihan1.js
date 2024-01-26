import express from "express";
import books from "./books";

const app = express();
const port = 3000;

//routes / URL / utama kita method GET

app.get("/books", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(books));
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (book) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(book));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Book not found" }));
  }
});

app.get("/search", (req, res) => {
  if (req.query.title) {
    const title = req.query.title.toLowerCase();
    const searchedBooks = books.filter((b) =>
      b.title.toLowerCase().includes(title)
    );
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(searchedBooks));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "No search criteria provided" }));
  }
});

app.use((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(405);
  res.end(JSON.stringify({ error: "Method Not Allowed" }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
