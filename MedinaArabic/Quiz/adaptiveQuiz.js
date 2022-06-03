const urlBook1 = "../book1edit.json"
queText = document.getElementById("queText")
optionsContainer = document.getElementById("choices")
let min, max, questionText
let NoOfAnsOptionsToShow = 6,
  NoOfAnsOptions
let outputIDs = [],
  resultID

// quickly fire through each question
document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    algo(true)
    newQuestion()
  } else if (event.key === "x") {
    console.log(algoarray)
  }
})

// get lesson vocab from json file
let getVocab = () => {
  fetch(urlBook1)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book1 = data
      noOfLessons = book1[book1.length - 1].L
      createMenu(noOfLessons)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

lessonsMenu = document.getElementById("lessonsMenu")
let createMenu = () => {
  let menuHeader = document.createElement("span")
  menuHeader.innerText = "Lesson"
  menuHeader.onclick = function () {
    startMegaQuiz()
  }
  lessonsMenu.appendChild(menuHeader)
  for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
    let lsnNo = document.createElement("span")
    lsnNo.innerHTML = lessonNo
    lsnNo.classList.add("lessonmenuitem")
    lsnNo.onclick = function () {
      algoarray = [] // clear array
      mostWrongID = undefined
      filterLesson(lessonNo)
      // style lesson itmes
      lessnmenuitems = lessonsMenu.children
      for (let i = 0; i < lessnmenuitems.length; i++) {
        let itemmenu = lessnmenuitems[i]
        itemmenu.style.removeProperty("background-color")
      }
      lsnNo.style.backgroundColor = "purple"
      newQuestion()
    }
    lessonsMenu.appendChild(lsnNo)
  }
}

let filterLesson = (selectedNo) => {
  result = book1.filter((obj) => {
    return obj.L === selectedNo
  })
  min = result[0].id
  max = result.length + min
}

let startMegaQuiz = () => {
  min = 0
  max = book1.length
  newQuestion()
}

let newQuestion = () => {
  //remove previous options for next selection (reset state)
  while (optionsContainer.hasChildNodes()) {
    optionsContainer.removeChild(optionsContainer.firstChild)
  }
  // show less options if a smaller lesson is chosen
  vocabAmount = max - min
  NoOfAnsOptions =
    vocabAmount < NoOfAnsOptionsToShow ? vocabAmount : NoOfAnsOptionsToShow
  // Get new vocab ID
  getRndIDs(min, max)
  // change first ID to most answerd incorrectly
  if (mostWrongID != undefined && Math.random() < 0.5) {
    outputIDs[0] = mostWrongID
    console.log("Focus: " + book1[outputIDs[0]].En)
  }
  // Select first ID as answer result
  resultID = outputIDs[0]

  // Update question text
  questionText = book1[outputIDs[0]].En
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
    correctstart = iscorrect ? 1 : 0
    wrongstart = iscorrect ? 0 : 1
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
            console.log(book1[obj.id].En + " -1")
          }
        } else obj.w = obj.w + 1
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
  }

  // // get IDs in order
  // let getIncIDs = () => {
  //   smin = 0
  //   smax = book1.length
  //   // console.log("start:" + smin + " end:" + smax)
  // }
}

let createOptions = (value) => {
  var ansOption = document.createElement("p")
  ansOption.innerHTML = book1[value].Ar
  ansOption.classList.add("optionchoice")
  if (resultID === value) {
    ansOption.id = "ans"
    ansOption.onclick = function () {
      // alert("corect")
      algo(true)
      newQuestion()
    }
  } else {
    // if wrong answer selected
    ansOption.onclick = function () {
      ansOption.style.backgroundColor = "darkred"
      setTimeout(newQuestion, 200)
      algo(false)
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
