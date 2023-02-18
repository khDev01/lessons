import mainfunc, { shuffleArr } from "./quizLib.js"
import createMenu, { newmin, newmax } from "./quizmenu.js"
import getVocab, { mybookdata } from "./quizgetdataV2.js"
const bookjson = "../book1vocabOnly.json"

const queText = document.getElementById("queText")
const optionsContainer = document.getElementById("choices")
const menuContainer = document.getElementById("menuContainer")
let min, max, questionText
let NoOfAnsOptionsToShow = 6,
  NoOfAnsOptions
let outputIDs = [],
  resultID
let book, totalVocab

// quickly fire through each question
document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    setNextQuestion()
  } else if (event.key === "x") {
  }
})

let startMegaQuiz = () => {
  book = mybookdata()
  min = 0
  max = book.length
  setNextQuestion()
}

let setNextQuestion = () => {
  min = newmin() == undefined ? min : newmin()
  max = newmax() == undefined ? max : newmax()
  // console.log("min: " + min + "  Max" + max)
  //remove previous options for next selection (reset state)
  while (optionsContainer.hasChildNodes()) {
    optionsContainer.removeChild(optionsContainer.firstChild)
  }
  // show less options if a smaller lesson is chosen
  let vocabAmount = max - min
  NoOfAnsOptions = vocabAmount < NoOfAnsOptionsToShow ? vocabAmount : NoOfAnsOptionsToShow
  // Get new vocab ID
  getRndIDs(min, max)
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
    let r = Math.floor(Math.random() * max)
    if (outputIDs.indexOf(r) === -1) outputIDs.push(r)
  }
}

let createOptions = (value) => {
  var ansOption = document.createElement("p")
  ansOption.innerHTML = book[value].Ar
  ansOption.classList.add("optionchoice")
  if (resultID === value) {
    ansOption.id = "ans"
    ansOption.onclick = function () {
      // alert("corect")
      setNextQuestion()
    }
  } else {
    // if wrong answer selected
    ansOption.onclick = function () {
      ansOption.style.backgroundColor = "darkred"
    }
  }
  optionsContainer.appendChild(ansOption)
}

// const shuffleArr = (array) =>
//   array
//     .map((a) => ({ sort: Math.random(), value: a }))
//     .sort((a, b) => a.sort - b.sort)
//     .map((a) => a.value)

// self executing function here / same as jquery document ready
;(async function () {
  await getVocab(bookjson, totalVocab, setNextQuestion)
  console.log("hi")
  console.log(book)
  //    setTimeout(startMegaQuiz, 1000)
  await startMegaQuiz()
})()
