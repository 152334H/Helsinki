require('dotenv').config()
const mongoose = require('mongoose');
// const url = process.env.MONGODB_URI

mongoose
  .connect(process.env.MONGODB_URI, {
    auth: {
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASS
    },
    authSource: "admin",
    //useNewUrlParser: true,
  }).then(_ => console.log('connected to MongoDB'))
  .catch(e => console.log('error connecting to MongoDB:', e.message));
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean
})
noteSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
});

module.exports = mongoose.model('Note', noteSchema)
