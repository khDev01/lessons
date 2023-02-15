// TODO: clean code

import createMenu, { newmax, lessonid } from "./quizmenu.js"
const bookjson = "../book1FilterbyL.json"
const queText = document.getElementById("queText")
const optionsContainer = document.getElementById("choices")
let min, max, questionText, NoOfAnsOptions, resultID, lessonNoselected
let NoOfAnsOptionsToShow = 6,
  outputIDs = []
let book, totalVocab
let runalgorithm = true
let EntoAr = true
let delay = false
let noOfLessons
let menuitem = document.querySelectorAll(".lessonmenuitem")

// quickly fire through each question
document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    algo(runalgorithm, true)
    setNextQuestion()
  } else if (event.key === "x") {
    console.log(algoobj)
  }
})

queText.addEventListener("click", function () {
  delay = !delay
})

// get lesson vocab from json file
let getVocab = () => {
  fetch(bookjson)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book = data
      noOfLessons = Object.keys(data[0]).length
      createMenu(noOfLessons, book, setNextQuestion)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

let startMegaQuiz = () => {
  document.getElementById("menuHeader").addEventListener("click", function () {
    EntoAr = !EntoAr
  })
  for (let i = 1; i <= noOfLessons; i++) {
    algoobj[i] = []
  }
  min = 0
  max = book[0][1].length
  // menuitem.forEach((item) => {
  //   item.addEventListener("click", function () {
  //     console.log(item.innerHTML)
  //   })
  // })
  setNextQuestion()
}

let focusEl = document.createElement("p")
focusEl.id = "currentFocus"
optionsContainer.insertAdjacentElement("afterEnd", focusEl)

let resetQuiz = () => {
  lessonNoselected = lessonid() == undefined ? 1 : lessonid()
  //remove previous options for next selection (reset state)
  while (optionsContainer.hasChildNodes()) {
    optionsContainer.removeChild(optionsContainer.firstChild)
  }
}

let focuson = () => {
  getlessonspecificmostwrongid()
  focusEl.innerHTML =
    mostWrongID !== undefined ? "Focus: " + book[0][lessonNoselected][mostWrongID].En : ""
  // change first ID to most answerd incorrectly
  if (mostWrongID != undefined && Math.random() < 0.5) {
    let idalreadyexist = outputIDs.includes(mostWrongID)
    // do not duplicate id
    if (idalreadyexist === false) {
      outputIDs[0] = mostWrongID
    }
    // console.log("Focus active: " + book[0][lessonNoselected][outputIDs[0]].En)
  }
}

let getlessonspecificmostwrongid = () => {
  if (algoobj[lessonNoselected].length > 5) {
    if (algoobj[lessonNoselected][0].w >= 0) {
      mostWrongID =
        algoobj[lessonNoselected][0] === undefined ? undefined : algoobj[lessonNoselected][0].id
      if (mostWrongID !== undefined) {
        // console.log("Focus on: " + book[0][lessonNoselected][mostWrongID].En)
      }
    } else {
      mostWrongID = undefined
      // console.log("Focus Off")
    }
  }
  //  < 5 elements in lesson specific array
  else {
    mostWrongID = undefined
    // console.log("No focus")
  }

  // console.log("mymostwrong" + mostWrongID)
}
let setNextQuestion = () => {
  resetQuiz()
  max = newmax() == undefined ? max : newmax()
  // show less options if a smaller lesson is chosen
  totalVocab = book[0][lessonNoselected].length
  NoOfAnsOptions = totalVocab < NoOfAnsOptionsToShow ? totalVocab : NoOfAnsOptionsToShow
  // Get new vocab ID
  getRndIDs(max)

  focuson()
  // Select first ID as answer result
  resultID = outputIDs[0]

  display()
}
let display = () => {
  let EnText = book[0][lessonNoselected][outputIDs[0]].En
  let ArText = book[0][lessonNoselected][outputIDs[0]].Ar
  // Update question text
  questionText = EntoAr ? EnText : ArText
  queText.innerHTML = questionText
  // Randomise ID order for output
  outputIDs = shuffleArr(outputIDs)
  // display output options
  outputIDs.forEach(createOptions)
}

let getRndIDs = (max) => {
  outputIDs = [] // Clear array
  while (outputIDs.length < NoOfAnsOptions) {
    let r = Math.floor(Math.random() * max)
    // Remove duplicate ids
    if (outputIDs.indexOf(r) === -1) outputIDs.push(r)
  }
  // console.log(outputIDs)
}

let mostWrongID = undefined
let algoobj = {}

let algo = (run, iscorrect) => {
  if (!run) {
    console.log(run)
    return
  }
  // Add new data
  let found = algoobj[lessonNoselected].find((foun) => foun.id === resultID)
  if (found === undefined) {
    let correctstart = iscorrect ? 1 : 0
    let wrongstart = iscorrect ? 0 : 1
    let addNewarrItem = {
      // l: lessonNoselected,
      id: resultID,
      c: correctstart,
      w: wrongstart,
      // en: book[0][lessonNoselected][resultID].En,
      // correct: correctCount,
      // wrong: wrongCount,
    }
    algoobj[lessonNoselected].push(addNewarrItem)
  }
  // update existing data
  else {
    let getsome = algoobj[lessonNoselected].find((foun) => foun.id === resultID)
    // console.log(getsome)
    if (iscorrect) {
      getsome.c = getsome.c + 1
      if (Math.random() < 0.8) {
        getsome.w = getsome.w - 1
      }
    } else getsome.w = getsome.w + 1
  }

  //sort array from most w
  algoobj[lessonNoselected].sort((a, b) => b.w - a.w)
}

let createOptions = (value) => {
  let ansOption = document.createElement("p")
  let badcount = 0
  let EnAns = book[0][lessonNoselected][value].En
  let ArAns = book[0][lessonNoselected][value].Ar
  ansOption.innerHTML = EntoAr ? ArAns : EnAns
  ansOption.classList.add("optionchoice")
  ansOption.classList.add("optionchoicehover")
  if (resultID === value) {
    ansOption.id = "ans"
    ansOption.onclick = function () {
      // alert("corect")
      if (badcount > 2) {
        algo(runalgorithm, false)
      } else {
        algo(runalgorithm, true)
      }
      if (!delay) {
        setNextQuestion()
        return
      }
      ansOption.style.backgroundColor = "darkgreen"
      !delay ? setNextQuestion() : setTimeout(setNextQuestion, 1000)
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
        algo(runalgorithm, false)
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
