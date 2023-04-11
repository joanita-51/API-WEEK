const fs = require('fs');
const express = require("express");
const jsonData = fs.readFileSync("./jobs.json","utf-8");
const jobData = JSON.parse(jsonData)

jobRouter = express.Router()
jobRouter.get("/jobqueryparams",(req,res)=>{
  const id = parseInt(req.query.id);
  const location = req.query.location;
  const response = jobData.find((myJob)=>myJob.id === id && myJob.location === location);
  if(response){
    res.status(200).send(response);
  }else{
    res.status(400).send("No data found!")
  }

})
jobRouter.post("/jobqueryparams",(req,res)=>{
  const {id, location} =req.body;
  const response = jobData.filter((myJob)=>myJob.location === location);
  if(response){
    res.status(200).send(response);
  }else{
    res.status(404).send("No data found!")
  }

})
jobRouter.post("/addnew",(req,res)=>{
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
jobRouter.get("/:id",(req, res)=>{
  const id = parseInt(req.params.id)
  const response = jobData[id]
  if(response){
    res.status(200).send(response);
  }else{
    res.status(404).send("No matching id found")
  }

})

jobRouter.delete("/deletejob/:id",(req, res)=>{
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

jobRouter.get("/",(req, res)=>{
  res.status(200).send(jobData)
})

module.exports = jobRouter