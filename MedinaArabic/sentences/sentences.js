// Abreviations: sentence as s, and as wa, question as Q, answer as A, this as hatha
// Note: Arabic grammar: single letter words before a word join with next word (no space )
// TODO:
//
// const urlbook = "./sentence.json"
const book1json = "../book1Complete.json"
let sContainer = document.getElementById("sentenceContainer")
let result, book, booklength //objects
let keysArr = []
let vocabArr = []

// get lesson vocab from json file
let getVocab = () => {
  fetch(book1json)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book = data
      booklength = data.length
      localStorage.setItem("book1data", JSON.stringify(book))
      // console.log(JSON.parse(localStorage.getItem("book1data")))
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

let moonLetters = ["ه", "ي", "و", "م", "ك", "ق", "ف", "غ", "ع", "خ", "ح", "ج", "ب", "أ", "إ"]
let starterArr = [
  ["This", "\u0647\u064e\u0630\u064e\u0627"],
  ["That", "\u0630\u064e\u0644\u0650\u0643\u064e"],
  ["What", "\u0645\u064e\u0627 "],
  ["and", "\u0648\u064e"],
  ["is", "أ"],
  ["yes", "نعم"],
  ["no", "لا"],
  ["who", "\u0645\u064e\u0646\u0652"],
  ["where", "\u0623\u064e\u064a\u0652\u0646\u064e"],
  // ["is", "أ"],
  ["Thisf", "\u0647\u064e\u0640\u0670\u0630\u0650\u0647\u0650"],
  ["Thatf", "\u062a\u0650\u0644\u0652\u0643\u064e"],
  // ["is", "أ"],
]
// remove instances within string
// let strin = getrandomdata(objects)[1]
//   strin = strin.replaceAll("\u064e", "")

// // Create a Map
const starters = new Map(starterArr)

fatha = "\u064e"
kasra = "\u0650"
doma = "\u064f"
fatha2 = "\u064b"
kasra2 = "\u064d"
doma2 = "\u064c"
shadda = "\u0651"
sukun = "\u0652"
spaceJoin = "\u0640"
alifsmall = "\u0670"
questionMark = "\u061f"
comma = "\u060c "
dateSeperator = "\u060d"
semicolon = "\u061b"
trippledot = "\u061f"
fullstop = "\u06d4"
Allah = "\ufdf2"
akbar = "\ufdf3"
Muhammad = "\ufdf4"
rasool = "\ufdf6"
salalahual = "\ufdfa"
reyal = "\ufdfc"
bism = "\ufdfd"
yes = starters.get("yes") + comma
no = starters.get("no") + comma
al = "\u0627\u0644"
fe = "\u0641\u0650\u064a"
on = "\u0639\u064e\u0644\u064e\u0649"
to = "\u0625\u0650\u0644\u064e\u0649"
from = "\u0645\u0650\u0646\u0652"
he = "\u0647\u064f\u0648\u064e"
she = "\u0647\u0650\u064a\u064e"
// function toUnicode(str) {
//   return str
//     .split("")
//     .map(function (value, index, array) {
//       var temp = value.charCodeAt(0).toString(16).toUpperCase()
//       if (temp.length > 2) {
//         return "\\u" + temp
//       }
//       return value
//     })
//     .join("")
// }
String.prototype.replaceLast = function (what, replacement) {
  return this.split(" ")
    .reverse()
    .join(" ")
    .replace(new RegExp(what), replacement)
    .split(" ")
    .reverse()
    .join(" ")
}

let getType = (type) => {
  let newArrbook = book.filter(function (el) {
    return el.T === type
  })
  return newArrbook
}

let getrandomdata = (type = "NounObj", maxVocab = 5) => {
  // let ismale = gender === "M" ? true : false
  filtered = getType(type)
  let TypevocabArr = []
  for (let s = 0; s < maxVocab; s++) {
    randomID = Math.floor(Math.random() * filtered.length)
    bookvocab = filtered[randomID]
    TypevocabArr.push(bookvocab)
  }
  return bookvocab
}

let display = (text, options = {}) => {
  let para = createElement("p")
  para.innerHTML = text
  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      para.classList.add(value)
      return
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        para.dataset[dataKey] = dataValue
      })
      return
    }

    para.setAttribute(key, value)
  })
  // textHighlighter(para)
  // highlight(para, questionMark)
  document.body.appendChild(para)
  // console.log(text)
}

let displaySection = (array) => {
  array.forEach((element) => {
    display(element)
  })
  linebreak()
}
let linebreak = () => {
  let div = document.createElement("div")
  document.body.appendChild(div)
  // console.log(sentence)
}

