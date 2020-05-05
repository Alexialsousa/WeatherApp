const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const data = require("../utils/data");

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath)); //app now uses public folder for styling

app.get("", (req, res) => {
  res.render("index", {
    title: "Daily Weather",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address; //address is the city name

  if (!address) {
    return res.send({
      error: "You must enter a city name in the search box",
    });
  }

  data(
    address,
    (error, { temperature, description, cityName, sunset } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        temperature,
        description,
        cityName,
        sunset,
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
