const express = require("express")

const app = express()

const STU_ARR = [
  { id: "1", name: "Ti", age: 20, gender: "male", address: "213 Rd" },
  { id: "2", name: "Yu", age: 29, gender: "male", address: "100 Rd" },
  { id: "3", name: "To", age: 22, gender: "male", address: "106 Rd" }
]

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  //Set respons ahead
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-type")
  // res.setHeader("Access-Control-Allow-Origin", "*")
  //Access-Control-Allow-Methods allows request Method
  //Access-Control-Allow-Headers allows request Header
  next()
})

//Set information router
app.get("/students", (req, res, next) => {

  console.log("Students 'Get'")
  //return the infor
  res.send({
    status: "ok",
    data: STU_ARR
  })
})

//select a student router
app.get("/students/:id", (req, res) => {
  const id = req.params.id
  const stu = STU_ARR.find(item => item.id === id)
  res.send({
    status: "ok",
    data: stu
  })
})

//add infor roudter
app.post("/students", (req, res) => {
  console.log("Students 'Post'", req.body)
  //get infor
  const { name, age, gender, address } = req.body

  //create new infor
  const stu = {
    id: +STU_ARR.at(-1).id + 1 + "",
    name,
    age: +age,
    gender,
    address
  }
  //add student infor to array
  STU_ARR.push()
  //add succeed
  res.send({
    status: "ok",
    data: stu
  })

})

//delete infor router
app.delete("/students/:id", (req, res) => {
  //Get id
  const id = req.params.id


  for (let i = 0; i < STU_ARR.length; i++) {
    if (STU_ARR[i].id === id) {
      const delStu = STU_ARR[i]
      STU_ARR.splice(i, 1)
      res.send({
        status: "ok",
        data: delStu
      })
      return
    }
  }

  res.status(403).send({
    status: "error",
    data: "Student not exist"
  })

})

//modify infor router
app.put("/students", (req, res) => {
  //get infor
  const { id, name, age, gender, address } = req.body
  //query student by id
  const updateStu = STU_ARR.find(item => item.id === id)

  if (updateStu) {
    updateStu.name = name
    updateStu.age = age
    updateStu.gender = gender
    updateStu.address = address

    res.send({
      status: "ok",
      data: updateStu
    })
  } else {
    res.status(403).send({
      status: "error",
      data: "Student not exist"
    })
  }




})

app.listen(3000, () => {
  console.log("Launch the servers!")
})