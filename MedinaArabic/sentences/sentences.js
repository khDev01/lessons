// Abreviations: sentence as s, and as wa, question as Q, answer as A, this as hatha
// Note: Arabic grammar: single letter words before a word join with next word (no space )
// TODO:
//
import getData from './getdata.js'
import getRandomVocab, { getMatch, getdefiniteWord, getGenderVocab } from './getVocab.js'
import displaySection from './display.js'
import newHighlighter from './highlighter.js'
// const urlbook = "./sentence.json"
let sContainer = document.getElementById('sentenceContainer')
// let result, book, booklength //objects
let keysArr = [],
  vocabArr = []

let moonLetters = ['ه', 'ي', 'و', 'م', 'ك', 'ق', 'ف', 'غ', 'ع', 'خ', 'ح', 'ج', 'ب', 'أ', 'إ']
let starterArr = [
  ['This', '\u0647\u064e\u0640\u0630\u064e\u0627'],
  ['That', '\u0630\u064e\u0644\u0650\u0643\u064e'],
  ['What', '\u0645\u064e\u0627 '],
  ['and', '\u0648\u064e'],
  ['is', 'أ'],
  ['yes', 'نعم'],
  ['no', 'لا'],
  ['who', '\u0645\u064e\u0646\u0652'],
  ['where', '\u0623\u064e\u064a\u0652\u0646\u064e'],
  // ["is", "أ"],
  // ["Thisf", "\u0647\u064e\u0640\u0670\u0630\u0650\u0647\u0650"],
  ['Thisf', '\u0647\u064e\u0640\u0630\u0650\u0647\u0650'],
  ['Thatf', '\u062a\u0650\u0644\u0652\u0643\u064e']
  // ["is", "أ"],
]
// // Create a Map
const starters = new Map(starterArr)

let alif = 'ا'
let fatha = '\u064e'
let kesra = '\u0650'
let doma = '\u064f'
let fatha2 = '\u064b'
let kesra2 = '\u064d'
let doma2 = '\u064c'
let shadda = '\u0651'
let sukun = '\u0652'
let spaceJoin = '\u0640'
let alifsmall = '\u0670'
let questionMark = '\u061f'
let comma = '\u060c '
let dateSeperator = '\u060d'
let semicolon = '\u061b'
let trippledot = '\ufbb3 \ufbb3 \ufbb3'
let fullstop = '\u06d4'
let Allah = '\ufdf2'
let akbar = '\ufdf3'
let Muhammad = '\ufdf4'
let rasool = '\ufdf6'
let salalahual = '\ufdfa'
let reyal = '\ufdfc'
let bism = '\ufdfd'
let yes = starters.get('yes') + comma
let no = starters.get('no') + comma
let al = '\u0627\u0644'
let fe = '\u0641\u0650\u064a'
let on = '\u0639\u064e\u0644\u064e\u0649'
let to = '\u0625\u0650\u0644\u064e\u0649'
let from = '\u0645\u0650\u0646\u0652'
let he = '\u0647\u064f\u0648\u064e'
let she = '\u0647\u0650\u064a\u064e'
let tanween = [fatha2, doma2, kesra2] // tanween is only found at then end of nouns
let yaa = '\u064a\u0627'
let hatha = starters.get('This')
let that = starters.get('That')
const textColors = {
  [fatha]: 'red',
  [doma]: 'green',
  [kesra]: 'blue',
  [questionMark]: 'yellow'
}
let and = () => {
  let wa = starters.get('and')
  // console.lzog(wa)
  wa = ' ' + wa.replace(fatha, '')
  return wa
}
let what = starters.get('What')
let whatsthis = what + hatha + questionMark
let whatsthat = what + that + questionMark
// let whatsthisandthat = what + hatha + and() + what + that + questionMark
let who = starters.get('who') + ' '
let whosthis = who + hatha + questionMark
let whosthat = who + that + questionMark
let whosthisandthat = who + hatha + and() + who + that + questionMark
let is = starters.get('is')
// Turn statement to question with Hamza
let Qis = (statement) => {
  return is + statement + questionMark
}

let yesis = yes + fullstop

let VocabNouns = getRandomVocab('nbody', 15)
let randomNoun = () => VocabNouns[Math.floor(Math.random() * VocabNouns.length)]

