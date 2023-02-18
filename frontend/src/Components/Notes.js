import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes(props) {
    let Navigate = useNavigate();
    const {showAlert} = props;
    const context = useContext(noteContext);
    const { notes, getNote , editNote } = context;
    //This useEffect is used to get Note from DB to the DOM
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            getNote();
        }else{
            Navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    //This is a Function that will be used to Update the notes
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id,etitle: currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
    }

    //This State is used to update the INPUTS in this Component
    const [note, setNote] = useState({id: "", etitle : "", edescription : "", etag : "default"})

    const handleChange = (e) => {
        setNote({...note, [e.target.id] : e.target.value})
    }

    const handleUpdate = ()=>{
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click()
        props.showAlert("Your Note has been updated","success");
    }

    return (
        <>
            <AddNote showAlert={showAlert}/>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
                        </div>
                        <form action="" className='my-4 mx-5'>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input className="form-control" id="etitle" name="etitle" placeholder="Your Title" value={note.etitle} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input className="form-control" id="etag" name="etag" placeholder="Your Tag" value={note.etag} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name="edescription" placeholder="Start Typing..." rows="8"  value={note.edescription} onChange={handleChange}></textarea>
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <h1>Your Library</h1>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return (<NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}  />)
                })}
            </div>
        </>
    )
}
