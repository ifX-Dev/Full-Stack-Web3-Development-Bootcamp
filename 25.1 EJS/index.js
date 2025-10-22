import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  const dayIndex = today.getDay();

  let type = "a weekday";
  let adv = "It's time to work hard";

  if (dayIndex === 0 || dayIndex === 6) {
    type = "the weekend";
    adv = "It's time to have some fun";
  }

  res.render("index.ejs", {
    dayType: type,
    advice: adv,
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

//
//
//
// console.log(dayIndex);
//
