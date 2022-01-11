import React, { useState, useEffect } from 'react'
import personDB from './services/personDB'

const Filter = ({filter, onChange}) => (<>
    <p>filter shown with <input value={filter} onChange={onChange}/></p>
</>)

const PersonForm = ({onSubmit, newName, newNumber, onNameChange, onNumberChange}) => (<form onSubmit={onSubmit}>
    <div> name: <input value={newName} onChange={onNameChange}/> </div>
    <div> number: <input value={newNumber} onChange={onNumberChange}/> </div>
    <div> <button type="submit">add</button> </div>
</form>)

const Persons = ({persons, rmPerson}) => (<>
    <h2>Numbers</h2>
    <ul>
        {persons.map(p => <li key={p.name}>{p.name} {p.number}
            <button onClick={() => window.confirm(`Delete ${p.name}?`) && rmPerson(p.id)}>delete</button>
            </li>)}
    </ul>
</>)

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    useEffect(() => personDB.getPersons().then(setPersons), [])

    const shownPersons = persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))

    const rmPerson = id => personDB.deletePerson(id)
        .then(returnedPerson => persons.filter(p => p.id !== id))
        .then(setPersons)

    const addName = e => {
        e.preventDefault()
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const newPerson = {
            name: newName,
            number: newNumber,
            //id: persons.length + 1
        }
        personDB.addPerson(newPerson).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
        })
    }

    return (<div>
        <h2>Phonebook</h2>
        <Filter filter={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
        <h3>Add a new</h3>
        <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} onNameChange={e => setNewName(e.target.value)} onNumberChange={e => setNewNumber(e.target.value)}/> {/* Why do you even want to do this? What's the point? */}
        <Persons persons={shownPersons} rmPerson={rmPerson} />
    </div>)
}

export default App
