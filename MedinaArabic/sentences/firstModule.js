function toUnicode(str) {
  return str
    .split("")
    .map(function (value, index, array) {
      var temp = value.charCodeAt(0).toString(16).toUpperCase()
      if (temp.length > 2) {
        return "\\u" + temp
      }
      return value
    })
    .join("")
}

// remove instances within string
// let strin = getRandomVocab(objects)[1]
//   strin = strin.replaceAll("\u064e", "")

export default moonLetters
