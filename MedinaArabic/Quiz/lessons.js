// TODO: add more categories; ie colours, etc..
// TODO: turn lessonNo list into dropdown
// TODO: add score/display more info
// TODO: ability to select no of answers to show
// TODO: show which words are struggling with/show them more often
// TODO:
const urlBook1 = "../book1edit.json"
english = document.getElementById("english")
arabic = document.getElementById("arabic")
arabic2 = document.getElementById("arabic2")
queText = document.getElementById("queText")
answerOptions = document.getElementById("choices")
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
      // console.log(data[0])
      book1 = data
      bookVocabNo = book1.length
      // console.log("Total vocab: " + bookVocabNo)
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
    // console.log(obj.L === selectedNo)
    return obj.L === selectedNo
  })
  min = result[0].id
  max = result.length + min
}

let startMegaQuiz = () => {
  bookMin = 0
  bookMax = book1.length
  getRndInteger(bookMin, bookMax)
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
  while (randomNums.length < NoOfAnsOptions) {
    var r = Math.floor(Math.random() * (max - min)) + min
    if (randomNums.indexOf(r) === -1) randomNums.push(r)
  }
  // console.log(randomNums)
  questonValue = randomNums[0]
  // console.log("First val: " + randomNums[0])
  // console.log(book1[0].En)
  questionText = book1[randomNums[0]].En
  queText.innerHTML = questionText
  randomNums = shuffleArr(randomNums)
  // console.log("random" + randomNums)

  let makeQuiz = (value) => {
    // console.log(book1[value])
    // console.log(randomNums[0])
    var ansOption = document.createElement("p")
    // var ansOption = document.createElement("button")

    ansOption.innerHTML = book1[value].Ar
    ansOption.classList.add("optionchoice")
    if (questonValue === value) {
      // console.log(randomNums[0] + " " + value)
      ansOption.id = "ans"
      ansOption.onclick = function () {
        // alert("corect")
        while (answerOptions.hasChildNodes()) {
          answerOptions.removeChild(answerOptions.firstChild)
        }
        getRndInteger(min, max)
      }
    } else {
      ansOption.onclick = function () {
        ansOption.style.backgroundColor = "darkred"
      }
    }
    answerOptions.appendChild(ansOption)
  }
  randomNums.forEach(makeQuiz)
}

///
///
///
const startButton = document.getElementById("start-btn")
// const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
// const BoxquizContainerElement = document.getElementById("boxQuizcontainer")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const iterationElement = document.getElementById("iteration")
let shuffledQuestions, currentQuestionIndex
let maxNumberofQuestions = 20

let startQuiz = () => {
  startButton.classList.add("hide")
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

startButton.addEventListener("click", startQuiz)
// nextButton.addEventListener("click", () => {
//   setNextQuestion()
// })

let setNextQuestion = () => {
  currentQuestionIndex++
  resetState()
  getRndInteger(min, max)
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
  // nextButton.classList.add("hide")
  randomNums = [] //empty array
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
  while (answerOptions.firstChild) {
    answerOptions.removeChild(answerOptions.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const buttonData = selectedButton.dataset.correct
  setStatusClass(document.body, buttonData)
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  })
  autoNextQuestion()
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
  // startButton.classList.add("hide")
  getVocab()
  // setTimeout(filterLesson, 1000)
  setTimeout(startMegaQuiz, 1000)
})()
