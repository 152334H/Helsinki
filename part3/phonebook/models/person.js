require('dotenv').config();
const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGO_URI, {
    auth: {
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASS
    },
    authSource: "admin",
    //useNewUrlParser: true,
	}).then(_ => console.log('connected to DB'))
  .catch(e => {
		console.log('failed to connect to DB');
		console.log(e);
	})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
personSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
});
module.exports = mongoose.model('Person', personSchema)

