// connect to DB
const conf = require('./util/conf')
const logger = require('./util/logger')
require('mongoose').connect(conf.MONGO_URI, {
  auth: {
    username: conf.MONGO_USER,
    password: conf.MONGO_PASS,
  },
  authSource: 'admin',
}).then(() => logger.info('connected to DB'))
  .catch(e => logger.error(e))


// start express app
const express = require('express')
require('express-async-errors')
const mw = require('./util/middleware')
const app = express()

//const cors = require('cors')
//app.use(cors())
app.use(express.json())
app.use(mw.requestLogger)
app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))

app.use(mw.unknownEndpoint)
app.use(mw.errorHandler)

module.exports = app
