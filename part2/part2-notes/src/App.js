import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        axios.get('http://de.irscybersec.tk:3001/notes')
            .then(response => setNotes(response.data))
    }, [])

    const addNote = (e) => {
        e.preventDefault()
        const noteObj = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1, //notes are never deleted
        }
        setNotes(notes.concat(noteObj)) // shouldn't this cause a re-render?
        setNewNote('') // why does this also run?
    }
    const handleNoteChange = e => {
        console.log(e.target.value)
        setNewNote(e.target.value)
    }
    const notesToShow = showAll ? notes : notes.filter(n => n.important) // perf slow

    return (<div>
        <h1>Notes</h1>
        <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
        </div>
        <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} />
        )}
        </ul>
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">add</button>
        </form>
    </div>)
}

export default App
