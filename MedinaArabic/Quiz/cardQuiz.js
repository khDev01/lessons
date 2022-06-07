import { newmin, newmax } from "./quizmenu.js"
import getVocab, { mybookdata } from "./quizgetdata.js"
const bookjson = "../book1edit.json"
let min = 0,
  max = 100,
  NoOfAnsOptionsToShow = 6,
  totalVocab = 0
let questionText, questonValue
let outputIDs = []
const startButton = document.getElementById("start-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const iterationElement = document.getElementById("iteration")
let currentQuestionIndex
let maxNumberofQuestions = 20
let book

// get lesson vocab from json file
let addbook = () => {
  book = mybookdata()
}

const shuffleArr = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

// Randomise and begin quiz
let getRndIDs = (min, max) => {
  // console.log(book)
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
  questionText = book[outputIDs[0]].En
  outputIDs = shuffleArr(outputIDs)
  showQuestion()
}

function showQuestion() {
  iterationElement.innerHTML = currentQuestionIndex
  questionElement.innerHTML = questionText
  outputIDs.forEach((answer) => {
    const button = document.createElement("button")
    button.innerText = book[answer].Ar
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
  getVocab(bookjson, totalVocab, setNextQuestion)
  setTimeout(addbook, 1000)
})()
