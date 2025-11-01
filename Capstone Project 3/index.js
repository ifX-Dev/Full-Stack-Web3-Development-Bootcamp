import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import nodeGeocoder from "node-geocoder";

const app = express();
const port = 3000;

const now = new Date();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayName = days[now.getDay()];

const hours = now.getHours().toString().padStart(2, "0");
const minutes = now.getMinutes().toString().padStart(2, "0");

const formatted = `${hours}:${minutes}`;

const options = {
  provider: "openstreetmap",
};
const geocoder = nodeGeocoder(options);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/search", async (req, res) => {
  let location;

  const { country, state } = req.body;
  try {
    location = await geocoder.geocode(`${state}, ${country}`);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
  try {
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${location[0].latitude}&longitude=${location[0].longitude}&daily=temperature_2m_mean&daily=temperature_2m_min&daily=temperature_2m_max&daily=precipitation_sum&daily=wind_speed_10m_max&hourly=relative_humidity_2m&hourly=surface_pressure`
    );
    const result = weather.data;

    res.render("index.ejs", {
      temperature: weather.data.daily.temperature_2m_mean[0],
      temperatureHigh: weather.data.daily.temperature_2m_max[0],
      temperatureLow: weather.data.daily.temperature_2m_min[0],
      precipitation: weather.data.daily.precipitation_sum[0],
      windSpeed: weather.data.daily.wind_speed_10m_max[0],
      relativeHumidity: weather.data.hourly.relative_humidity_2m[0],
      surfacePressure: weather.data.hourly.surface_pressure[0],
      day: dayName,
      time: formatted,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);

    res.render("index.ejs", {
      error: "Invalid entry, check your spelling and try again",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
