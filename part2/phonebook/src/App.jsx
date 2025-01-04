import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      setPersons(persons.concat(person))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>name: 
          <input 
            type="text" 
            value={newName}
            onChange={handleChange(setNewName)}
          />
        </div>
        <div>number: 
            <input 
              type="tel" 
              value={newNumber}
              onChange={handleChange(setNewNumber)}
            />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons.map(({ name, number }) => 
            <p key={name}>{name} {number}</p>
          )
        }
      </div>
    </div>
  )
}

export default App
