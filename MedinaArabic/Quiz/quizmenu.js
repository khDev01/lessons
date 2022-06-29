// menuContainer = document.getElementById("menuContainer")
let createMenu = (noOfLessons, book, setNextQuestion) => {
  let menuHeader = document.createElement("span")
  menuHeader.innerText = "Lesson"
  menuHeader.id = "menuHeader"
  menuHeader.onclick = function () {
    // startMegaQuiz()
  }
  menuContainer.appendChild(menuHeader)
  for (let lessonNo = 1; lessonNo <= noOfLessons; lessonNo++) {
    let lsnNo = document.createElement("span")
    lsnNo.innerHTML = lessonNo
    lsnNo.classList.add("lessonmenuitem")
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
let min, max

// return selected lesson vocab id
let filterLesson = (selectedNo, book) => {
  let result = book.filter((obj) => {
    return obj.L === selectedNo
  })
  min = result[0].id
  max = result.length + min
  console.log("min: " + min + "  Max" + max)
}

export let newmin = () => min
export let newmax = () => max
// console.log("min: " + newmin + "  Max:" + newmax)

export default createMenu
