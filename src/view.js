/* eslint no-use-before-define: ["error", { "functions": false }] */
const appContainer = document.querySelector(".app-container");

// app Header:
const appHeader = document.querySelector("header");

// temp toggle
const switchLabel = document.createElement("label");
switchLabel.className = "switch";
const toggle = document.createElement("input");
toggle.type = "checkbox";
const div = document.createElement("div");
div.className = "div";
switchLabel.append(toggle, div);
appHeader.append(switchLabel);


// current weather display
const currentWeather = document.createElement("div");
currentWeather.className = "current-container"
appContainer.append(currentWeather);

async function renderCurrent(wx) {
  // this data still has to go to the api-handler
  const locationWeather = await wx;
  const current = locationWeather[0];
  //
  clearCurrent();
  // header
  const currentHeader = document.createElement("div");
  currentHeader.className = "current-header"
  currentHeader.textContent = `Current Weather in ${current.location}, ${current.country}`;
  // img
  const icon = new Image();
  icon.src = `${current.icon}`;
  //
  const date = document.createElement("div");
  date.className = "updated"
  date.textContent = `Updated: ${current.day} ${current.date} ${current.last_update_time}`;
  const weather = document.createElement("div");
  weather.textContent = `${current.weather}`;
  const temp = document.createElement("div");
  temp.textContent = `${current.temperature}`;

  const elementsToRender = [ icon,currentHeader, weather, temp, date];
  elementsToRender.forEach((element) => currentWeather.append(element));
}

// create form

const formContainer = document.createElement("div")
formContainer.className = "form-container"
appContainer.append(formContainer)

const locationForm = document.createElement("form");
formContainer.appendChild(locationForm);

const inputContainer = document.createElement("div")
inputContainer.className = "input-container"

locationForm.append(inputContainer)

const inputLocation = document.createElement("input");
inputContainer.appendChild(inputLocation)
inputLocation.setAttribute("placeholder", "enter a location")

const errorDiv = document.createElement("div");
inputContainer.appendChild(errorDiv)

const submitLocation = document.createElement("button");
submitLocation.textContent = "submit";
locationForm.append(submitLocation);

function clearInput() {
  inputLocation.value = "";
}


// forecast weather display
const forecastContainer = document.createElement("div")
forecastContainer.className = "forecast-container"
const forecastWeatherHeader = document.createElement("div");
forecastWeatherHeader.className = "forecast-header"
const forecastWeather = document.createElement("div");
forecastWeather.className = "forecast-days";
forecastContainer.append(forecastWeatherHeader, forecastWeather)

appContainer.append(forecastContainer);

async function renderFuture(wx) {
  const locationWeather = await wx;
  const forecast = locationWeather[1];
  const current = locationWeather[0];

  clearForecast();

  forecastWeatherHeader.textContent = `7 day Forecast for ${current.location}`;

  forecast.forEach((item) => {
    const forecastCard = document.createElement("div");
    forecastCard.className = "forecast-card"

    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-div"
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
