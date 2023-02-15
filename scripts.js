import json from "./Qaida/chapters/qaida.json" assert { type: "json" }
const container = document.getElementById("container")

let text = []
let index = 0

json.alphabetAr.forEach((element) => {
  // console.log(element)
  text.push(element)
})

let nextElement = () => {
  container.innerHTML = text[index++ % text.length]
}

document.addEventListener("click", function () {
  nextElement()
})

document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    nextElement()
  }
})
