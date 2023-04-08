const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const fs = require('fs');
const jsonData = fs.readFileSync("./jobs.json","utf-8");
const jobData = JSON.parse(jsonData)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res)=>{
  res.status(200).send("Job Board API")
})

app.get("/job",(req, res)=>{
  res.status(200).send(jobData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})