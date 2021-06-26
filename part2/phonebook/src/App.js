import React, { useState } from 'react'

const PersonEntry = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const SearchFilter = ({ filter, onFilterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={onFilterChange} />
  </div>
)

const AddNewPersonForm = ({ onSubmit, nameInput, onNameChange, numberInput, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={nameInput} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={numberInput} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map(p => <PersonEntry key={p.name} person={p}/>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const shownPersons = filter === ''  
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook!`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNawNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} onFilterChange={handleFilterChange}/>
      <h3>Add a new contact</h3>
      <AddNewPersonForm 
        onSubmit={addNewPerson}
        nameInput={newName}
        onNameChange={handleNawNameChange}
        numberInput={newNumber}
        onNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App
