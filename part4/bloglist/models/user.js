const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
  },
  passwordHash: {
    type: String,
    required: true,
    length: 999,
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

module.exports = mongoose.model('User', userSchema)
