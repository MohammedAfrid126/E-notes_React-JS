const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


const jwt_key = "Afridiisag00db0y"

//ROUTE1 : Create  a new user using : POST"/api/auth/createuser" no Login required
router.post('/createuser', [
    //name is the input, we can show the error message using the below
    //'name' : ~'Please enter your name'~
    body('name', 'Please enter your Name').isLength({ min: 5 }),
    body('email', 'Please enter your Email').isEmail(),
    body('password', 'Password Should be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // if there is error the it will return 404 BAD request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //It will check the DB with refrence of email and will return 404 BAD request 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(404).json({ success, error: "Sorry, a user exist with this email already" })
    }

    //Salt is added to password and backend will generate the HASH to store in the DATABASE
    //The below 10 is the length of the salt
    const salt = await bcrypt.genSaltSync(10);
    //bcrypt is the function that will generate a HASH with reference to the password and salt
    const securePassword = await bcrypt.hash(req.body.password, salt);

    try {
        //It will create a new user with refrence to the POST request
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
        //It will give user details as a json
        //data will be derived from the DATABASE
        const data = {
            //In the user collection it will search for the ID
            user: {
                //This gives the unique Id from the DB
                id: user.id
            }
        }
        //JWT sign function will give a output (Which is the Authenticaation token)
        //to secure it further
        //we will pass two parameters which are data and the secret key or something similar
        //the secret key or something similar will be used while the verification of the authentication of the user
        const authToken = jwt.sign(data, jwt_key)
        success = true;
        //It will send the response as the Authorization token
        res.json({ success, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});


//ROUTE3 :Authenticate a user using POST request with end point "/api/auth/login".with nologin required
router.post('/login', [
    //name is the input, we can show the error message using the below
    //'name' : ~'Please enter your name'~
    body('email', 'Please enter your Email').isEmail(),
    body('password', 'Password Should be atleast 5 characters').isLength({ min: 5 })

], async (req, res) => {

    let success = false;

    // if there is error the it will return 404 BAD request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    //It will check the DB with refrence of email and will return 404 BAD request 
    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Please Login with the correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(404).json({ success, error: "Please Login with the correct credentials" })
        }
        //It will give user details as a json   
        //data will be derived from the DATABASE
        const data = {
            //In the user collection it will search for the ID
            user: {
                //This gives the unique Id from the DB
                id: user.id
            }
        }
        //JWT sign function will give a output (Which is the Authenticaation token)
        //to secure it further
        //we will pass two parameters which are data and the secret key or something similar
        //the secret key or something similar will be used while the verification of the authentication of the user
        const authToken = jwt.sign(data, jwt_key)
        success = true;

        //It will send the response as the Authorization token
        res.json({ success, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
});


//ROUTE3 :Get user using POST request with end point "/api/auth/getuser".with login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" })

    }
});


module.exports = router;