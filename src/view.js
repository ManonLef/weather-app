/* eslint no-use-before-define: ["error", { "functions": false }] */
const appContainer = document.querySelector(".app-container");

// app Header:
const appHeader = document.querySelector("header");

// current weather display
const currentWeather = document.createElement("div");
appContainer.append(currentWeather);

async function renderCurrent(wx) {
  // this data still has to go to the api-handler
  const locationWeather = await wx;
  const current = locationWeather[0];
  //
  clearCurrent();
  // app header
  appHeader.textContent = `Manon's WeatherDash`;
  // header
  const currentHeader = document.createElement("div");
  currentHeader.textContent = `Current Weather Conditions for ${current.location}`;
  // img
  const icon = new Image();
  icon.src = `${current.icon}`;
  //
  const location = document.createElement("div");
  location.textContent = `${current.location}, ${current.country}`;
  const date = document.createElement("div");
  date.textContent = `Updated: ${current.day} ${current.date} ${current.last_update_time}`;
  const weather = document.createElement("div");
  weather.textContent = `${current.weather}`;
  const temp = document.createElement("div");
  temp.textContent = `${current.temperature}`;

  const elementsToRender = [currentHeader, icon, location, weather, temp, date];
  elementsToRender.forEach((element) => currentWeather.append(element));
}

// create form
const locationForm = document.createElement("form");
appContainer.appendChild(locationForm);

const inputContainer = document.createElement("div")
inputContainer.className = "input-container"

locationForm.append(inputContainer)

const inputLocation = document.createElement("input");
inputContainer.appendChild(inputLocation)

const errorDiv = document.createElement("div");
errorDiv.textContent = "Search for a location";
inputContainer.appendChild(errorDiv)

const submitLocation = document.createElement("button");
submitLocation.textContent = "submit";
locationForm.append(submitLocation);

function clearInput() {
  inputLocation.value = "";
}

// temp toggle
const switchLabel = document.createElement("label");
switchLabel.className = "switch";
const toggle = document.createElement("input");
toggle.type = "checkbox";
const div = document.createElement("div");
div.className = "div";
switchLabel.append(toggle, div);
appContainer.append(switchLabel);

// forecast weather display
const forecastWeatherHeader = document.createElement("div");
const forecastWeather = document.createElement("div");
forecastWeather.className = "forecast-container";

appContainer.append(forecastWeatherHeader, forecastWeather);

async function renderFuture(wx) {
  const locationWeather = await wx;
  const forecast = locationWeather[1];
  const current = locationWeather[0];

  clearForecast();

  forecastWeatherHeader.textContent = `7 day Forecast for ${current.location}`;

  forecast.forEach((item) => {
    const forecastCard = document.createElement("div");

    const iconContainer = document.createElement("div");
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

function clearCurrent() {
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
