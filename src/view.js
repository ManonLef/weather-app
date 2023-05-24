const body = document.querySelector("body")

// create form
const locationForm = document.createElement("form")
body.appendChild(locationForm)

const inputLocation = document.createElement("input")
const submitLocation = document.createElement("button")
submitLocation.textContent = "submit"
locationForm.append(inputLocation,submitLocation)

async function clearInput() {
  inputLocation.value = ""
}

// temp toggle
const toggle = document.createElement("input")
toggle.type = "checkbox"
body.append(toggle)

export {inputLocation, submitLocation, clearInput, toggle}