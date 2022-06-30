const cors = require('cors')
const express = require('express')
require('express-async-errors')
const mw = require('./util/middleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(mw.requestLogger)
app.use('/api/blogs', require('./controllers/blogs'))

app.use(mw.unknownEndpoint)
app.use(mw.errorHandler)

module.exports = app
