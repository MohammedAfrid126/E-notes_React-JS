import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

export default function AddNote(props) {
    //context iss used to update the notes in NoteState
    const context = useContext(noteContext);
    const {addNote} = context;

    //This State is used to update the INPUTS in this Component
    const [note, setNote] = useState({title : "", description : "", tag : "default"})

    const handleChange = (e) => {
        setNote({...note, [e.target.id] : e.target.value})
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title : "", description : "", tag : ""})
        props.showAlert("Your note has been added","success")
    }
    return (
        <>
            <div className="container my-4">
                <h1>Add a Note</h1>
                <form action="" className='my-4'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input className="form-control" id="title" name="title" placeholder="Your Title" value={note.title} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input className="form-control" id="tag" name="tag" placeholder="Your Tag" value={note.tag} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" placeholder="Start Typing..." rows="8" value={note.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <button className="btn-primary btn mb-3" type='submit' onClick={handleAdd}>Add to Library</button>
                    </div>
                </form>
            </div>
        </>
    )
}