String.prototype.replaceLast = function (char, replacement) {
  return this.split(' ').reverse().join(' ').replace(new RegExp(char), replacement).split(' ').reverse().join(' ')
}
String.prototype.al = function () {
  return al + this.replaceLast(doma2, doma)
}
String.prototype.o = function () {
  return yaa + ' ' + this.replaceLast(doma2, doma)
}
// remove 3vowel tashkeel +shadda and skoon
// String.prototype.removeTashkeel = function () {
// return this.replace(/[\u064B-\u0652]/gm, "")
// }
String.prototype.removeTashkeel = function () {
  return this.replace(/[\u064B-\u0652]/gm, '')
}

// String.prototype.changeHarakat = function (caseEnging) {
//   switch (caseEnging) {
//     case "majroor":
//       break
//     case "mansoob":
//       break
//     case "marfoo":
//       break

//     default:
//       break
//   }
// }

let myand = ' and '
let mystarters1 = 'string1'
let mystarters2 = 'string2'
console.log(mystarters1 + myand + mystarters2)

let createSentence = () => {
  lesson1and2()
  // lesson3() //todo add adjs
  // lesson4() //todo make sentences correcty with prep
  // bodyHighlighter()
  // newHighlighter("ه", "purple")
  // for (const [key, value] of Object.entries(textColors)) {
  //   newHighlighter(key, value)
  // }
  // lesson5()
  // lesson18dual()
}

let makedual = (vocab) => {
  let End2Noalif = 'نِ'
  let End2wfatha = 'َانِ'
  let dualvocab // = vocab + dualEnding
  let lastChar = vocab.charAt(vocab.length - 1)
  if (/[\u064B-\u0652]/.test(lastChar)) dualvocab = vocab.slice(0, -1) + End2wfatha
  else if (lastChar === alif) dualvocab = vocab + End2Noalif
  else dualvocab = vocab + 'madeDual'
  // let changeEnding = vocab.replace(/.$/, "")
  return dualvocab
}

let Questions = () => {}
let lesson18dual = () => {
  let rndWord = randomNoun()
  let single = rndWord.Ar
  let dual = makedual(rndWord.Ar)

  let one = getMatch('one')
  // console.log(one[0])
  single = single + one.Ar

  displaySection([single, dual])
}

// lesson 5 possesion
let lesson5 = () => {
  let rndword = getRandomVocab('People')
  let possessive = possess(randomNoun().Ar, rndword.Ar)
  let caller = rndword.Ar.o()
  displaySection([possessive.removeTashkeel(), caller])
}

// Possess
let possess = (possession, possessor) => {
  return mudaf(possession) + ' ' + mudafIlaih(possessor)
}
// Possession
let mudaf = (str) => {
  return changeharakat(str, doma)
}
// Possessor
let mudafIlaih = (str) => {
  return changeharakat(str, 'majroor')
}

let lesson4 = () => {
  let rndWord = getdefiniteWord()
  let getSpecificNoun = (prep, getNewWord) => {
    if (getNewWord) {
      if (prep === fe) {
        rndWord = getdefiniteWord('Place')
        // console.log("Place" + rndWord.Ar)
      }
      // if (prep === fe) {
      //   console.log("Place")
      //   getdefiniteWord("Place")
      // }
      else {
        // console.log("new word")
        rndWord = getdefiniteWord()
      }
    }
    let majobj = changeharakat(rndWord.Ar.al(), 'majroor')
    // meeting of two skoons between words
    if (prep == '\u0645\u0650\u0646\u0652') {
      console.log(prep)
      prep = changeharakat(prep, fatha)
      console.log(prep)
      return prep + ' ' + majobj
    }
    return prep + ' ' + majobj
  }
  let objin = getSpecificNoun(fe),
    objon = getSpecificNoun(on, true),
    objfrom = getSpecificNoun(from),
    objto = getSpecificNoun(to),
    where = starters.get('where')
  let wheres = where + ' ' + rndWord.Ar.al() + questionMark
  let rndWordpronoun = rndWord.M ? he : she
  let whereAns = rndWordpronoun + ' ' + getSpecificNoun(on, true)

  let person = getRandomVocab('Name'),
    personPronoun = person.M ? he : she,
    wheresPerson = where + ' ' + person.Ar + questionMark,
    wheresPersonAns = personPronoun + ' ' + getSpecificNoun(fe, true)

  displaySection([objin, objon, objto, objfrom])
  // displaySection([wheres, whereAns])
  displaySection([wheresPerson, wheresPersonAns])
}

