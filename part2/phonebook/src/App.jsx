import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
        number: newNumber,
        id: ++persons.length
      }
      setPersons(persons.concat(person))
    }

    setNewName('')
    setNewNumber('')
    setSearch('')
  }

  const personsToDisplay = !search 
    ? persons
    : persons.filter(({ name }) => 
      new RegExp(search, 'i').test(name))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with 
          <input 
            type="text" 
            value={search}
            onChange={handleChange(setSearch)}
          />
      </div>
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
          personsToDisplay.map(({ name, number, id }) => 
            <p key={id}>{name} {number}</p>
          )
        }
      </div>
    </div>
  )
}

export default App
