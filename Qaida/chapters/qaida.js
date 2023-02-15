let alphabetAr = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "و",
  "ه",
  "ء",
  "ي",
  "ى",
]
let letters = alphabetAr.slice(1)

let fatha = "\u064e",
  kasra = "\u0650",
  doma = "\u064f",
  fatha2 = "\u064b",
  kasra2 = "\u064d",
  doma2 = "\u064c",
  shadda = "\u0651",
  sukun = "\u0652",
  sagiraAlif = "\u0670",
  sagiraWow = "\u064c",
  sagiraYa = "\u061C"

let addTashkil = (tashkeel) => {
  if (tashkeel === fatha2) {
    return letters.slice(0, -1).map((x) => x + tashkeel + alphabetAr[0])
  }
  return letters.map((x) => x + tashkeel)
}

let fathas = addTashkil(fatha)
let kasras = addTashkil(fatha)
let domas = addTashkil(fatha)
let fathas2 = addTashkil(fatha2)
let kasras2 = addTashkil(kasra2)
let domas2 = addTashkil(doma2)

console.log(fathas2)
