/* eslint no-use-before-define: ["error", { "functions": false }] */
let tempUnit = "c";
let location = "auto:ip";

function setLocation(loc) {
  location = loc;
  return location;
}

function setTempUnit(unit) {
  tempUnit = unit;
  return tempUnit;
}

async function getWeatherData(loc) {
    const locationLink = `https://api.weatherapi.com/v1/forecast.json?key=51ca3ed754014c58aad194423231805&q=${loc}&days=7&aqi=no&alerts=no`;
    const response = await fetch(locationLink, { mode: "cors" });
    const weatherData = await response.json();
    return weatherData;
}

async function getCurrentWeather(loc) {
  const data = await getWeatherData(loc);
  const currentData = {
    icon: data.current.condition.icon,
    last_update: data.current.last_updated,
    last_update_time: getLocalTime(createDate(data.current.last_updated)),
    day: getWeekDay(createDate(data.current.last_updated)),
    date: getLocalDate(data.current.last_updated),
    location: data.location.name,
    country: data.location.country,
    weather: data.current.condition.text,
    temperature: (function temperature() {
      if (tempUnit === "c") {
        return `${data.current.temp_c}°C`;
      }
      return `${data.current.temp_f}°F`;
    })(),
  };
  return currentData;
}

async function getFutureWeather(loc) {
  const data = await getWeatherData(loc);
  const forecastWeek = [];
  data.forecast.forecastday.forEach((futureDate) => {
    const forecastDay = {
      location: `${data.location.name}`,
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

// date helpers
function getWeekDay(date) {
  const weekDay = date.toLocaleString("en-us", {
    weekday: "long",
  });
  return weekDay;
}

function getLocalTime(date) {
  const time = date.toLocaleTimeString([], { 
    hour: "2-digit", minute: "2-digit" 
  });
  return     time
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

// combined functions to get all weather to be displayed
async function getAllWeather() {
  const weather = [
    await getCurrentWeather(location),
    await getFutureWeather(location),
  ];
  // console helpers
  return weather;
}

export { getAllWeather, setTempUnit, setLocation };
