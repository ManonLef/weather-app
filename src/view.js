/* eslint no-use-before-define: ["error", { "functions": false }] */

// querySelectors
const toggle = document.querySelector("#temp-toggle");
const currentWeather = document.querySelector(".current-container")
const inputLocation = document.querySelector("#location-input");
const submitLocation = document.querySelector("button");
const errorDiv = document.querySelector(".error");
const forecastWeatherHeader = document.querySelector(".forecast-header");
const forecastWeather = document.querySelector(".forecast-days");


// populates the current weather container
async function renderCurrent(wx) {
  const locationWeather = await wx;
  const current = locationWeather[0];

  clearCurrent();

  const currentHeader = document.createElement("div");
  currentHeader.className = "current-header";
  currentHeader.textContent = `Current Weather for ${current.location}, ${current.country}`;

  const icon = new Image();
  icon.src = `${current.icon}`;

  const date = document.createElement("div");
  date.className = "updated";
  date.textContent = `Updated: ${current.day} ${current.date} ${current.last_update_time}`;
  const weather = document.createElement("div");
  weather.textContent = `${current.weather}`;
  const temp = document.createElement("div");
  temp.textContent = `${current.temperature}`;

  const elementsToRender = [icon, currentHeader, weather, temp, date];
  elementsToRender.forEach((element) => currentWeather.append(element));
}

// populates the forecast days container
async function renderFuture(wx) {
  const locationWeather = await wx;
  const forecast = locationWeather[1];
  const current = locationWeather[0];

  clearForecast();

  forecastWeatherHeader.textContent = `Forecast for ${current.location}`;

  forecast.forEach((item) => {
    const forecastCard = document.createElement("div");
    forecastCard.className = "forecast-card";

    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-div";
    const icon = new Image();
    icon.src = `${item.icon}`;
    iconContainer.append(icon);

    const day = document.createElement("div");
    day.textContent = `${item.day}`;
    const date = document.createElement("div");
    date.textContent = `${item.date}`;
    const weather = document.createElement("div");
    weather.textContent = `${item.weather}`;
    const maxtemp = document.createElement("div");
    maxtemp.textContent = `H: ${item.maxtemp}`;
    const mintemp = document.createElement("div");
    mintemp.textContent = `L: ${item.mintemp}`;

    const elementsToRender = [
      iconContainer,
      day,
      date,
      weather,
      maxtemp,
      mintemp,
    ];

    elementsToRender.forEach((element) => forecastCard.append(element));
    forecastWeather.appendChild(forecastCard);
  });
}

// clear location input field upon submit
function clearInput() {
  inputLocation.value = "";
}

// clear appended weather functions
function clearCurrent() {
  errorDiv.textContent = ""
  while (currentWeather.firstChild) {
    currentWeather.removeChild(currentWeather.firstChild);
  }
}

function clearForecast() {
  while (forecastWeather.firstChild) {
    forecastWeather.removeChild(forecastWeather.firstChild);
  }
}

export {
  inputLocation,
  submitLocation,
  clearInput,
  toggle,
  renderCurrent,
  renderFuture,
};
