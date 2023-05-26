/* eslint no-use-before-define: ["error", { "functions": false }] */
import { inputLocation, submitLocation, clearInput, toggle, renderCurrent, renderFuture } from "./view";
import { getAllWeather, setTempUnit, setLocation } from "./api-handler";

document.addEventListener("DOMContentLoaded", () => {
  submitLocation.addEventListener("click", renderLocationWeather);
  toggle.addEventListener("change", toggleTemp);
});

async function renderLocationWeather(event) {
  event.preventDefault();
  setLocation(inputLocation.value);
  await renderAll();
  clearInput();
}

function toggleTemp() {
  if (toggle.checked) {
    setTempUnit("f");
    return renderAll()
  }
   setTempUnit("c")
   return renderAll()
}

async function renderAll() {
try {await renderCurrent(getAllWeather())
await renderFuture(getAllWeather())}
catch(error) {
  document.querySelector(".error").textContent = "location not found"
}
}

renderAll()





