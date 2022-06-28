const conf = require('../util/conf')
const mongoose = require('mongoose')

mongoose.connect(conf.MONGO_URI, {
  auth: {
    username: conf.MONGO_USER,
    password: conf.MONGO_PASS,
  },
  authSource: 'admin',
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
module.exports = mongoose.model('Blog', blogSchema)
