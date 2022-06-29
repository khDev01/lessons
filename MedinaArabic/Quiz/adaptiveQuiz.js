import createMenu, { newmin, newmax } from "./quizmenu.js"
// const bookjson = "../book1edit.json"
const bookjson = "../book1edit.json"
const queText = document.getElementById("queText")
const optionsContainer = document.getElementById("choices")
let min, max, questionText, NoOfAnsOptions, resultID
let NoOfAnsOptionsToShow = 6,
  outputIDs = []
let book, totalVocab
let runalgorithm = false
let EntoAr = true
let delay = false

// quickly fire through each question
document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    algo(runalgorithm, true)
    setNextQuestion()
  } else if (event.key === "x") {
    console.log(algoarray)
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
      let noOfLessons = 23
      // let noOfLessons = book[book.length - 1].L
      createMenu(noOfLessons, book, setNextQuestion)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

let startMegaQuiz = () => {
  min = 0
  max = book.length
  setNextQuestion()
  document.getElementById("menuHeader").addEventListener("click", function () {
    EntoAr = !EntoAr
  })
}

let focusEl = document.createElement("p")
focusEl.id = "currentFocus"
optionsContainer.insertAdjacentElement("afterEnd", focusEl)

let resetQuiz = () => {
  min = newmin() == undefined ? min : newmin()
  max = newmax() == undefined ? max : newmax()
  //remove previous options for next selection (reset state)
  while (optionsContainer.hasChildNodes()) {
    optionsContainer.removeChild(optionsContainer.firstChild)
  }
}

let focuson = () => {
  focusEl.innerHTML = mostWrongID != undefined ? "Focus: " + book[mostWrongID].En : ""
  // change first ID to most answerd incorrectly
  if (mostWrongID != undefined && Math.random() < 0.5) {
    let idalreadyexist = outputIDs.includes(mostWrongID)
    // do not duplicate id
    if (idalreadyexist == false) {
      outputIDs[0] = mostWrongID
    }
    console.log("Focus active: " + book[outputIDs[0]].En)
  }
}
let setNextQuestion = () => {
  console.log(delay)
  // console.log("")
  resetQuiz()
  // show less options if a smaller lesson is chosen
  totalVocab = max - min
  NoOfAnsOptions = totalVocab < NoOfAnsOptionsToShow ? totalVocab : NoOfAnsOptionsToShow
  // Get new vocab ID
  getRndIDs(min, max)

  focuson()
  // Select first ID as answer result
  resultID = outputIDs[0]

  display()
}
let display = () => {
  let EnText = book[outputIDs[0]].En
  let ArText = book[outputIDs[0]].Ar
  // Update question text
  questionText = EntoAr ? EnText : ArText
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
let algo = (run, iscorrect) => {
  if (!run) {
    return
  }
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
    if (algoarray[0].w >= 0) {
      mostWrongID = algoarray[0].id
      console.log("Focus on: " + book[mostWrongID].En)
    } else {
      mostWrongID = undefined
      console.log("Focus Off")
    }
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
  let EnAns = book[value].En
  let ArAns = book[value].Ar
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
