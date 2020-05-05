var fetchWeather = "/weather"; // api call

const weatherForm = document.querySelector("form"); // will also submit on enter
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dateElement.textContent =
  monthNames[new Date().getMonth()].substring(0, 3) +
  " " +
  new Date().getDate();

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  locationElement.textContent = "Loading...";
  tempElement.textContent = "";
  weatherCondition.textContent = "";
  const locationAPI = fetchWeather + "?address=" + search.value;
  fetch(locationAPI).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      } else {
        console.log(data.sunset * 1000);
        console.log(Date.now());
        if (
          data.description.includes("rain") ||
          data.description.includes("drizzle")
        ) {
          weatherIcon.className = "wi wi-day-rain";
        }
        if (data.description.includes("fog")) {
          weatherIcon.className = "wi wi-day-fog";
        }
        if (
          data.description.includes("snow") ||
          data.description.includes("sleet")
        ) {
          weatherIcon.className = "wi wi-day-snow";
        }
        if (data.description.includes("clear")) {
          if (Date.now() > data.sunset * 1000) {
            weatherIcon.className = "wi wi-night-clear";
          } else {
            weatherIcon.className = "wi wi-day-sunny";
          }
        } else {
          weatherIcon.className = "wi wi-day-cloudy";
        }
        locationElement.textContent = data.cityName;
        tempElement.textContent =
          (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
        weatherCondition.textContent = data.description;
      }
    });
  });
});
