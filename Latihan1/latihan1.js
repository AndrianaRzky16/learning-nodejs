const http = require("http");
const url = require("url");

const books = [
  {
    id: 1,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publication_year: 1951,
    genre: "Fiction",
    isbn: "978-0-316-76948-0",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publication_year: 1960,
    genre: "Fiction",
    isbn: "978-0-06-112008-4",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    publication_year: 1949,
    genre: "Dystopian",
    isbn: "978-0-452-28423-4",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publication_year: 1925,
    genre: "Fiction",
    isbn: "978-0-7432-7356-5",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publication_year: 1813,
    genre: "Romance",
    isbn: "978-0-19-953556-9",
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    publication_year: 1997,
    genre: "Fantasy",
    isbn: "978-0-590-35340-3",
  },
  {
    id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publication_year: 1937,
    genre: "Fantasy",
    isbn: "978-0-261-10295-3",
  },
  {
    id: 8,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    publication_year: 2008,
    genre: "Science Fiction",
    isbn: "978-0-439-02352-8",
  },
  {
    id: 9,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    publication_year: 2003,
    genre: "Mystery",
    isbn: "978-0-385-50420-5",
  },
  {
    id: 10,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    publication_year: 1954,
    genre: "Fantasy",
    isbn: "978-0-618-34625-6",
  },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.url === "/books") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(books));
  }

  if (req.url.startsWith("/books/")) {
    const id = parseInt(req.url.split("/")[2]);
    const book = books.find((b) => b.id === id);

    if (book) {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(book));
      }
    }
  }

  if (parsedUrl.pathname === "/search" && parsedUrl.query.title) {
    const title = parsedUrl.query.title.toLowerCase();
    const searchedBooks = books.filter((b) =>
      b.title.toLowerCase().includes(title)
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(searchedBooks));
  }

  res.writeHead(405, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ error: "Method Not Allowed" }));
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
