const express = require('express')
const connectToMongo = require('./db');
//Its requierd to connnect to mongo on same localhost
var cors = require('cors')


connectToMongo();
const app = express()
const port = 5000;

// To use the req.body we should use the below command
app.use(cors())
app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
})