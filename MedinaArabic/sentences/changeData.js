const book1json = "../book1Complete.json"
const objects = "../data/adj.json"
let keysArr = []
let getkey = false
let Modify = true
let addnew = false
let changeString = "Adjs"

let modifyData = () => {
  fetch(objects) // object
    .then((response) => response.json()) // return json object
    .then((data) => {
      for (const key in data) {
        if (getkey) {
          keysArr.push(key)
        } else {
          keysArr.push(data[key])
        }
      }
      console.log(keysArr)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
  fetch(book1json)
    .then((response) => response.json()) // return json object
    .then((data) => {
      let newArr = data
      keysArr.forEach((el) => {
        // console.log(el)
        newArr = newArr.map((obj) => {
          if (obj.En === el) {
            // console.log(obj.En)
            return { ...obj, str: changeString }
          }
          return obj
        })
      })
      console.log(newArr)
      console.log("Complete")
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}
let addNewData = () => {
  fetch(book1json)
    .then((response) => response.json()) // return json object
    .then((data) => {
      let newArr = data
      newArr.forEach((object) => {
        object.L = 1
      })

      console.log(newArr)
      console.log("Complete")
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}
;(function () {
  if (Modify) {
    console.log("will update data")
    modifyData()
  }
  if (addnew) {
    4
    console.log("will add data")

    addNewData()
  }
  // if (filterLesson)
  //   {
  //     filterbyL
  //   }
})()
