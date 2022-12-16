import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
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

    setPersons(persons.concat(person));
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input value={term} onChange={handleTermChange}/></div>
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => {
          return <div key={person.id}>{`${person.name} ${person.phone}`}</div>
        })}
      </div>
    </div>
  )
}

export default App