const mongoose = require('mongoose')
const uniqValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }]
})

userSchema.set('toJSON', {
  transform: (_, retObj) => {
    retObj.id = retObj._id;
    delete retObj._id;
    delete retObj.__v;
    delete retObj.passwordHash; // security!!!
  }
})
userSchema.plugin(uniqValidator)

module.exports = mongoose.model('User', userSchema)
