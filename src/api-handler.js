let tempUnit = "c";

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
  const futureData = (data.forecast.forecastday).forEach(day => console.log(day));
  console.log(futureData)
}

getCurrentWeather("Amsterdam");
getFutureWeather("Amsterdam")
console.log("hi");
