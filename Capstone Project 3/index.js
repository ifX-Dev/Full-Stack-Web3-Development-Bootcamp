import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import nodeGeocoder from "node-geocoder";

const app = express();
const port = 3000;

const options = {
  provider: "openstreetmap",
};
const geocoder = nodeGeocoder(options);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  let location;
  try {
    location = await geocoder.geocode(`Lagos, Nigeria`);

    console.log(`${location[0].latitude}, ${location[0].longitude}`);
  } catch (error) {}
  try {
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${location[0].latitude}&longitude=${location[0].longitude}&daily=temperature_2m_mean`
    );
    console.log(weather.data);
  } catch {}
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
