import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes'

const DB_URL = 'http://de.irscybersec.tk:3001/'
const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => noteService.getAll()
            .then(notes => setNotes(notes))
    , [])

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService.update(id, changedNote)
            .then(returnedNote => setNotes(notes.map(
                note => note.id !== id ? note : returnedNote
            ))).catch(error => {
                alert(`the note '${note.content}' was already deleted from server`)
                setNotes(notes.filter(n => n.id !== id))
            })
    }
    const addNote = (e) => {
        e.preventDefault()
        const noteObj = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1, //notes are never deleted
        }

        noteService.create(noteObj)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
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
            <Note key={note.id} note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
        </ul>
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">add</button>
        </form>
    </div>)
}

export default App
