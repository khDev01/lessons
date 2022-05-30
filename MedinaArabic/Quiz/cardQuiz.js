const urlBook1 = "../book1edit.json"
english = document.getElementById("english")
arabic = document.getElementById("arabic")
arabic2 = document.getElementById("arabic2")
lessonsMenu = document.getElementById("lessonsMenu")
let result
let min
let max
let NoOfAnsOptionsToShow = 6
bookVocabNo = 0

// get lesson vocab from json file
let getVocab = () => {
  fetch(urlBook1)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book1 = data
      bookVocabNo = book1.length
      noOfLessons = book1[book1.length - 1].L
      createMenu(noOfLessons)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

let createMenu = () => {
  let lsnNo = document.createElement("span")
  lsnNo.innerText = "Lesson"
  lessonsMenu.appendChild(lsnNo)
  for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
    let lsnNo = document.createElement("span")
    lsnNo.innerHTML = lessonNo
    lsnNo.classList.add("lessonmenuitem")
    lsnNo.onclick = function () {
      filterLesson(lessonNo)
      // style lesson itmes
      lessnmenuitems = lessonsMenu.children
      for (let i = 0; i < lessnmenuitems.length; i++) {
        let itemmenu = lessnmenuitems[i]
        itemmenu.style.removeProperty("background-color")
      }
      lsnNo.style.backgroundColor = "purple"
      setNextQuestion()
    }
    lessonsMenu.appendChild(lsnNo)
  }
}

// return selected lesson vocab id
let filterLesson = (selectedNo) => {
  result = book1.filter((obj) => {
    return obj.L === selectedNo
  })
  min = result[0].id
  max = result.length + min
}

let start = () => {
  getRndInteger(min, max)
}

const shuffleArr = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

let questionText, questionValue
var randomNums = []

// Randomise and begin quiz
let getRndInteger = (min, max) => {
  // console.log("min: " + min + "  Max" + max)
  vocabAmount = max - min
  NoOfAnsOptions =
    vocabAmount < NoOfAnsOptionsToShow ? vocabAmount : NoOfAnsOptionsToShow
  randomNums = []
  while (randomNums.length < NoOfAnsOptions) {
    var r = Math.floor(Math.random() * (max - min)) + min
    if (randomNums.indexOf(r) === -1) randomNums.push(r)
  }
  questonValue = randomNums[0]
  questionText = book1[randomNums[0]].En
  randomNums = shuffleArr(randomNums)
}

///
///
///
const startButton = document.getElementById("start-btn")
const questionContainerElement = document.getElementById("question-container")
const BoxquizContainerElement = document.getElementById("boxQuizcontainer")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const iterationElement = document.getElementById("iteration")
let shuffledQuestions, currentQuestionIndex

let startQuiz = () => {
  startButton.classList.add("hide")

  // shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide")
  // BoxquizContainerElement.classList.remove("hide")
  setNextQuestion()
}

startButton.addEventListener("click", startQuiz)
// const nextButton = document.getElementById("next-btn")
// nextButton.addEventListener("click", () => {
//   setNextQuestion()
// })

let setNextQuestion = () => {
  currentQuestionIndex++
  resetState()
  // showQuestion()
  start()
  showQuestion()
}

function showQuestion() {
  iterationElement.innerHTML = currentQuestionIndex
  questionElement.innerHTML = questionText
  randomNums.forEach((answer) => {
    const button = document.createElement("button")
    button.innerText = book1[answer].Ar
    button.classList.add("btn")
    if (questonValue === answer) {
      // button.dataset.correct = answer.correct
      button.dataset.correct = "x"
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add("hide")
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

let maxNumberofQuestions = 20

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  console.log(correct)
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  })
  if (currentQuestionIndex < maxNumberofQuestions) {
    nextButton.classList.remove("hide")
    setTimeout(setNextQuestion, 800)
  } else {
    // startButton.innerText = "Restart"
    // startButton.classList.remove("hide")
    setTimeout(setNextQuestion, 800) // auto restart quiz
  }
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
  // element.classList.remove("wrong")
}

// self executing function here / same as jquery document ready
;(function () {
  getVocab()
})()
