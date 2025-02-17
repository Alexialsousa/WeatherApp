const request = require("request");
const constants = require("../config");

const data = (address, callback) => {
  const url =
    constants.openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&appid=" +
    constants.openWeatherMap.SECRET_KEY;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cant fetch data from open weather map ", undefined);
    } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
      callback("Unable to find required data", undefined);
    } else {
      callback(undefined, {
        temperature: body.main.temp,
        description: body.weather[0].description,
        cityName: body.name,
        sunset: body.sys.sunset,
      });
    }
  });
};

module.exports = data;
