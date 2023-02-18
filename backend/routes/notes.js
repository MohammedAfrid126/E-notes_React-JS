const express = require('express');
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//ROUTE 1 :Get user all Notes using POST request with end point "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        let notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
});


//ROUTE 2 :Add a new NOTES using POST request with end point "/api/notes/addnote".with login required
router.post('/addnote', [
    //name is the input, we can show the error message using the below
    //'name' : ~'Please enter your name'~
    body('title', 'Please enter a valid Title').isLength({ min: 3 }),
    body('description', 'Please enter your Email').isLength({ min: 5 })
],fetchuser, async (req, res) => {
    try {
        //The below things will come with request
        //we have to destructure it. which can be furrther used
        const { title, description, tag } = req.body;

        // if there is error the it will return 404 BAD request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Create a new note and store it in DB  
        const note = new Note({
            title, description, tag, user : req.user.id
        });
        //Save the note in DB
        const savedNote = await note.save();
        //send the SaveNote message to the user
        res.json(savedNote);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error" + error.message);
    }
});


//ROUTE  :Update new NOTES using PUT request with end point "/api/notes/updatenote/:id".with login required
router.put('/updatenote/:id',fetchuser,async (req, res) => {
    try{
    //The below things will come with request
    //we have to destructure it. which can be furrther used
    const { title, description, tag } = req.body;

    //create a new note
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {return res.status(404).send("Not Found")}

    //To check weather the user is genuine to update the note
    //weather the person is upudating the note of other user
    if (note.user.toString() !== req.user.id) {return res.status(401).send("Not Allowed")}

    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true})
    res.json({note})
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error" + error.message);
    }

});


//ROUTE  :Delete a NOTES using DELETE request with end point "/api/notes/deletenote".with login required
router.delete('/deletenote/:id',fetchuser,async (req, res) => {

    try {
    //Find the note to be DELETED and DELETE it
    let note = await Note.findById(req.params.id);
    if (!note) {return res.status(404).send("Not Found")}
    console.log("hello");

    //To check weather the user is genuine to delete the note
    //weather the person is deleteing the note of other user
    if (note.user.toString() !== req.user.id) {return res.status(401).send("Not Allowed")}
    console.log("pello");

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error" + error.message);
    }
});

module.exports = router;