hatha = starters.get("This")
that = starters.get("That")

let createRandomSentence = () => {
  // lesson1and2()
  // lesson3() //todo add adjs
  // lesson4() //todo make sentences correcty with prep
  // bodyHighlighter()
}

let Questions = () => {}
lesson6 = () => {}
lesson5 = () => {}

lesson4 = () => {
  getdefiniteWord()
  let majroor = (prep, getNewWord) => {
    if (getNewWord) {
      if (prep === fe) {
        console.log("Place")
        getdefiniteWord("Place")
      }
      // if (prep === fe) {
      //   console.log("Place")
      //   getdefiniteWord("Place")
      // }
      else {
        console.log("new word")
        getdefiniteWord()
      }
    }

    majobj = changeharakat(alobj, kasra)
    if (prep == "\u0645\u0650\u0646\u0652") {
      prep = changeharakat(prep, fatha)
      return prep + " " + majobj
    }
    return prep + " " + majobj
  }
  objin = majroor(fe)
  objon = majroor(on, true)
  objfrom = majroor(from)
  objto = majroor(to)

  where = starters.get("where")
  wheres = where + " " + alobj + questionMark
  rndWordpronoun = rndWord.M ? he : she
  whereAns = rndWordpronoun + " " + majroor(on, true)

  person = getrandomdata("Name")
  personPronoun = person.M ? he : she
  wheresPerson = where + " " + person.Ar + questionMark
  wheresPersonAns = personPronoun + " " + majroor(fe, true)

  displaySection([objin, objon, objto, objfrom])
  // displaySection([wheres, whereAns])
  displaySection([wheresPerson, wheresPersonAns])
}

let changeharakat = (str, changeTo = doma) => {
  // make definite
  if (changeTo === doma) {
    return str.replaceLast(doma2, changeTo)
  }
  // make majroor
  if (changeTo === kasra) {
    return str.replaceLast(doma, changeTo)
  }
  // Change Prep ending
  if (changeTo === fatha) {
    return str.replace(sukun, changeTo)
  }
}

let getdefiniteWord = (vocabget) => {
  rndWord = getrandomdata(vocabget)
  rndWordAr = rndWord.Ar
  alobj = al + rndWordAr.replace(/.$/, doma)

  // Add shadda to sun letters
  const position = 3
  let alobjshadornot = alobj
  letterAfterAl = alobj.charAt(2)
  if (!moonLetters.some((v) => letterAfterAl.includes(v))) {
    // console.log("Sun letter modification")
    alobjshadornot = [alobj.slice(0, position), shadda, alobj.slice(position)].join("")
  }
  alobj = alobjshadornot
}

let lesson3 = () => {
  getdefiniteWord()
  displaySection([rndWordAr, alobj])
}

let lesson1and2 = () => {
  thisis = thisthat("This")
  thatis = thisthat("That")
  thisandthat = thisis + and() + thatis
  what = starters.get("What")
  whatsthis = what + hatha + questionMark
  whatsthat = what + that + questionMark
  // whatsthisandthat =
  //   what +
  //   hatha +
  //   and() +
  //   what +
  //   that +
  //   questionMark
  who = starters.get("who") + " "
  whosthis = who + hatha + questionMark
  whosthat = who + that + questionMark
  whosthisandthat = who + hatha + and() + who + that + questionMark
  thisother = thisthat("This")
  thatother = thisthat("That")
  is = starters.get("is")

  let Qis = (statement) => {
    return is + statement + questionMark
  }
  isthis = Qis(thisis)
  isthat = Qis(thatis)
  let Ais = (istrue) => {
    if (istrue) {
      return yes + thisis
    } else {
      return no + thisother
    }
  }
  yesis = yes + fullstop
  yesisthis = Ais(true)
  noisthis = Ais(false)
  yesisthat = yes + thatis
  noisthat = no + thatother
  isthisandthat = is + " " + thisandthat + questionMark
  displaySection([thisis, thatis, thisandthat])
  displaySection([whatsthis, whatsthat]) //whatsthisandthat
  displaySection([whosthis, whosthat, whosthisandthat])
  displaySection([isthis, yesisthis, noisthis])
  displaySection([isthat, yesisthat, noisthat])
}

let thisthat = (starter) => {
  nounobj = getrandomdata("People")
  // console.log(nounobj)
  isM = nounobj.M
  nouneng = nounobj.En
  nounarb = nounobj.Ar
  f = isM ? "" : "f"
  start = starters.get(starter + f)
  // console.log(start)
  sent = start + " " + nounarb
  return sent
}

let and = () => {
  wa = starters.get("and")
  // console.lzog(wa)
  wa = " " + wa.replace(fatha, "")
  return wa
}
// continue after research
//

