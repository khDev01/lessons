let textHighlighter = (el) => {
  var str5 = el.innerHTML
  var reg = /red|blue|فِ|هذا/gi //g is to replace all occurances

  var toStr5 = String(reg)
  var color = toStr5.replace("/g", "|").substring(1)

  var colors = color.split("|")
  console.log(colors)
  if (colors.indexOf("red") > -1) {
    str5 = str5.replace(/red/g, '<span style="color:red;">red</span>')
  }

  if (colors.indexOf("blue") > -1) {
    str5 = str5.replace(/blue/g, '<span style="color:blue;">blue</span>')
  }

  if (colors.indexOf("فِ") > -1) {
    str5 = str5.replace(/فِي/g, '<span style="color:green;">فِي</span>')
  }

  if (colors.indexOf("هذا") > -1) {
    str5 = str5.replace(/هذا/g, '<span style="color:orange;">هذا</span>')
  }
  el.innerHTML = str5
}

function highlight(el, text) {
  var innerHTML = el.innerHTML
  var index = innerHTML.indexOf(text)
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + text.length) +
      "</span>" +
      innerHTML.substring(index + text.length)
    el.innerHTML = innerHTML
  }
}

function bodyHighlighter() {
  var bodyText = document.body.innerHTML
  var reg = /red|َ|فِ|هذا/gi //g is to replace all occurances
  // console.log(reg)

  var toHighlight = String(reg)
  // console.log(toHighlight)
  var color = toHighlight.replace("/g", "|").substring(1)
  // console.log(color)
  var colors = color.split("|")

  // if (colors.indexOf(fatha) > -1) {
  let newHighlight = bodyText.replace(
    /َ/g,
    '<span style="color:red;">&ZeroWidthSpace;\u064e</span>'
  )
  // }

  document.body.innerHTML = newHighlight
}

let newHighlighter = (text, color) => {
  let bodyText = document.body.innerHTML
  // let highlighttext = bodyText.split(fatha).join(doma) // quick replacement
  let replacement = `<span style="color:${color};">&ZeroWidthSpace;${text}</span>`
  let regex = new RegExp(text, "g")
  let highlighttext = bodyText.replace(regex, replacement)

  document.body.innerHTML = highlighttext
  bodyHighlighter()
}

export default newHighlighter
