import createMenu, { newmin, newmax } from "./quizmenu.js"
const urlBook1 = "../book1edit.json"
const english = document.getElementById("english")
const arabic = document.getElementById("arabic")
const arabic2 = document.getElementById("arabic2")
const menuContainer = document.getElementById("menuContainer")
let result,
  min = 0,
  max = 100
let NoOfAnsOptionsToShow = 6
let bookVocabNo = 0
let questionText, questonValue
let outputIDs = []
const startButton = document.getElementById("start-btn")
const questionContainerElement = document.getElementById("question-container")
const BoxquizContainerElement = document.getElementById("boxQuizcontainer")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const iterationElement = document.getElementById("iteration")
let shuffledQuestions, currentQuestionIndex
let maxNumberofQuestions = 20
let book1

// get lesson vocab from json file
let getVocab = () => {
  fetch(urlBook1)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book1 = data
      bookVocabNo = book1.length
      let noOfLessons = book1[book1.length - 1].L
      createMenu(noOfLessons, book1, setNextQuestion)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

// let createMenu = () => {
//   let menuHeader = document.createElement("span")
//   menuHeader.innerText = "Lesson"
//   menuContainer.appendChild(menuHeader)
//   for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
//     let lsnNo = document.createElement("span")
//     lsnNo.innerHTML = lessonNo
//     lsnNo.classList.add("lessonmenuitem")
//     lsnNo.onclick = function () {
//       filterLesson(lessonNo)
//       // style lesson itmes
//       lessnmenuitems = menuContainer.children
//       for (let i = 0; i < lessnmenuitems.length; i++) {
//         let itemmenu = lessnmenuitems[i]
//         itemmenu.style.removeProperty("background-color")
//       }
//       lsnNo.style.backgroundColor = "purple"
//       setNextQuestion()
//     }
//     menuContainer.appendChild(lsnNo)
//   }
// }

// let filterLesson = (selectedNo) => {
//   result = book1.filter((obj) => {
//     return obj.L === selectedNo
//   })
//   min = result[0].id
//   max = result.length + min
// }

const shuffleArr = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

// Randomise and begin quiz
let getRndIDs = (min, max) => {
  let vocabAmount = max - min
  let NoOfAnsOptions =
    vocabAmount < NoOfAnsOptionsToShow ? vocabAmount : NoOfAnsOptionsToShow
  // outputIDs = []
  while (outputIDs.length < NoOfAnsOptions) {
    var r = Math.floor(Math.random() * (max - min)) + min
    if (outputIDs.indexOf(r) === -1) outputIDs.push(r)
    // console.log(outputIDs)
  }
}

// quickly fire through each question
document.onkeydown = function (evt) {
  evt = evt || window.event
  // on z keypress
  if (evt.keyCode == 90) {
    setNextQuestion()
  }
}
let startQuiz = () => {
  startButton.classList.add("hide")
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

startButton.addEventListener("click", startQuiz)

let setNextQuestion = () => {
  min = newmin() == undefined ? min : newmin()
  max = newmax() == undefined ? max : newmax()
  currentQuestionIndex++
  resetState()
  getRndIDs(min, max) // start quiz
  questonValue = outputIDs[0]
  questionText = book1[outputIDs[0]].En
  outputIDs = shuffleArr(outputIDs)
  showQuestion()
}

function showQuestion() {
  iterationElement.innerHTML = currentQuestionIndex
  questionElement.innerHTML = questionText
  outputIDs.forEach((answer) => {
    const button = document.createElement("button")
    button.innerText = book1[answer].Ar
    button.classList.add("btn")
    if (questonValue === answer) {
      button.dataset.correct = "x"
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  outputIDs = [] //empty array
  clearStatusClass(document.body)
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const buttonData = selectedButton.dataset.correct
  setStatusClass(document.body, buttonData)
  //
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  })
  autoNextQuestion()
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct", "wrong")
}

function autoNextQuestion() {
  if (currentQuestionIndex < maxNumberofQuestions) {
    setTimeout(setNextQuestion, 800)
  } else {
    // startButton.innerText = "Restart"
    // startButton.classList.remove("hide")
    setTimeout(setNextQuestion, 800) // auto restart quiz
  }
}

// self executing function here / same as jquery document ready
;(function () {
  getVocab()
})()
