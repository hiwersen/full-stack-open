import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'

const url = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => setPersons(data))
      .catch(error => console.log(error))
  }, [])

  const handleChange = setState => 
    event => setState(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    const hasName = persons.some(({ name }) => 
      name === newName)

    if (hasName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }

      axios
        .post(url, person)
        .then(({ data: person }) => 
          setPersons(persons.concat(person)))
        .catch(() => 
          console.log('Error creating:', newName)) 
    }

    setNewName('')
    setNewNumber('')
    setSearch('')
  }

  const personsToDisplay = !search 
    ? persons
    : persons.filter(({ name }) => 
      new RegExp(search, 'i').test(name))

  const inputs = [
    { 
      label: 'name', 
      type: 'text', 
      value: newName,
      onChange: handleChange(setNewName)
    },
    { 
      label: 'number', 
      type: 'tel', 
      value: newNumber,
      onChange: handleChange(setNewNumber)
    }
  ]

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={search}
        onChange={handleChange(setSearch)}
      />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={handleSubmit}
        inputs={inputs}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToDisplay} />  
    </div>
  )
}

export default App
