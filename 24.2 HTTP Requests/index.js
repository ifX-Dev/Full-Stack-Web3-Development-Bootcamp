import express from "express";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
  res.send("<p>I'm just a chill boy tryna make ends meet.</p>");
});

app.get("/contact", (req, res) => {
  res.send("<p>Holla at me here.</p>");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}.`);
});
