import { inputLocation, submitLocation, clearInput, toggle } from "./view";
import { getAllWeather, setTempUnit } from "./api-handler";

document.addEventListener("DOMContentLoaded", () => {
  submitLocation.addEventListener("click", (event) => {
    event.preventDefault();
    const location = inputLocation.value;
    getAllWeather(location);
    clearInput();
  });
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      return setTempUnit("f")
    }
    return setTempUnit("c")
  });
});

