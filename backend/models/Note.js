const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title: {
        type: String,
        require:true
    },
    description: {
        type: String,
        require:true,
    },
    tag: {
        type: String
    },
    date: {
        type: Date,
        defaultl: Date.now
    },
    });

    module.exports = mongoose.model('note', NoteSchema)