setTimeout(() => {
  createRandomSentence()
}, 1000)

// lessonsMenu = document.getElementById("lessonsMenu")
// let createMenu = () => {
//   let menuHeader = document.createElement("span")
//   menuHeader.innerText = "Lesson"
//   menuHeader.onclick = function () {
//     //
//   }
//   lessonsMenu.appendChild(menuHeader)
//   for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
//     let lsnNo = document.createElement("span")
//     lsnNo.innerHTML = lessonNo
//     lsnNo.classList.add("lessonmenuitem")
//     lsnNo.onclick = function () {
//       filterLesson(lessonNo)
//       // creates(lessonNo)
//       // style lesson itmes
//       lessnmenuitems = lessonsMenu.children
//       for (let i = 0; i < lessnmenuitems.length; i++) {
//         let itemmenu = lessnmenuitems[i]
//         itemmenu.style.removeProperty("background-color")
//       }
//       lsnNo.style.backgroundColor = "purple"
//     }
//     lessonsMenu.appendChild(lsnNo)
//   }
// }

// let filterLesson = (selectedNo) => {
//   result = book.filter((obj) => {
//     return obj.L === selectedNo
//   })
//   if (selectedNo == 1) {
//     console.log(selectedNo)
//     console.log(result[0].Ar + " " + result[1].Ar)
//   } else {
//     console.log("oops")
//   }
// }

// let creates = (lessonNo) => {

// }

document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    rndomnum = Math.floor(Math.random() * 4)
    createRandomSentence()
  } else if (event.key === "x") {
  }
})

// function swapKeysAndValues(obj) {
//   const swapped = Object.entries(obj).map(([key, value]) => [value, key])
//   return Object.fromEntries(swapped)
// }

function createElement(type, options = {}) {
  const element = document.createElement(type)
  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      element.classList.add(value)
      return
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue
      })
      return
    }

    if (key === "text") {
      element.textContent = value
      return
    }

    if (key === "id") {
      element.id = value
      return
    }
    element.setAttribute(key, value)
  })
  return element
}

String.prototype.removeTashkeel = function () {
  return this.replace(/[\u064B-\u0652]/gm, "")
}

// let removeharakat = (str) => {
//   return str
//     .replaceAll(fatha, "")
//     .replaceAll(doma, "")
//     .replaceAll(kasra, "")
//     .replaceAll(fatha2, "")
//     .replaceAll(doma2, "")
//     .replaceAll(kasra2, "")
//     .replaceAll(sukun, "")
//     .replaceAll(shadda, "")
// }

//
//
//
//
//
//
//
//
//
//

let textHighlighter = (el) => {
  var str5 = el.innerHTML
  var reg = /red|blue|فِ|هذا/gi //g is to replace all occurances

  var toStr5 = String(reg)
  var color = toStr5.replace("/g", "|").substring(1)

  var colors = color.split("|")

  if (colors.indexOf("red") > -1) {
    str5 = str5.replace(/red/g, '<span style="color:red;">red</span>')
  }

  if (colors.indexOf("blue") > -1) {
    str5 = str5.replace(/blue/g, '<span style="color:blue;">blue</span>')
  }

  if (colors.indexOf("فِ") > -1) {
    str5 = str5.replace(/فِ/g, '<span style="color:green;">فِ</span>')
  }

  if (colors.indexOf("هذا") > -1) {
    str5 = str5.replace(/هذا/g, '<span style="color:orange;">هذا</span>')
  }
  el.innerHTML = str5
}

function highlight(el, text) {
  var innerHTML = el.innerHTML
  var index = innerHTML.indexOf(text)
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + text.length) +
      "</span>" +
      innerHTML.substring(index + text.length)
    el.innerHTML = innerHTML
  }
}

function bodyHighlighter() {
  var str5 = document.body.innerHTML
  var reg = /red|َ|فِ|هذا/gi //g is to replace all occurances

  var toStr5 = String(reg)
  var color = toStr5.replace("/g", "|").substring(1)

  var colors = color.split("|")

  // if (colors.indexOf(fatha) > -1) {
  str5 = str5.replace(/َ/g, '<span style="color:red;">&ZeroWidthSpace;\u064e</span>')
  // }

  document.body.innerHTML = str5
}
//
//
//
//
//
//
//
//
//
//
//
//
//

// self executing function here / same as jquery document ready
;(function () {
  if (localStorage.getItem("book1data") === null) {
    console.log("Retrieving data")
    getVocab()
  } else {
    // console.log("using localstorage")
    book = JSON.parse(localStorage.getItem("book1data"))
  }

  // getVocab()
})()
