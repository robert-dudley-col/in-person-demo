const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var url = "mongodb://localhost:27017/";
const {MongoClient} = require('mongodb');

function generateAccessToken(userid)
{
    dotenv.config();
    return jwt.sign({userid},process.env.TOKEN_SECRET,{expiresIn:'1800s'});
}

function authenticateToken(authHeader)
{
    dotenv.config();
    const token = authHeader && authHeader.split(' ')[1];
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

function getIDFromAuth(authHeader)
{
    dotenv.config();
    const token = authHeader && authHeader.split(' ')[1];
    if(jwt.verify(token, process.env.TOKEN_SECRET))
    {
        return jwt.decode(token).userid;
    }else{
        return false;
    }
}

module.exports = {
    getIDFromAuth,
    authenticateToken,
    generateAccessToken
}