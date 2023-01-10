require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

const app = express()

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/info', (req, res) => {
  let numberOfPeople = persons.length
  let date = new Date();
  res.send(`<p>Phonebook has info for ${numberOfPeople} people</p><p>${date}</p>`);
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  })
});

app.get('/api/persons/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end()
  }
});

app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;

  Person.findByIdAndRemove(id).then(p => {
    res.status(204).end()
  })
  .catch(err => next(err))
});

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, person, {new: true}).then((p) => {
    res.json(p);
  })
  .catch(err => next(err))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  Person.findOne({name: person.name}).then((duplicate) => {
    if (duplicate) {
      return res.status(400).json({
        error: 'duplicate name'
      });
    }

    person.save().then(p => {
      res.json(p);
    })
  })
});

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({error: 'malformated id'})
  }

  next(err);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});