import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    htmlContent: "<p>Enter your name below👇</p>",
  });
});

app.post("/submit", (req, res) => {
  const { fName, lName } = req.body;

  let nameLength = fName.length + lName.length;

  res.render("index.ejs", {
    htmlContent: `There are ${nameLength} numbers in your name`,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
