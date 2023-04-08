const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/mynewroute', (req, res) => {
  res.send('UT IN GHW!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})