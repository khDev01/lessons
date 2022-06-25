// Abreviations: sentence as s, and as wa, question as Q, answer as A, this as hatha
// Note: single letter words join with next word (no space )
const urlbook = "./sentence.json"
const objectsjson = "../data/obj.json"
let sContainer = document.getElementById("sentenceContainer")
let result, book, objects
// const starters = { This: "\u0647\u064e\u0640\u0670\u0630\u064e\u0627" }
let starterArr = [
  // ["This", "\u0647\u0630\u0627"],˙
  ["This", "\u0647\u0630\u0627"],
  ["That", "\u0630\u0644\u0643"],
  ["What", "\u0645\u064e\u0627 "],
  // ["What", "\u0645\u064e\u0627"],
  // [
  //   "What is that?",
  //   "\u0645\u064e\u0627 \u0630\u064e\u0644\u0650\u0643\u064e\u061f",
  // ],
  ["and", "\u0648\u064e"],
  ["is", "أ"],
  ["yes", "نعم"],
  ["no", "لا"],
  ["who", "\u0645\u064e\u0646\u0652"],
  // ["is", "أ"],
  // ["is", "أ"],
  // ["is", "أ"],
  // ["is", "أ"],
  // ["is", "أ"],
]
// remove instances within string
// let strin = randomProperty(objects)[1]
//   strin = strin.replaceAll("\u064e", "")

// // Create a Map
const starters = new Map(starterArr)
// console.log(starters)

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
al = "\u0627\u064e\u0644\u0652"
fe = "\u0641\u0650\u064a"
on = "\u0639\u064e\u0644\u064e\u0649\u0670"
to = "\u0625\u0650\u0644\u064e\u0649\u0670"
from = "\u0645\u0650\u0646\u0652"

String.prototype.replaceLast = function (what, replacement) {
  return this.split(" ")
    .reverse()
    .join(" ")
    .replace(new RegExp(what), replacement)
    .split(" ")
    .reverse()
    .join(" ")
}

let createRandomSentence = () => {
  let display = (sentence) => {
    let para = document.createElement("p")
    para.innerHTML = sentence
    document.body.appendChild(para)
    // console.log(sentence)
  }
  let linebreak = () => {
    let div = document.createElement("div")
    document.body.appendChild(div)
    // console.log(sentence)
  }

  let getrndvocab = () => {
    return randomProperty(objects)[1]
  }

  // thissentence()
  // thatsentence()
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

  rndobj1 = getrndvocab()
  alobj = al + rndobj1.replaceLast(doma2, doma)

  let majroor = (prep) => {
    return prep + " " + alobj
  }
  objin = majroor(fe)
  objon = majroor(on)
  objfrom = majroor(from)
  objto = majroor(to)
  // display(thisis)
  // display(thatis)
  // display(thisandthat)
  // linebreak()

  // display(whatsthis)
  // display(whatsthat)
  // // display(whatsthisandthat)
  // linebreak()

  // display(whosthis)
  // display(whosthat)
  // display(whosthisandthat)
  // linebreak()

  // display(isthis)
  // display(yesisthis)
  // display(noisthis)
  // linebreak()

  // display(isthat)
  // display(yesisthat)
  // display(noisthat)
  linebreak()
  display(rndobj1)
  display(alobj)
  linebreak()
}

// let thissentence = () => {
//   thisis = hatha
//   nounobj1 = randomProperty(objects)
//   // console.log(nounobj1)
//   nouneng1 = nounobj1[0]
//   nounarb1 = nounobj1[1]
//   console.log(thisis + " " + nounarb1)
// }

// let thatsentence = () => {
//   thatis = that
//   nounobj2 = randomProperty(objects)
//   // console.log(nounobj2)
//   nouneng2 = nounobj2[0]
//   nounarb2 = nounobj2[1]
//   console.log(thatis + " " + nounarb2)
// }
rndomnum = Math.floor(Math.random() * 2)

