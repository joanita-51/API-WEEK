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
app.post("/job/addnew",(req,res)=>{
  const {id, company, jobTitle, postedOn, location} =req.body;

  const isDuplicateId = jobData.some((myJob)=>myJob.id ===id);
    const isDuplicateTitle = jobData.some((myJob)=>myJob.JobTitle ===jobTitle);

  if(isDuplicateId || isDuplicateTitle){
    res.status(400).send('Oops! ID or JobTitle already exists');
    return;
  }
  const newData = {id, company, jobTitle, postedOn, location} ;
  jobData.push(newData);

  fs.writeFile("./jobs.json", JSON.stringify(jobData), (err)=>{
    if(err){
      res.status(500).send("Error writing file")
      return;
    }
    res.status(200).send("Data added successfully")
  })

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

app.delete("/job/deletejob/:id",(req, res)=>{
  const idToDelete = parseInt(req.params.id);
  const index = jobData.findIndex((myJob)=>myJob.id === idToDelete);
  if(index == -1){
    res.status(404).send(`Job with id ${idToDelete} not found`);
    return;
  }
  jobData.splice(index,1)

    fs.writeFile("./jobs.json", JSON.stringify(jobData), (err)=>{
    if(err){
      res.status(500).send("Error writing file")
      return;
    }
    res.status(200).send("Deleted data successfully")
  })
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