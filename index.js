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

app.get("/job/jobqueryparams",(req,res)=>{
  const id = parseInt(req.query.id);
  const location = req.query.location;
  const response = jobData.find((myJob)=>myJob.id === id && myJob.location === location);
  if(response){
    res.status(200).send(response);
  }else{
    res.status(400).send("No data found!")
  }

})
app.post("/job/jobqueryparams",(req,res)=>{
  const {id, location} =req.body;
  const response = jobData.filter((myJob)=>myJob.location === location);
  if(response){
    res.status(200).send(response);
  }else{
    res.status(404).send("No data found!")
  }

})
app.get("/job/:id",(req, res)=>{
  const id = parseInt(req.params.id)
  const response = jobData[id]
  if(response){
    res.status(200).send(response);
  }else{
    res.status(404).send("No matching id found")
  }

})


app.get("/job",(req, res)=>{
  res.status(200).send(jobData)
})

app.get('/', (req, res)=>{
  res.status(200).send("Job Board API")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})