const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.static('build'))
app.use(express.json());
morgan.token('post_data', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'));

const Person = require('./models/person');

app.get('/info', (_, res, next) => {
  Person.find({}).then(ppl => res.send(
      `<p>Phonebook has info for ${ppl.length} people</p>
       <p>${new Date()}</p>`
  )).catch(next)
});

app.get('/api/persons', (_, res,next) => {
  Person.find({}).then(ppl => res.json(ppl))
    .catch(next)
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(
    p => p ? res.json(p) : res.status(404).end()
  ).catch(next)
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(
    p => res.status(p === null ? 404 : 204).end()
  ).catch(next);
});

// a little bit evil: assume all future endpoints require req.body as a person, and use middleware to validate
app.use((req,res,next) => {
  const b = req.body;
  if (typeof b.name === 'undefined' || typeof b.number === 'undefined')
    return res.status(400).json(
      {error: 'name or number missing'}
    );
  req.person = { name: b.name, number: b.number };
  next();
});

app.post('/api/persons', (req, res, next) => {
  const p = new Person(req.person);
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
  Person.findByIdAndUpdate(req.params.id, req.person, {new: true})
    .then(changedP => res.json(changedP))
    .catch(next);
});

//error handling
app.use((err, _, res, nxt) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'});
  }
  nxt(err)
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
