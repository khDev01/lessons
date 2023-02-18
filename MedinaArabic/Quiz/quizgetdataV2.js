import createMenu from "./quizmenu.js"
let book

async function getVocab(bookjson, totalVocab, setNextQuestion) {
  await fetch(bookjson)
    .then((response) => response.json()) // return json object
    .then((data) => {
      console.log("First")
      console.log(data)
      // return data
      book = data
      // console.log(book)
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
