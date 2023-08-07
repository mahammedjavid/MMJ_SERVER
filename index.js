require('dotenv').config()
const express = require('express')
const compression = require('compression')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(compression())

app.get('/', (req, res) =>{
    res.send('Hello World!')
})
app.listen(port, () => console.log(`listening on port ${port}`))