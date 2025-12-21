import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Thomas12345_@#",
  port: 5432,
});

db.connect();

let visitedCountries = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  console.log(result.rows);
  let visitedCountries = [];
  result.rows.forEach((row) => {
    visitedCountries.push(row.country_code);
  });
  console.log(visitedCountries);
  res.render("index.ejs", {
    countries: visitedCountries,
    total: visitedCountries.length,
  });
});

app.post("/add", async (req, res) => {
  const country = req.body.country;
  const result = await db.query(
    `SELECT country_code FROM countries WHERE country_name = $1`,
    [country]
  );
  const countryCode = result.rows[0].country_code;
  await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
    countryCode,
  ]);
  res.redirect("/");

  console.log(`Added country: ${countryCode}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
