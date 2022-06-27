

const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.static('build'))
app.use(express.json());
morgan.token('post_data', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_data'));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (_, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  res.send(info)
});

app.get('/api/persons', (_, res) => {
  res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) { res.json(person) }
  else { res.status(404).end() }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
});

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  if (persons.find(p => p.name === body.name || p.number === body.number)) {
    return res.status(400).json({
      error: 'values must be unique'
    })
  }
  const person = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  res.json(person)
});

const PORT = 23815
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
