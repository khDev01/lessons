// Abreviations: sentence as s, and as wa, question as Q, answer as A, this as hatha
// Note: single letter words join with next word (no space )
// TODO: use indefinite tense of word to add shadda to alobj?
// TODO: Seperate out into each lesson;
// const urlbook = "./sentence.json"
const book1json = "../book1Complete.json"
const nounobjects = "../data/obj.json"
let sContainer = document.getElementById("sentenceContainer")
let result, book, booklength //objects
let keysArr = []
// get lesson vocab from json file
let getVocab = () => {
  fetch(nounobjects)
    .then((response) => response.json()) // return json object
    .then((data) => {
      for (const key in data) {
        keysArr.push(key)
      }
      // console.log(keysArr)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
  fetch(book1json)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book = data
      booklength = data.length
      let newArr = book
      keysArr.forEach((el) => {
        console.log(el)
        newArr = newArr.map((obj) => {
          if (obj.En === el) {
            console.log(obj.En)
            return { ...obj, T: "NounObj" }
          }
          return obj
        })
      })
      // console.log(keysArr)

      console.log(newArr)
      // keysArr.forEach((element) => {
      //   console.log(keysArr.length)
      // })

      // book.forEach((element) => {
      //   console.log(element.En)
      // })
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

let moonLetters = ["ه", "ي", "و", "م", "ك", "ق", "ف", "غ", "ع", "خ", "ح", "ج", "ب", "أ", "إ"]
let starterArr = [
  ["This", "\u0647\u0630\u0627"],
  ["That", "\u0630\u0644\u0643"],
  ["What", "\u0645\u064e\u0627 "],
  ["and", "\u0648\u064e"],
  ["is", "أ"],
  ["yes", "نعم"],
  ["no", "لا"],
  ["who", "\u0645\u064e\u0646\u0652"],
  ["where", "\u0623\u064e\u064a\u0652\u0646\u064e"],
  // ["is", "أ"],
  // ["is", "أ"],
  ["Thisf", "\u0647\u064e\u0640\u0670\u0630\u0650\u0647\u0650"],
  ["Thatf", "\u062a\u0650\u0644\u0652\u0643\u064e"],
  // ["is", "أ"],
  // ["is", "أ"],
]
// remove instances within string
// let strin = randomProperty(objects)[1]
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
doma2 = "\u064c"
doma2 = "\u064c"
doma2 = "\u064c"
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

var randomProperty = function (obj) {
  bookrnd = Math.floor(Math.random() * booklength)
  bookvocab = obj[bookrnd]
  return bookvocab
}

let getrndvocab = () => {
  return randomProperty(book)
}

let display = (sentence) => {
  let para = document.createElement("p")
  para.innerHTML = sentence
  document.body.appendChild(para)
  // console.log(sentence)
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

let createRandomSentence = () => {
  thisAndThat()

  lesson3()

  let majroor = (prep) => {
    majobj = al + objforal.replaceLast(doma, kasra)
    if (prep == "\u0645\u0650\u0646\u0652") {
      prep = prep.replace(sukun, fatha)
      return prep + " " + majobj
    }
    return prep + " " + majobj
  }
  objin = majroor(fe)
  objon = majroor(on)
  objfrom = majroor(from)
  objto = majroor(to)

  where = starters.get("where")
  wheres = where + " " + alobj + questionMark
  rndWordpronoun = rndWord.M ? he : she
  whereAns = rndWordpronoun + " " + majroor(on)
  var a = alobj
  var b = shadda
  var position = 3
  let alobjshadornot = alobj

  letterAfterAl = a.charAt(2)
  if (!moonLetters.some((v) => letterAfterAl.includes(v))) {
    alobjshadornot = [a.slice(0, position), b, a.slice(position)].join("")
  }

  // let whereis = () => {
  //   wheres = where + " " + alobj + questionMark
  // }

  displaySection([thisis, thatis, thisandthat])

  displaySection([whatsthis, whatsthat]) //whatsthisandthat

  displaySection([whosthis, whosthat, whosthisandthat])

  displaySection([isthis, yesisthis, noisthis])
  displaySection([isthat, yesisthat, noisthat])

  // display("Lesson 3")
  // linebreak()
  // display(rndWordAr)
  // display(alobj)
  // linebreak()
  // display(objin)
  // display(objon)
  // display(objto)
  // display(objfrom)

  // linebreak()
  // display(wheres)
  // display(whereAns)
  // linebreak()
  // display(alobjshadornot)
}

let lesson3 = () => {
  rndWord = getrndvocab()
  rndWordAr = rndWord.Ar
  alobj = al + rndWordAr.replaceLast(doma2, doma)
  objforal = rndWordAr.replaceLast(doma2, doma)
}

let thisAndThat = () => {
  hatha = starters.get("This")
  that = starters.get("That")
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
}
let removeharakat = (str) => {
  return str
    .replaceAll(fatha, "")
    .replaceAll(doma, "")
    .replaceAll(kasra, "")
    .replaceAll(fatha2, "")
    .replaceAll(doma2, "")
    .replaceAll(kasra2, "")
    .replaceAll(sukun, "")
    .replaceAll(shadda, "")
}
let thisthat = (starter) => {
  nounobj = randomProperty(book)
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
  // console.log(objects)
  // createRandomSentence()
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
    console.log(Math.floor(Math.random() * 4))
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

    element.setAttribute(key, value)
  })
  return element
}

// self executing function here / same as jquery document ready
;(function () {
  getVocab()
})()

//"No", "Ar": "\u0644\u0627"

//"Yes","Ar": "\u0646\u064e\u0639\u064e\u0645\u0652"
