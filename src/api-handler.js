let tempUnit = "c"

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
    location: data.location.name,
    weather: data.current.condition.text,
    temperature: (function temperature() {
      if (tempUnit === "c") {
        return `${data.current.temp_c}°C`;
      }
      return `${data.current.temp_f}°F`
    })()
    }
  console.log(currentData);
  return currentData;
}

getCurrentWeather("Amsterdam");
console.log("hi");