let thisthat = (starter) => {
  start = starters.get(starter)
  nounobj = randomProperty(objects)
  // console.log(nounobj2)
  nouneng = nounobj[0]
  nounarb = nounobj[1]
  // nounarb = nounarb
  //   .replaceAll(fatha, "")
  //   .replaceAll(doma, "")
  //   .replaceAll(kasra, "")
  //   .replaceAll(fatha2, "")
  //   .replaceAll(doma2, "")
  //   .replaceAll(kasra2, "")
  //   .replaceAll(sukun, "")
  //   .replaceAll(shadda, "")

  switch (rndomnum) {
    case 1:
      // console.log("case1")
      // nounarb = nounarb
      //   .replaceAll(fatha, "")
      //   .replaceAll(doma, "")
      //   .replaceAll(kasra, "")
      //   .replaceAll(fatha2, "")
      //   .replaceAll(doma2, "")
      //   .replaceAll(kasra2, "")
      //   .replaceAll(sukun, "")
      //   .replaceAll(shadda, "")

      const myStr = nounarb
      // console.log(myStr)
      const lastIndex = myStr.lastIndexOf(doma2)
      const replacement = doma
      const replaced =
        myStr.substring(0, lastIndex) +
        replacement +
        myStr.substring(lastIndex + 1)
      // console.log(replaced)
      break

    case 2:
      // console.log("case2")
      nounarb = nounarb.replaceLast(doma2, doma)

      break
    default:
      // console.log("defuala")
      break
  }

  sent = start + " " + nounarb
  // console.log(sent)
  // wa = starters.get("and")
  // console.log(start + " " + nounarb2 + " " + wa)
  // sent2 = start + " " + nounarb2 + " " + and() +

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

// get lesson vocab from json file
let getVocab = () => {
  fetch(objectsjson)
    .then((response) => response.json()) // return json object
    .then((data) => {
      objects = data
      // console.log(objects)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}
var randomProperty = function (obj) {
  let keys = Object.keys(obj)
  randomize = Math.floor(keys.length * Math.random())
  objectKey = keys[randomize]
  objectValue = obj[keys[randomize]]
  object = [objectKey, objectValue] // [] allows key to be variable
  return object
}

setTimeout(() => {
  // console.log(objects)
  createRandomSentence()
}, 1000)

lessonsMenu = document.getElementById("lessonsMenu")
let createMenu = () => {
  let menuHeader = document.createElement("span")
  menuHeader.innerText = "Lesson"
  menuHeader.onclick = function () {
    //
  }
  lessonsMenu.appendChild(menuHeader)
  for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
    let lsnNo = document.createElement("span")
    lsnNo.innerHTML = lessonNo
    lsnNo.classList.add("lessonmenuitem")
    lsnNo.onclick = function () {
      filterLesson(lessonNo)
      // creates(lessonNo)
      // style lesson itmes
      lessnmenuitems = lessonsMenu.children
      for (let i = 0; i < lessnmenuitems.length; i++) {
        let itemmenu = lessnmenuitems[i]
        itemmenu.style.removeProperty("background-color")
      }
      lsnNo.style.backgroundColor = "purple"
    }
    lessonsMenu.appendChild(lsnNo)
  }
}

let filterLesson = (selectedNo) => {
  result = book.filter((obj) => {
    return obj.L === selectedNo
  })
  if (selectedNo == 1) {
    console.log(selectedNo)
    console.log(result[0].Ar + " " + result[1].Ar)
  } else {
    console.log("oops")
  }
}

// let creates = (lessonNo) => {

// }

document.addEventListener("keypress", function onPress(event) {
  if (event.key === "z") {
    rndomnum = Math.floor(Math.random() * 4)
    createRandomSentence()
  } else if (event.key === "x") {
    console.log(algoarray)
  }
})

function swapKeysAndValues(obj) {
  const swapped = Object.entries(obj).map(([key, value]) => [value, key])
  return Object.fromEntries(swapped)
}

// self executing function here / same as jquery document ready
;(function () {
  getVocab()
})()

//"No", "Ar": "\u0644\u0627"

//"Yes","Ar": "\u0646\u064e\u0639\u064e\u0645\u0652"
