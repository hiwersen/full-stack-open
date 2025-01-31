import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personsService from './services/personsService.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(data => setPersons(data))
      .catch(error => console.log(error))
  }, [])

  const handleChange = setState => 
    event => setState(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    const person = persons.find(({ name }) => 
      name === newName)

    if (person) {
      const hasConfirmed = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (hasConfirmed) {
        const updatedPerson = {
          ...person,
          number: newNumber
        }
      
      personsService
        .update(updatedPerson)
        .then(data => {
          setPersons(persons.map(person => 
            person.id === data.id 
            ? data
            : person
          ))
          const message = `${data.name} has a new number: ${data.number}`
          showNotification([ message, 'success'])
        })
        .catch(error => {
          if (error.status === 404) {
            const message = `Information of ${newName} has already been removed from server`
            showNotification([ message, 'failure'])
            setPersons(persons.filter(({ id }) => id !== person.id))
          }
        })
      }

    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          const message = `Added ${data.name}`
          showNotification([ message, 'success'])
        })
        .catch(() => 
          console.log('Error creating:', newName)) 
    }

    setNewName('')
    setNewNumber('')
    setSearch('')
  }

  const handleDelete = ({ name, id }) => 
    () => {
      const hasConfirmed = confirm(`Delete ${name}?`)

      if (hasConfirmed) {
        personsService
          .delete(id)
          .then(data => {
            setPersons(persons.filter(person => 
              person.id !== data.id
            ))
            const message = `Deleted ${data.name}`
            showNotification([ message, 'success'])
          })
          .catch(error => {
            if (error.status === 404) {
              const message = `Information of ${name} has already been removed from server`
              showNotification([ message, 'failure'])
              setPersons(persons.filter(person => id !== person.id))
            }
          })
          
      }
    }

  const showNotification = notification => {
    setNotification(notification)
    setTimeout(() => setNotification(null), 5000)
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
      <Notification
        notification={notification}
      />
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
      <Persons 
        persons={personsToDisplay}
        handleDelete={handleDelete}
      />  
    </div>
  )
}

export default App
