const conf = require('../util/conf')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  }
})
blogSchema.set('toJSON', {
  transform: (_, retObj) => {
    retObj.id = retObj._id;
    delete retObj._id;
    delete retObj.__v;
  }
})
module.exports = mongoose.model('Blog', blogSchema)
