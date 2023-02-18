import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
    return (
        <><div className="col-md-3 my-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <div>
                    <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-1" onClick={()=>{deleteNote(note._id);props.showAlert("Your Note has been Sucessfully deleted","success");    }}></i>
                    </div>
                    </div>
                    <p className="card-text">{ note.description }</p>
                </div>
            </div>
        </div>
        </>
    )
}
