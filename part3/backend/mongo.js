const mongoose = require('mongoose')

const url = `mongodb://testingtestingignore:awnufoajwiojwdjoi@localhost:3017/test?retryWrites=true&w=majority&authSource=admin`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    /*
    const note = new Note({
      content: 'HTML is Easy',
      date: new Date(),
      important: true,
    })

    return note.save()
    */
    return Note.find({}).then(res => {
      res.forEach(n => console.log(n));
      mongoose.connection.close();
      console.log("done!");
    })
  })
  .catch((err) => console.log(err))
