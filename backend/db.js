const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//Use the below url to conneect to Mongo
//use 127.0.0.1:27017 instead of localhost to connect to mongo
const mongoURL = "mongodb://127.0.0.1:27017/E-notes"

const connectToMongo = ()=>{
    mongoose.connect(mongoURL, () => {
        console.log("Mongo connected successfully");
    });
}   

module.exports = connectToMongo;