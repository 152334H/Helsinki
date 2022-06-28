const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', require('./controllers/blogs'))

module.exports = app
