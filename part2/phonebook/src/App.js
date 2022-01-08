import React, { useState } from 'react'

const Filter = ({filter, onChange}) => (<>
    <p>filter shown with <input value={filter} onChange={onChange}/></p>
</>)

const PersonForm = ({onSubmit, newName, newNumber, onNameChange, onNumberChange}) => (<form onSubmit={onSubmit}>
    <div> name: <input value={newName} onChange={onNameChange}/> </div>
    <div> number: <input value={newNumber} onChange={onNumberChange}/> </div>
    <div> <button type="submit">add</button> </div>
</form>)

const Persons = ({persons}) => (<>
    <h2>Numbers</h2>
    <ul>
        {persons.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
    </ul>
</>)

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    const shownPersons = persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))

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
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    return (<div>
        <h2>Phonebook</h2>
        <Filter filter={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
        <h3>Add a new</h3>
        <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} onNameChange={e => setNewName(e.target.value)} onNumberChange={e => setNewNumber(e.target.value)}/> {/* Why do you even want to do this? What's the point? */}
        <Persons persons={shownPersons} />
    </div>)
}

export default App
