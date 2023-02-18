// menuContainer = document.getElementById("menuContainer")
let mainfunc = () => {}

export const shuffleArr = (array) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

export let innitialiseQuiz = () => {
  // book = mybookdata
}

export default mainfunc
