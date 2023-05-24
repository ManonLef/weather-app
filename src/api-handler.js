let tempUnit = "c";

function setTempUnit(unit) {
  tempUnit = unit
}

async function getWeatherData(location) {
  const locationLink = `https://api.weatherapi.com/v1/forecast.json?key=51ca3ed754014c58aad194423231805&q=${location}&days=7&aqi=no&alerts=no`;
  const response = await fetch(locationLink, { mode: "cors" });
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

async function getCurrentWeather(location) {
  const data = await getWeatherData(location);
  const currentData = {
    date: data.current.last_updated,
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
  console.log(currentData);
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
  console.table(forecastWeek);
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

getCurrentWeather("Amsterdam");
getFutureWeather("Amsterdam");
console.log("hi");

async function getAllWeather(location) {
  const weather = [getCurrentWeather(location), getFutureWeather(location)];
  return weather;
}

export { getAllWeather, setTempUnit };
