// TODO: randomise whole array

english = document.getElementById("english")
arabic = document.getElementById("arabic")
arabic2 = document.getElementById("arabic2")

question1 = document.getElementById("question1")
first = document.getElementById("first")
second = document.getElementById("second")
third = document.getElementById("third")
fourth = document.getElementById("fourth")

const answerOptions = document.getElementById("choices")
const lessonsMenu = document.getElementById("lessonsMenu")

urlBook1 = "../book1edit.json"
let result
let min
let max
const randomAnswers = 4
bookVocabNo = 0
// let book1

let getBookData = () => {
  fetch(urlBook1)
    .then((response) => response.json()) // return json object
    .then((data) => {
      // console.log(data[0])
      book1 = data
      bookVocabNo = book1.length
      console.log(bookVocabNo)
      // // lesson1 = data
      noOfLessons = book1[book1.length - 1].L
      for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
        // const element = array[lessonNo];

        let lsn = document.createElement("h4")
        lsn.innerHTML = lessonNo
        lsn.onclick = function () {
          chooseLesson(lessonNo)
        }
        lessonsMenu.appendChild(lsn)
      }
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

let chooseLesson = (chosenNo) => {
  result = book1.filter((obj) => {
    // console.log(obj.L === chosenNo)
    return obj.L === chosenNo
  })
  min = result[0].id
  max = result.length + min
}

// const rndWholeList = () => {
//   let numberList = []
//   for (let index = 0; index < book1.length; index++) {
//     // const element = array[index]
//     numberList.push(index)
//   }
//   newrandomList = shuffledArr(numberList)
//   console.log(newrandomList)
// }

let startMegaQuiz = () => {
  bookMin = 0
  bookMax = book1.length
  getRndInteger(bookMin, bookMax)
}

let start = () => {
  getRndInteger(min, max)
}

const shuffledArr = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

let questionText, questionValue
var randomNums = []

let getRndInteger = (min, max) => {
  console.log("min: " + min + "  Max" + max)
  randomNums = []
  while (randomNums.length < randomAnswers) {
    var r = Math.floor(Math.random() * (max - min)) + min
    if (randomNums.indexOf(r) === -1) randomNums.push(r)
  }
  console.log(randomNums)
  questonValue = randomNums[0]
  // console.log("First val: " + randomNums[0])
  // console.log(book1[0].En)
  questionText = book1[randomNums[0]].En
  question1.innerHTML = questionText
  randomNums = shuffledArr(randomNums)
  // console.log("random" + randomNums)

  randomNums.forEach(makeQuiz)
  function makeQuiz(value) {
    // console.log(book1[value])
    // console.log(randomNums[0])
    var para = document.createElement("p")
    para.innerHTML = book1[value].Ar
    para.classList.add("optionchoice")
    if (questonValue === value) {
      // console.log(randomNums[0] + " " + value)
      para.id = "ans"
      para.onclick = function () {
        // alert("corect")
        while (answerOptions.hasChildNodes()) {
          answerOptions.removeChild(answerOptions.firstChild)
        }
        getRndInteger(min, max)
      }
    }

    answerOptions.appendChild(para)

    // TODO: Randomise output order,
  }
}
///
///
///
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const iterationElement = document.getElementById("iteration")
let shuffledQuestions, currentQuestionIndex

let startQuiz = () => {
  startButton.classList.add("hide")
  // shuffledQuestions = questions.sort(() => Math.random() - 0.5)

  currentQuestionIndex = 0

  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

startButton.addEventListener("click", startQuiz)
nextButton.addEventListener("click", () => {
  setNextQuestion()
})

// let nextQuestion = () => {
//   currentQuestionIndex++
//   setNextQuestion()
//   // combine nextquestion and setnextquestion functions
// }

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
      button.dataset.correct = answer.correct
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
  while (answerOptions.firstChild) {
    answerOptions.removeChild(answerOptions.firstChild)
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
  if (currentQuestionIndex < maxNumberofQuestions) {
    nextButton.classList.remove("hide")
    setTimeout(setNextQuestion, 1000)
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
    setTimeout(startQuiz, 3000)
    // add(show) countdown timer to restart quiz in seconds
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
  // setTimeout(chooseLesson, 1000)
  setTimeout(startMegaQuiz, 1000)
})()
