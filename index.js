const express = require('express');
const app = express()

app.use(express.json())

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

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
	res.json(persons);
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

app.delete('/api/persons/:id', (req, res) => {
	const id = parseInt(req.params.id);
	persons = persons.filter(p => p.id !== id);
  console.log(persons)

	res.status(204).end()
});

app.post('/api/persons', (req, res) => {
  const newId = getRandomInt(2000000);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});