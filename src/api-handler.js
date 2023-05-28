/* eslint no-use-before-define: ["error", { "functions": false }] */
let tempUnit = "c";
let location = "auto:ip";
let previousLocation = "auto:ip";

// API weather call
async function getWeatherData(loc) {
  const locationLink = `https://api.weatherapi.com/v1/forecast.json?key=51ca3ed754014c58aad194423231805&q=${loc}&days=7&aqi=no&alerts=no`;
  const response = await fetch(locationLink, { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
}

// filter data used for current weather
function getCurrentWeather(weatherData) {
  const currentData = {
    icon: weatherData.current.condition.icon,
    last_update: weatherData.current.last_updated,
    last_update_time: getLocalTime(
      createDate(weatherData.current.last_updated)
    ),
    day: getWeekDay(createDate(weatherData.current.last_updated)),
    date: getLocalDate(weatherData.current.last_updated),
    location: weatherData.location.name,
    country: weatherData.location.country,
    weather: weatherData.current.condition.text,
    temperature: (function temperature() {
      if (tempUnit === "c") {
        return `${weatherData.current.temp_c}°C`;
      }
      return `${weatherData.current.temp_f}°F`;
    })(),
  };
  return currentData;
}

// filter data used for forecast
function getFutureWeather(weatherData) {
  const forecastWeek = [];
  weatherData.forecast.forecastday.forEach((futureDate) => {
    const forecastDay = {
      location: `${weatherData.location.name}`,
      icon: futureDate.day.condition.icon,
      day: getWeekDay(createDate(futureDate.date)),
      date: getLocalDate(futureDate.date),
      weather: futureDate.day.condition.text,
      maxtemp: (function temperature() {
        if (tempUnit === "c") {
          return `${futureDate.day.maxtemp_c}°C`;
        }
        return `${futureDate.day.maxtemp_f}°F`;
      })(),
      mintemp: (function temperature() {
        if (tempUnit === "c") {
          return `${futureDate.day.mintemp_c}°C`;
        }
        return `${futureDate.day.mintemp_f}°F`;
      })(),
    };
    forecastWeek.push(forecastDay);
  });
  return forecastWeek;
}

// combined functions to get all weather to be stored in an array
async function getAllWeather() {
  const data = await getWeatherData(location);
  const weather = [getCurrentWeather(data), getFutureWeather(data)];
  return weather;
}

// date helpers
function getWeekDay(date) {
  const weekDay = date.toLocaleString("en-us", {
    weekday: "long",
  });
  return weekDay;
}

function getLocalTime(date) {
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
}

function createDate(date) {
  const formattedDate = new Date(date);
  return formattedDate;
}

function getLocalDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localDate = createDate(date).toLocaleDateString(undefined, options);
  return localDate;
}

// getters and setters
function setLocation(loc) {
  location = loc;
  return location;
}

function getLocation() {
  return location;
}

function setPreviousLocation() {
  previousLocation = getLocation();
  return previousLocation;
}

function getPreviousLocation() {
  return previousLocation;
}

function setTempUnit(unit) {
  tempUnit = unit;
  return tempUnit;
}

export {
  getAllWeather,
  setTempUnit,
  setLocation,
  getPreviousLocation,
  setPreviousLocation,
  getLocation,
};
