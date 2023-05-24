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
  const current = locationWeather[0]
  //
  clearCurrent()
  // img 
  const icon = new Image()
  icon.src = `${current.icon}`
  // 
  const location = document.createElement("div")
  location.textContent = `${current.location}, ${current.country}`
  const day = document.createElement("div")
  day.textContent = `${current.day}`
  const date = document.createElement("div")
  date.textContent = `${current.date}`
  const weather = document.createElement("div")
  weather.textContent = `${current.weather}`
  const temp = document.createElement("div")
  temp.textContent = `${current.temperature}`


  const elementsToRender = [icon, location, day, date, weather, temp]
  elementsToRender.forEach(element => currentWeather.append(element))
}

function clearCurrent() {
  while (currentWeather.firstChild) {
    currentWeather.removeChild(currentWeather.firstChild)
  }
}

export { inputLocation, submitLocation, clearInput, toggle, renderCurrent };