let changeharakat = (str, changeTo = 'majroor') => {
  // console.log(str)
  // make majroor
  if (tanween.some((haraka) => str.at(-1).includes(haraka))) {
    if (changeTo === 'majroor') {
      return str.replace(/.$/, kesra2)
    }
  }
  if (changeTo === 'majroor') {
    return str.replaceLast(doma, kesra)
  }

  // make definite
  if (changeTo === doma) {
    return str.replaceLast(doma2, changeTo)
  }

  // Change Prep ending
  if (changeTo === fatha) {
    return str.replace(sukun, changeTo)
  }
}

// Add shadda to sun letters
let addShadda = (word) => {
  const position = 3
  let letterAfterAl = word.charAt(2)
  if (!moonLetters.some((v) => letterAfterAl.includes(v))) {
    return [word.slice(0, position), shadda, word.slice(position)].join('')
  }
  return word
}

let makeDefinite = (word, shadda = true) => {
  theNoun = al + word.replace(/.$/, doma)
  return addShadda(theNoun)
}

let lesson3 = () => {
  // let mytestvocab = getGenderVocab()
  // displaySection([1, mytestvocab.Ar, mytestvocab.M])

  let L3vocab = getRandomVocab()
  console.log(L3vocab)
  let definiteNoun = L3vocab.Ar.al()
  let definiteWshada = addShadda(definiteNoun)
  let f = L3vocab.M ? '' : 'f'
  let start = starters.get('This' + f)
  let completeSent = start + ' ' + L3vocab.Ar
  let NotCompleteSent = start + ' ' + definiteNoun + ' ' + trippledot
  displaySection([L3vocab.Ar, definiteNoun, completeSent, NotCompleteSent, definiteWshada])
}

let lesson1and2 = () => {
  let thisis = ismIsharat('This')
  let thatis = ismIsharat('That')
  let thisandthat = thisis + and() + thatis
  let thisother = ismIsharat('This')
  let thatother = ismIsharat('That')
  let isthis = Qis(thisis)
  let isthat = Qis(thatis)
  // yes/no answer
  let Ais = (istrue) => {
    if (istrue) {
      return yes + thisis
    } else {
      return no + thisother
    }
  }
  let yesisthis = Ais(true)
  let noisthis = Ais(false)
  let yesisthat = yes + thatis
  let noisthat = no + thatother
  let isthisandthat = is + ' ' + thisandthat + questionMark
  displaySection([thisis, thatis, thisandthat])
  displaySection([whatsthis, whatsthat]) //whatsthisandthat
  displaySection([whosthis, whosthat, whosthisandthat])
  displaySection([isthis, yesisthis, noisthis])
  displaySection([isthat, yesisthat, noisthat])
}

// ismIsharat
let ismIsharat = (starter) => {
  let nounobj = randomNoun()
  let isMasculine = nounobj.M
  let nouneng = nounobj.En
  let nounarb = nounobj.Ar
  let f = isMasculine ? '' : 'f'
  let start = starters.get(starter + f)
  // console.log(start)
  let sent = start + ' ' + nounarb
  return sent
}

let getIsmIsharat = (word, starter = 'this') => {
  let isMasculine = word.M
  let f = isMasculine ? '' : 'f'
  let start = starters.get(starter + f)
  return start // ...randomise starter
}

document.addEventListener('keypress', function onPress(event) {
  if (event.key === 'z') {
    // let rndomnum = Math.floor(Math.random() * 4)
    createSentence()
  } else if (event.key === 'x') {
    console.log('hey')
    // bodyHighlighter()
    newHighlighter('أَ', 'red')
  }
})

// self executing function / same as jquery document ready
;(function () {
  if (localStorage.getItem('book1data') === null) {
    console.log('Retrieving data')
    localStorage.clear()
    getData()
    setTimeout(() => {
      createSentence()
    }, 1000)
    // book = JSON.parse(localStorage.getItem("book1data"))
  } else {
    console.log('loading data')
    createSentence()
    // console.log("localstorage")
    // console.log(JSON.parse(localStorage.getItem("book1data")))

    // book = JSON.parse(localStorage.getItem("book1data"))
  }
  // getData()
})()
