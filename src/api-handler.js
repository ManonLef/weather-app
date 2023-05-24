let tempUnit = "c";
let location = "amsterdam"

function setLocation(loc) {
  return location = loc
}

function setTempUnit(unit) {
  return tempUnit = unit
}

async function getWeatherData(location) {
  const locationLink = `https://api.weatherapi.com/v1/forecast.json?key=51ca3ed754014c58aad194423231805&q=${location}&days=7&aqi=no&alerts=no`;
  const response = await fetch(locationLink, { mode: "cors" });
  const weatherData = await response.json();
  console.log(weatherData)
  return weatherData;
}

async function getCurrentWeather(location) {
  const data = await getWeatherData(location);
  const currentData = {
    icon: data.current.condition.icon,
    last_update: data.current.last_updated,
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

async function getFutureWeather(location) {
  const data = await getWeatherData(location);
  const forecastWeek = [];
  data.forecast.forecastday.forEach((futureDate) => {
    const forecastDay = {
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
  return forecastWeek
}

// date helpers
function getWeekDay(date) {
  const weekDay = date.toLocaleString("en-us", {
    weekday: "long",
  });
  return weekDay;
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
  const weather = [await getCurrentWeather(location), await getFutureWeather(location)];
  // console helpers
    console.table(weather[0])
    console.table(weather[1])
  return weather;
}

getAllWeather("ams")

export { getAllWeather, setTempUnit, setLocation };
