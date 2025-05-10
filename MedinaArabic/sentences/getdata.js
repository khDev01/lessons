const book1json = "../book1Complete.json"

// get lesson vocab from json file
let getData = () => {
  fetch(book1json)
    .then((response) => response.json()) // return json object
    .then((data) => {
      let book = data
      let booklength = data.length
      // console.log(book)
      localStorage.setItem("book1data", JSON.stringify(book))
      // console.log(JSON.parse(localStorage.getItem("book1data")))
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

export default getData
