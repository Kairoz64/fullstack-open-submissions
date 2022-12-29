import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [term, setTerm] = useState('')

  const personsToShow = !term
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(term))

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  }

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  }

  const addPerson = (e) => {
    e.preventDefault();
    const person = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone
    }

    for (let i = 0; i<persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to the phonebook`);
        setNewName('');
        setNewPhone('');
        return;
      }
    }

    axios
    .post('http://localhost:3001/persons', person)
    .then(response => {
      setPersons(persons.concat(person));
      setNewName('');
      setNewPhone('');
    })
  }

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={term} onChange={handleTermChange}/>
      <h3>add a new</h3>
      <PersonForm 
        name={newName} 
        phone={newPhone} 
        onChangeName={handleNameChange}
        onChangePhone={handlePhoneChange}
        onSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App