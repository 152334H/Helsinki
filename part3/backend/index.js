// RESTAPI
//
const express = require('express');
const Note = require('./models/note');
require('dotenv').config()

const app = express();
app.use(express.static('build'));
app.use(express.json());

app.get('/api/notes', (_, res) => {
  Note.find({}).then(notes => res.json(notes));
});

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(n => n ? res.json(n) : res.status(404).end())
    .catch(next)
});

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id).then(
    _ => res.status(204).end()
  ).catch(next);
});

app.post('/api/notes', (req,res,next) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then(n => response.json(n))
    .catch(next);
});

app.put('/api/notes/:id', (req, res, next) => {
  const {content, important} = req.body;

  Note.findByIdAndUpdate(req.params.id,
    {content, important},
    {new: true, runValidators: true, context: 'query'}
  ).then(updatedNote => res.json(updatedNote))
    .catch(next)
});

// 404 handler
app.use((_, res) => {
  res.status(404).send({error: 'unknown endpoint'});
});
// error handler
app.use((err, _, res, nxt) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'});
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({error: err.message});
  }
  nxt(err)
});

const PORT = process.env.PORT;
app.listen(PORT, () => 
console.log('Server running at http://localhost:' + PORT)
);

