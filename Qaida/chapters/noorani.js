const container = document.getElementById("chapterContainer")

letters = [
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

alif = "ا"
ba = "ب"
ta = "ت"
tha = "ث"
jeem = "ج"
ha = "ح"
kha = "خ"
dal = "د"
dhal = "ذ"
ra = "ر"
za = "ز"
seen = "س"
sheen = "ش"
sad = "ص"
daad = "ض"
da = "ط"
dha = "ظ"
ain = "ع"
gain = "غ"
fa = "ف"
qaf = "ق"
kaf = "ك"
lam = "ل"
mim = "م"
nun = "ن"
wow = "و"
he = "ه"
hamza = "ء"
ya = "ي"
alifMaksura = "ى"

lettersForm = {
  alif: ["ﺍ", "ا", "ﺎ"],
  ba: ["ب", "ﺏ", "ﺐ", "ﺒ", "ﺑ"],
  ta: ["ت", "ﺕ", "ﺖ", "ﺘ", "ﺗ"],
  tha: ["ث", "ﺙ", "ﺚ", "ﺜ", "ﺛ"],
  jeem: ["ج", "ﺝ", "ﺞ", "ﺠ", "ﺟ"],
  ha: ["ح", "ﺡ", "ﺢ", "ﺤ", "ﺣ"],
  kha: ["خ", "ﺥ", "ﺦ", "ﺨ", "ﺧ"],
  dal: ["د", "ﺩ", "ﺪ"],
  dhal: ["ذ", "ﺫ", "ﺬ"],
  ra: ["ر", "ﺭ", "ﺮ"],
  za: ["ز", "ﺯ", "ﺰ"],
  seen: ["س", "ﺱ", "ﺲ", "ﺴ", "ﺳ"],
  sheen: ["ش", "ﺵ", "ﺶ", "ﺸ", "ﺷ"],
  saad: ["ص", "ﺹ", "ﺺ", "ﺼ", "ﺻ"],
  daad: ["ض", "ﺽ", "ﺾ", "ﻀ", "ﺿ"],
  da: ["ط", "ﻁ", "ﻂ", "ﻄ", "ﻃ"],
  dha: ["ظ", "ﻅ", "ﻆ", "ﻈ", "ﻇ"],
  ain: ["ع", "ﻉ", "ﻊ", "ﻌ", "ﻋ"],
  gain: ["غ", "ﻍ", "ﻎ", "ﻐ", "ﻏ"],
  fa: ["ف", "ﻑ", "ﻒ", "ﻔ", "ﻓ"],
  qaf: ["ق", "ﻕ", "ﻖ", "ﻘ", "ﻗ"],
  kaf: ["ك", "ﻙ", "ﻚ", "ﻜ", "ﻛ"],
  lam: ["ل", "ﻝ", "ﻞ", "ﻠ", "ﻟ"],
  mim: ["م", "ﻡ", "ﻢ", "ﻤ", "ﻣ"],
  nun: ["ن", "ﻥ", "ﻦ", "ﻨ", "ﻧ"],
  he: ["ه", "ﻩ", "ﻪ", "ﻬ", "ﻫ"],
  wow: ["و", "ﻭ", "ﻮ"],
  hamza: ["ﺀ", "ﺃ", "ﺄ", "ﺅ", "ﺆ", "ﺉ", "ﺋ", "ﺌ", "ﺊ", "ﺇ", "ﺈ"],
  ya: ["ي", "ﻱ", "ﻲ", "ﻴ", "ﻳ"],
  alifmad: ["آ", "ﺁ", "ﺂ"],
  taMarbuta: ["ة", "ﺓ", "ﺔ"],
  alifMaksura: ["ى", "ﻯ", "ﻰ"],
  lamalif: ["ﻵ", "ﻶ", "ﻻ", "ﻼ"],
  lamhamza: ["ﻵ", "ﻸ", "ﻹ", "ﻺ"],
}
l = lettersForm
hmzawasl = "ٱ"
fatha = "\u064e"
kasra = "\u0650"
doma = "\u064f"
fatha2 = "\u064b"
kasra2 = "\u064d"
doma2 = "\u064c"
shadda = "\u0651"
sukun = "\u0652"
sagiraAlif = "\u0670"
sagiraWow = "\u064c"
sagiraYa = "\u061C"
letterMark = "\u061C"
spaceJoin = "\u0640"
mad = "\u0653"
isol = 1
inni = 0
end = 2
middle = 3
begining = 4

let alphabet = () => {
  letters.forEach((letter) => {
    // console.log(letter)
    item = createElement("p", { class: "item" })
    item.innerHTML = letter
    container.append(item)
  })
}

let randomletter = letters[Math.floor(Math.random() * letters.length)]

let noAlifletters = letters.slice(1).splice(-1)

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))
//     ;[array[i], array[j]] = [array[j], array[i]]
//   }
// }
// shuffleArray(randomisedletters)

lamMad = lam + mad
mimMad = mim + mad
seenMad = seen + mad
sadMad = sad + mad
alamMad = alif + lamMad
alm = alamMad + mimMad
almS = alm + sadMad
alr = alamMad + ra
almr = alm + ra
khyas = kaf + mad + he + ya + ain + mad + sad + mad
dh = da + he
dsm = da + seenMad + mimMad
ds = da + seenMad
ys = ya + seenMad
sadMad = sadMad

let alphabetHarakat = () => {
  noAlifletters.forEach((letter) => {
    fathalets = letter + fatha
    item = createElement("p", { class: "item" })
    item.innerHTML = fathalets
    container.append(item)
  })
}

let alphabetSagira = () => {
  noAlifletters.forEach((letter) => {
    fathalets = letter + sagiraAlif
    item = createElement("p", { class: "item" })
    item.innerHTML = fathalets
    container.append(item)
  })
}

let alphabetHarakatx2 = () => {
  noAlifletters.forEach((letter) => {
    fathalets = letter + fatha + alif
    item = createElement("p", { class: "item" })
    item.innerHTML = fathalets
    container.append(item)
  })
}

let alphabetSukun = () => {
  noAlifletters.forEach((letter) => {
    randomletter = letters[Math.floor(Math.random() * letters.length)]
    fathalets = letter + fatha + randomletter + sukun
    item = createElement("p", { class: "item" })
    item.innerHTML = fathalets
    container.append(item)
  })
}

// alphabetSukun()

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

for (let i = 1; i < 315; i++) {
  fathalets = String.fromCharCode(0xfc00 + i)
  if (!(i >= 94 && i <= 99)) {
    item = createElement("p", { class: "item" })
    item.innerHTML = fathalets
    container.append(item)
  }
}
