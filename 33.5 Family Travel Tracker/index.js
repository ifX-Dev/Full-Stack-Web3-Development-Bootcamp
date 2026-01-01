import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "12345",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  // { id: 1, name: "Angela", color: "teal", countries: [] },
  // { id: 2, name: "Jack", color: "powderblue", countries: [] },
];

async function usersData() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users;
}

async function checkVisisted(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [userId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const users = await usersData();
  const countries = await checkVisisted(currentUserId);
  console.log(countries);
  console.log(users);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[currentUserId - 1].color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body.country;
  console.log(input);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.user) {
    currentUserId = req.body.user;
    console.log(req.body);
    const users = await usersData();
    const countries = await checkVisisted(parseInt(currentUserId));
    console.log(countries);

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: users[currentUserId - 1].color,
    });
  } else {
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const { name, color } = req.body;
  try {
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [
      name,
      color,
    ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
