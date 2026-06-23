import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const filteredPersons = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter))
    : persons

  useEffect(() => {
    personService.getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const personExists = persons.find(person => person.name === newName)

    if (personExists) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(personExists.id, person)

          .then(modifiedPerson => {
            const newPersons = persons.map(note => note.id !== personExists.id ? note : modifiedPerson)

            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(`Information of  ${person.name} has already been removed from server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 5000)
          })
      }
    }

    else {
      personService.addPerson(person)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        }).catch(error => {
          setMessage(`error adding  ${person.name} `)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
    }
  }
  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const onDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.removePerson(person.id)
        .then(() => {
          const newPersons = persons.filter((filteredPerson) => filteredPerson.id !== person.id)
          setPersons(newPersons)
        }
        )
    }
  }

  return (
    <div>
      <h3>Phonebook</h3>
      <Notification message={message} type={messageType} />
      <Filter
        onChange={handleFilter}
      />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Person persons={filteredPersons} onDelete={onDelete} />
    </div>
  )
}

export default App