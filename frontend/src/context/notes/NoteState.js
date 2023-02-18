import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const token = localStorage.getItem('token');

    //notesInitial is the empty Array

    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //A function to get all note

    const getNote = async () => {
        //TODO Api call
        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
            },
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        setNotes(json)
    }

    //A function to add a note to the Array of notes

    const addNote = async (title, description, tag) => {
        //TODO Api call
        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        let note = json;
        setNotes(notes.concat(note))
    }

    //A function to add a note to the Array of notes

    const editNote = async (id, title, description, tag) => {
        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
            },
            //The async (id, title, description, tag) must be stringified to avoid Mistakw in the DB

            body: JSON.stringify({title, description, tag}) 
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //A function to add a note to the Array of notes
    
    const deleteNote = async (id) => {
        //TODO Api call

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
            },
        });
        //In front end to remove the Note
        let newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    return (
        // Its basic syntax of the Context to be used in the code
        //In below line the value is used as the output parameter(we should add it to the value to be used in the code)
        <NoteContext.Provider value={{ notes, setNotes, getNote, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;