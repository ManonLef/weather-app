import {inputLocation, submitLocation, clearInput} from "./view";
import { getAllWeather } from "./api-handler"

document.addEventListener("DOMContentLoaded", () => {
  submitLocation.addEventListener("click", (event) => {
    event.preventDefault()
    const location = inputLocation.value
    getAllWeather(location)
    clearInput();
  })
})