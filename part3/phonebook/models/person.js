require('dotenv').config();
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URI, {
    auth: {
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASS
    },
    authSource: 'admin',
    //useNewUrlParser: true,
  }).then(() => console.log('connected to DB'))
  .catch(e => {
    console.log('failed to connect to DB');
    console.log(e);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: s => {
        if (s.length < 8) return false;
        const i = s.indexOf('-');
        if (s.lastIndexOf('-') === i)
          return /^\d{2,3}-\d$/.test(s);
        return true; // this is dumb, but also what the question asks for
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Phone number required']
  }
});
personSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});
module.exports = mongoose.model('Person', personSchema);

