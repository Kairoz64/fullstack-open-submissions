import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [term, setTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const personsToShow = !term
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(term))

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  }

  const addPerson = (e) => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const personByName = persons.find(person => person.name === newName);

    if (personByName) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...person, id: personByName.id}
        personService
        .changePerson(updatedPerson.id, updatedPerson)
        .then(updatedPerson => {
          const updatedPersons = persons.map(p => p.id === updatedPerson.id ? updatedPerson : p)
          setPersons(updatedPersons);
          setNewName('');
          setNewNumber('');
          setMessage(`Updated ${updatedPerson.name}`);
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch(err => {
          setError(true);
          setMessage(`Information of ${updatedPerson.name} has already been removed from server`);
          setTimeout(() => {
            setMessage(null);
            setError(false);
          }, 5000);
          setPersons(persons.filter(p => p.id !== updatedPerson.id))
          setNewName('');
          setNewNumber('');
        })
      }
      return;
    }

    personService
    .create(person)
    .then(newPerson => {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    })
  }

  const deletePerson = (id) => {
    const personById = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${personById.name}?`)) {
      personService
      .erase(id)
      .then(() => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons);
        setMessage(`Deleted ${personById.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
    }
  }

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons);
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter term={term} onChange={handleTermChange}/>
      <h3>add a new</h3>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App