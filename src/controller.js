/* eslint no-use-before-define: ["error", { "functions": false }] */
import {
  inputLocation,
  submitLocation,
  clearInput,
  toggle,
  renderCurrent,
  renderFuture,
} from "./view";
import { getAllWeather, setTempUnit, setLocation, getPreviousLocation, setPreviousLocation, getLocation } from "./api-handler";

// event listeners for toggle and location
submitLocation.addEventListener("click", renderLocationWeather);
toggle.addEventListener("change", toggleTemp);

function renderLocationWeather(event) {
  event.preventDefault();
  setPreviousLocation(getLocation())
  setLocation(inputLocation.value);
  renderAll();
  clearInput();
}

function toggleTemp() {
  if (toggle.checked) {
    setTempUnit("f");
    return renderAll();
  }
  setTempUnit("c");
  return renderAll();
}

export default async function renderAll() {
  try {
    await renderCurrent(getAllWeather());
    await renderFuture(getAllWeather());
  } catch (error) {
    setLocation(getPreviousLocation());
    await renderAll()
    document.querySelector(".error").textContent = "location not found";
  }
}
