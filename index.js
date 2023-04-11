const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const jobRouter = require("./jobDataRouter")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/job", jobRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})