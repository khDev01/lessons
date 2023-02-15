// menuContainer = document.getElementById("menuContainer")
let createMenu = (noOfLessons, book, setNextQuestion) => {
  let menuHeader = document.createElement("span")
  menuHeader.innerText = "Lesson"
  menuHeader.id = "menuHeader"
  menuHeader.className = "menuheader"
  menuHeader.onclick = function () {
    // startMegaQuiz()
  }
  menuContainer.appendChild(menuHeader)
  for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
    let lsnNo = document.createElement("span")
    lsnNo.innerHTML = lessonNo
    lsnNo.classList.add("lessonmenuitem")
    // lsnNo.id = "menuitem"˙˙
    lsnNo.onclick = function () {
      filterLesson(lessonNo, book)
      // style lesson itmes
      let lessnmenuitems = menuContainer.children
      for (let i = 0; i < lessnmenuitems.length; i++) {
        let itemmenu = lessnmenuitems[i]
        itemmenu.style.removeProperty("background-color")
      }
      lsnNo.style.backgroundColor = "purple"
      setNextQuestion()
    }
    menuContainer.appendChild(lsnNo)
  }
}
let min, max, adaptiveResult
let isNotAdaptive

// return selected lesson vocab id
let filterLesson = (selectedNo, book) => {
  let result
  isNotAdaptive = book[0][1] === undefined
  if (isNotAdaptive) {
    result = book.filter((obj) => {
      return obj.L === selectedNo
    })

    min = result[0].id
    max = result.length + min
    console.log("min: " + min + "  Max" + max)
    // console.log(result)
  }
  if (book[0][1] !== undefined) {
    adaptiveResult = selectedNo

    min = 0
    max = book[0][selectedNo].length
    // console.log("min: " + min + "  Max" + max)
  }
}

export let newmin = () => min
export let newmax = () => max
export let lessonid = () => adaptiveResult
// console.log("min: " + newmin + "  Max:" + newmax)

export default createMenu
