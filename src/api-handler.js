async function getCurrentWeather(location) {
  const locationLink = `https://api.weatherapi.com/v1/current.json?key=51ca3ed754014c58aad194423231805&q=${location}&aqi=no`;
  const response = await fetch(locationLink, { mode: "cors" });
  const currentWeather = await response.json();
  return currentWeather
}

async function getCurrentTemperature(location) {
  const data = await (getCurrentWeather(location))
  // const currentTemperature = data.
  console.log(`temp in C: ${data.current.temp_c}`);
} 

getCurrentTemperature("Amsterdam");
console.log("hi");
