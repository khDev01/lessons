import createMenu from "./quizmenu.js"
let book

let getVocab = (bookjson, totalVocab, setNextQuestion) => {
  fetch(bookjson)
    .then((response) => response.json()) // return json object
    .then((data) => {
      book = data
      totalVocab = book.length
      let noOfLessons = book[book.length - 1].L
      createMenu(noOfLessons, book, setNextQuestion)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

export let mybookdata = () => book

export default getVocab
