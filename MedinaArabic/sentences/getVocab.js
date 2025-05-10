let book = JSON.parse(localStorage.getItem('book1data'))

let getType = (type) => {
  let newArrbook = book.filter(function (el) {
    return el.T === type
  })
  return newArrbook
}

let getGender = (ismale) => {
  let newArrbook = book.filter(function (el) {
    return el.M === ismale
  })
  return newArrbook
}

export let getMatch = (searchstr) => {
  let newArrbook = book.filter(function (el) {
    return el.En == searchstr
  })
  console.log(newArrbook)
  return newArrbook
}

let getRandomVocab = (type = 'NounObj', maxVocab = 1) => {
  // let ismale = gender === "M" ? true : false
  let filtered = getType(type)
  console.log('ststr')
  console.log(filtered)
  let TypevocabArr = []
  let vocabObj
  for (let s = 0; s < maxVocab; s++) {
    let randomID = Math.floor(Math.random() * filtered.length)
    vocabObj = filtered[randomID]
    TypevocabArr.push(vocabObj)
  }
  if (maxVocab > 1) {
    return TypevocabArr //
  } else {
    return vocabObj
  }

  // console.log(vocabObj)
}

export let getGenderVocab = (isMale = true) => {
  let filtered = getGender(isMale)
  let vocabObj
  let randomID = Math.floor(Math.random() * filtered.length)
  vocabObj = filtered[randomID]
  return vocabObj
}

let al = '\u0627\u0644'
let doma = '\u064f'
let moonLetters = ['ه', 'ي', 'و', 'م', 'ك', 'ق', 'ف', 'غ', 'ع', 'خ', 'ح', 'ج', 'ب', 'أ', 'إ']
let shadda = '\u0651'

export let getdefiniteWord = (vocabget) => {
  let rndWord = getRandomVocab(vocabget)
  let alobj = al + rndWord.Ar.replace(/.$/, doma)
  // Add shadda to sun letters
  const position = 3
  let alobjshadornot = alobj
  let letterAfterAl = alobj.charAt(2)
  if (!moonLetters.some((v) => letterAfterAl.includes(v))) {
    // console.log("Sun letter modification")
    alobjshadornot = [alobj.slice(0, position), shadda, alobj.slice(position)].join('')
  }
  alobj = alobjshadornot
  console.log(alobj)
  return alobj
}

export default getRandomVocab
