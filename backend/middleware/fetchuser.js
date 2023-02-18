const jwt = require('jsonwebtoken');

const jwt_key = "Afridiisag00db0y" 

const fetchuser= (req,res,next) =>{
    //Get the user from jwt token and add it to the request
    const token  = req.header('auth-token')
    if (!token){
        return res.status(401).send({error : "Please authenticate with a valid token"})
    }
    try {
        const data  = jwt.verify(token, jwt_key)
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error : "Please authenticate with a valid token"})
    }
}
module.exports = fetchuser;