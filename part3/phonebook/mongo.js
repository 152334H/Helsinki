require('dotenv').config();
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

mongoose
  .connect(process.env.MONGO_URI, {
    auth: {
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASS
    },
    authSource: 'admin',
    //useNewUrlParser: true,
  })
  .then(() => {
    let cb;
    if (process.argv.length < 4) {
      console.log('phonebook:');
      cb = Person.find({}).then(ppl => ppl.forEach(p =>
        console.log(`${p.name} ${p.number}`)
      ));
    } else {
      const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
      });
      cb = person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
      });
    }
    return cb.then(() => mongoose.connection.close());
  })
  .catch((err) => console.log(err));
