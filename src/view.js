/* eslint no-use-before-define: ["error", { "functions": false }] */
const appContainer = document.querySelector(".app-container");

// test styling before css
appContainer.style.display = "grid";
appContainer.style.gap = "5px";

// current weather display
const currentWeather = document.createElement("div");
const currentWeatherHeader = document.createElement("div");
appContainer.append(currentWeatherHeader, currentWeather);

async function renderCurrent(wx) {
  // this data still has to go to the api-handler
  const locationWeather = await wx;
  const current = locationWeather[0];
  //
  clearCurrent();
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

const inputLocation = document.createElement("input");
const submitLocation = document.createElement("button");
submitLocation.textContent = "submit";
locationForm.append(inputLocation, submitLocation);

async function clearInput() {
  inputLocation.value = "";
}

const errorDiv = document.createElement("div");
errorDiv.textContent = "Search for a location";
appContainer.append(errorDiv);

// temp toggle
const toggle = document.createElement("input");
toggle.type = "checkbox";
appContainer.append(toggle);

// forecast weather display
const forecastWeatherHeader = document.createElement("div");
const forecastWeather = document.createElement("div");
// style before stylesheet added. Testing purposes only
forecastWeather.style.display = "flex";
forecastWeather.style.gap = "20px";
//

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
