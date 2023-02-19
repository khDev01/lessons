export let navigation = () => {
  // let nav = document.createElement("span")
  // nav.innerText = "moo"

  // menuContainer.appendChild(nav)
  // var nav = document.querySelector("nav");
  var list = document.createElement("span")
  var items = [
    {
      text: "Cool",
      url: "/lessons/MedinaArabic/Quiz/cardQuiz.html",
    },
    {
      text: "Mega",
      url: "/lessons/MedinaArabic/Quiz/megaQuiz.html",
    },
    {
      text: "Full(Simple)",
      url: "/lessons/MedinaArabic/Quiz/simpleQuiz.html",
    },
    {
      text: "Adaptive",
      url: "/lessons/MedinaArabic/Quiz/adaptiveQuiz.html",
    },
  ]

  items.forEach(function (item) {
    // var li = document.createElement("li")
    // var link = document.createElement("a")
    let navlink = document.createElement("a")
    navlink.innerText = item.text
    navlink.href = item.url
    navlink.classList.add("navlink")

    // li.appendChild(link)
    list.appendChild(navlink)
  })

  menuContainer.appendChild(list)
}

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
