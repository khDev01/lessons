english = document.getElementById("english")
arabic = document.getElementById("arabic")
arabic2 = document.getElementById("arabic2")

question1 = document.getElementById("question1")
first = document.getElementById("first")
second = document.getElementById("second")
third = document.getElementById("third")
fourth = document.getElementById("fourth")

urlBook1 = "../book1edit.json"
// let ar2
let result
let min = 0
let max
const randomAnswers = 4
// let book1

let getBookData = () => {
  fetch(urlBook1)
    .then((response) => response.json()) // return json object
    .then((data) => {
      // console.log(data[0])
      //   english.innerHTML = data[0].En
      //   arabic.innerHTML = data[0].Ar
      //   ar2 = data[2].Ar
      book1 = data
      // lesson1 = data
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

let chooseLesson = () => {
  //   question1.innerHTML = book1[0].En
  //   first.innerHTML = book1[0].Ar
  //   second.innerHTML = book1[1].Ar
  //   third.innerHTML = book1[2].Ar
  //   fourth.innerHTML = book1[3].Ar

  result = book1.filter((obj) => {
    return obj.Lesson === 1
  })
  //   console.log(result)
  max = result.length
}

const shuffledArr = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

let questionText, questionValue
var randomNums = []

let getRndInteger = (min, max) => {
  // var randomNums = []
  while (randomNums.length < randomAnswers) {
    var r = Math.floor(Math.random() * (max - min)) + min
    if (randomNums.indexOf(r) === -1) randomNums.push(r)
  }
  // console.log(randomNums)
  questonValue = randomNums[0]
  // console.log("First val: " + randomNums[0])
  questionText = book1[randomNums[0]].En
  question1.innerHTML = questionText
  randomNums = shuffledArr(randomNums)
  // console.log("random" + randomNums)

  randomNums.forEach(makeQuiz)
  function makeQuiz(value) {
    // console.log(book1[value])
    // console.log(randomNums[0])
    var para = document.createElement("h2")
    para.innerHTML = book1[value].Ar
    if (questonValue === value) {
      // console.log(randomNums[0] + " " + value)
      para.id = "ans"
      para.onclick = function () {
        alert("hello")
      }
    }

    document.getElementById("myDIV").appendChild(para)

    // TODO: Randomise output order,
  }
}

let start = () => {
  getRndInteger(min, max)
}

//
//
//

//

///

///
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

console.log(questionElement)

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startQuiz)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startQuiz() {
  startButton.classList.add("hide")
  // shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  start()
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion()
}

function showQuestion() {
  console.log(questionElement)
  questionElement.innerHTML = questionText
  let mytestcounter = 0
  randomNums.forEach((answer) => {
    const button = document.createElement("button")
    button.innerText = book1[answer].Ar
    button.classList.add("btn")
    if (questonValue === answer) {
      button.dataset.correct = answer.correct
      mytestcounter++
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

let maxNumberofQuestions = 5

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  })
  if (currentQuestionIndex > maxNumberofQuestions) {
    nextButton.classList.remove("hide")
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
    setTimeout(startQuiz, 1000)
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
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

// // create a new div element
// const newDiv = document.createElement("div");
// // and give it some content
// const newContent = document.createTextNode("Hi there and greetings!");
// // add the text node to the newly created div
// newDiv.appendChild(newContent);
// // add the newly created element and its content into the DOM
// const currentDiv = document.getElementById("div1");
// document.body.insertBefore(newDiv, currentDiv);

// self executing function here / same as jquery document ready
;(function () {
  getBookData()
  setTimeout(chooseLesson, 1000)
})()
