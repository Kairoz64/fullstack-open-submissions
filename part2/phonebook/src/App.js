import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, 
      name: 'Arto Hellas' 
    }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const addPerson = (e) => {
    e.preventDefault();
    const person = {
      id: persons.length + 1,
      name: newName
    }

    for (let i = 0; i<persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to the phonebook`);
        setNewName('');
        return;
      }
    }

    setPersons(persons.concat(person));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return <div key={person.id}>{person.name}</div>
        })}
      </div>
    </div>
  )
}

export default App