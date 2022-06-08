import createMenu, { newmin, newmax } from "./quizmenu.js"
const bookjson = "../book1edit.json"
const queText = document.getElementById("queText")
const optionsContainer = document.getElementById("choices")
let min, max, questionText, NoOfAnsOptions, resultID
let NoOfAnsOptionsToShow = 6,
  outputIDs = []
let book, totalVocab

// quickly fire through each question
document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    algo(true)
    setNextQuestion()
  } else if (event.key === "x") {
    console.log(algoarray)
  }
})

// get lesson vocab from json file
let getVocab = () => {
  fetch(bookjson)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book = data
      let noOfLessons = book[book.length - 1].L
      createMenu(noOfLessons, book, setNextQuestion)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

// let menuContainer = document.getElementById("menuContainer")

let startMegaQuiz = () => {
  min = 0
  max = book.length
  setNextQuestion()
}

let focusEl = document.createElement("p")
optionsContainer.insertAdjacentElement("afterEnd", focusEl)

let setNextQuestion = () => {
  focusEl.innerHTML =
    mostWrongID != undefined ? "Focus: " + book[mostWrongID].En : ""
  // console.log("")
  min = newmin() == undefined ? min : newmin()
  max = newmax() == undefined ? max : newmax()
  //remove previous options for next selection (reset state)
  while (optionsContainer.hasChildNodes()) {
    optionsContainer.removeChild(optionsContainer.firstChild)
  }
  // show less options if a smaller lesson is chosen
  totalVocab = max - min
  NoOfAnsOptions =
    totalVocab < NoOfAnsOptionsToShow ? totalVocab : NoOfAnsOptionsToShow
  // Get new vocab ID
  getRndIDs(min, max)
  // change first ID to most answerd incorrectly
  if (mostWrongID != undefined && Math.random() < 0.9) {
    let idalreadyexist = outputIDs.find((num) => num == mostWrongID)
    // do not duplicate id
    if (idalreadyexist == undefined) {
      outputIDs[0] = mostWrongID
    }
    console.log("Focus active: " + book[outputIDs[0]].En)
  }
  // Select first ID as answer result
  resultID = outputIDs[0]

  // Update question text
  questionText = book[outputIDs[0]].En
  queText.innerHTML = questionText
  // Randomise ID order for output
  outputIDs = shuffleArr(outputIDs)
  // display output options
  outputIDs.forEach(createOptions)
}

let getRndIDs = (min, max) => {
  outputIDs = [] // Clear array
  while (outputIDs.length < NoOfAnsOptions) {
    var r = Math.floor(Math.random() * (max - min)) + min
    if (outputIDs.indexOf(r) === -1) outputIDs.push(r)
  }
}

let algoarray = []
let mostWrongID = undefined
let algo = (iscorrect) => {
  // getIncIDs()
  // console.log("resultID: " + resultID)

  // Add new data
  let found = algoarray.find((found) => found.id === resultID)
  if (found == undefined) {
    // console.log("Not found: " + resultID + " Added")
    let correctstart = iscorrect ? 1 : 0
    let wrongstart = iscorrect ? 0 : 1
    let addNewarrItem = {
      id: resultID,
      c: correctstart,
      w: wrongstart,
      // correct: correctCount,
      // wrong: wrongCount,
    }
    algoarray.push(addNewarrItem)
  }
  // update existing data
  else {
    // update singular object from array of objs
    for (const obj of algoarray) {
      if (obj.id == found.id) {
        // console.log(obj)
        if (iscorrect) {
          obj.c = obj.c + 1
          if (Math.random() < 0.8) {
            obj.w = obj.w - 1
            // console.log(book[obj.id].En + " -1")
          }
        } else obj.w = obj.w + 1
        // console.log(book[obj.id].En + " w:" + obj.w)
        break
      }
    }
    // console.log(algoarray)
  }

  //sort array from most w
  algoarray.sort((a, b) => b.w - a.w)
  // console.log(algoarray)
  if (algoarray.length > 5) {
    // console.log(algoarray[0].id)
    mostWrongID = algoarray[0].id
    console.log("Focus on: " + book[mostWrongID].En)
  }

  // // get IDs in order
  // let getIncIDs = () => {
  //   smin = 0
  //   smax = book.length
  //   // console.log("start:" + smin + " end:" + smax)
  // }
}

let createOptions = (value) => {
  var ansOption = document.createElement("p")
  let badcount = 0
  ansOption.innerHTML = book[value].Ar
  ansOption.classList.add("optionchoice")
  ansOption.classList.add("optionchoicehover")
  if (resultID === value) {
    ansOption.id = "ans"
    ansOption.onclick = function () {
      // alert("corect")
      if (badcount > 2) {
        algo(false)
      } else {
        algo(true)
      }
      setNextQuestion()
    }
  } else {
    // if wrong answer selected
    let firstclicked = false
    ansOption.onclick = function () {
      if (!firstclicked) {
        firstclicked = true
        ansOption.style.backgroundColor = "darkred"
        ansOption.classList.remove("optionchoicehover")
        // setTimeout(setNextQuestion, 200)
        // console.log("clicked")
        algo(false)
      }
    }
  }
  optionsContainer.appendChild(ansOption)
}

const shuffleArr = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

// self executing function here / same as jquery document ready
;(function () {
  getVocab()
  setTimeout(startMegaQuiz, 1000)
  // setTimeout(algo, 1000)
})()
