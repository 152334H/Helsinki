import React, { useState } from 'react'

//const PhoneEntry = ({name}) => <li>{name}</li>

const Numbers = ({persons}) => (<>
    <h2>Numbers</h2>
    <ul>
        {persons.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
    </ul>
</>)

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [newName, setNewName] = useState('')

    const addName = e => {
        e.preventDefault()
        const newPerson = {
            name: newName,
            //id: persons.length + 1
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    return (<div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        <Numbers persons={persons} />
    </div>)
}

export default App
