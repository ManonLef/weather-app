const body = document.querySelector("body");

// create form
const locationForm = document.createElement("form");
body.appendChild(locationForm);

const inputLocation = document.createElement("input");
const submitLocation = document.createElement("button");
submitLocation.textContent = "submit";
locationForm.append(inputLocation, submitLocation);

async function clearInput() {
  inputLocation.value = "";
}

// temp toggle
const toggle = document.createElement("input");
toggle.type = "checkbox";
body.append(toggle);

// current weather display
const currentWeather = document.createElement("div");
body.append(currentWeather)

async function renderCurrent(wx) {
  // this data still has to go to the api-handler
  const locationWeather = await wx
  const currentWeather = locationWeather[0]
  console.log(currentWeather)
  //
  const location = document.createElement("div")
  location.textContent = `${currentWeather.location}, ${currentWeather.country}`
  const day = document.createElement("div")
  day.textContent = `${currentWeather.day}`
  const date = document.createElement("div")
  date.textContent = `${currentWeather.date}`
  const weather = document.createElement("div")
  weather.textContent = `${currentWeather.weather}`
  const temp = document.createElement("div")
  temp.textContent = `${currentWeather.temperature}`


  const elementsToRender = [location, day, date, weather, temp]
  elementsToRender.forEach(element => body.append(element))
}

export { inputLocation, submitLocation, clearInput, toggle, renderCurrent };
