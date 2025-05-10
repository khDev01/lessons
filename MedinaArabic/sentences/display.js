const sContainer = document.getElementById("sentenceContainer")

let display = (text, options = {}) => {
  let para = createElement("p")
  para.innerHTML = text
  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      para.classList.add(value)
      return
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        para.dataset[dataKey] = dataValue
      })
      return
    }

    para.setAttribute(key, value)
  })
  // textHighlighter(para)
  // highlight(para, questionMark)
  document.body.appendChild(para)
  // console.log(text)
}

let displaySection = (array) => {
  array.forEach((element) => {
    display(element)
  })
  linebreak()
}
let linebreak = () => {
  let div = document.createElement("div")
  document.body.appendChild(div)
}

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

    if (key === "id") {
      element.id = value
      return
    }
    element.setAttribute(key, value)
  })
  return element
}

export default displaySection
