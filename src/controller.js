import { inputLocation, submitLocation, clearInput, toggle, renderCurrent, renderFuture } from "./view";
import { getAllWeather, setTempUnit, setLocation } from "./api-handler";

document.addEventListener("DOMContentLoaded", () => {
  submitLocation.addEventListener("click", renderLocationWeather);
  toggle.addEventListener("change", toggleTemp);
});

async function renderLocationWeather(event) {
  event.preventDefault();
  setLocation(inputLocation.value);
  await renderCurrent(getAllWeather())
  clearInput();
}

function toggleTemp() {
  if (toggle.checked) {
    setTempUnit("f");
    return renderCurrent(getAllWeather())
  }
   setTempUnit("c")
   return renderCurrent(getAllWeather())
}

renderCurrent(getAllWeather())
renderFuture(getAllWeather())






