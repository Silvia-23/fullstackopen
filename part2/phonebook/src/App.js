import React, { useState } from 'react'

const PersonEntry = ({ name }) => (
  <p>{name}</p>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook!`)
      return
    }

    const newPerson = {
      name: newName
    }
    
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNawNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNawNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <PersonEntry key={person.name} name={person.name} />)}
      </div>
    </div>
  )
}

export default App
