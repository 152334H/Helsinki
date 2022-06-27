const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.static('build'));
app.use(express.json());
morgan.token('post_data', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'));

const Person = require('./models/person');

app.get('/info', (_, res, next) => {
  Person.find({}).then(ppl => res.send(
    `<p>Phonebook has info for ${ppl.length} people</p>
     <p>${new Date()}</p>`
  )).catch(next);
});

app.get('/api/persons', (_, res,next) => {
  Person.find({}).then(ppl => res.json(ppl))
    .catch(next);
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(
    p => p ? res.json(p) : res.status(404).end()
  ).catch(next);
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(
    p => res.status(p === null ? 404 : 204).end()
  ).catch(next);
});

app.post('/api/persons', (req, res, next) => {
  const p = new Person({
    name: req.body.name, number: req.body.number
  });
  /*
  if (persons.find(p => p.name === body.name || p.number === body.number)) {
    return res.status(400).json({
      error: 'values must be unique'
    })
  }
  */
  p.save().then(np => res.json(np))
    .catch(next);
});

app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body;
  Person.findByIdAndUpdate(req.params.id, {name,number},
    {new: true, runValidators: true, context: 'query'}
  ).then(changedP => res.json(changedP))
    .catch(next);
});

//error handling
app.use((err, _, res, nxt) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'});
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({error: err.message});
  }
  nxt(err);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
