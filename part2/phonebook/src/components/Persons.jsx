import Person from "./Person.jsx"

const Persons = ({ persons, handleDelete }) => (
    <div>
        {
          persons.map(person => (
            <Person 
              key={person.id} 
              person={person}
              onClick={handleDelete(person)}
            />
          ))
        }
    </div>
  )

export default Persons