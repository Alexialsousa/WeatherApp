const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("", (req, res) => {
  res.send("Weather App");
});

app.get("/weather", (req, res) => {
  res.send("This is weather endpoint");
});

app.get("*", (req, res) => {
  res.send("Page Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
