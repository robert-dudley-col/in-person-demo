const {MongoClient} = require('mongodb');
var url = "mongodb://localhost:27017/";
const {authenticateToken, getIDFromAuth} = require('../auth/functions');

async function getMe(req,res) {
    try{
        var token = req.headers['authorization'];
        if(authenticateToken(token))
        {
            var email = getIDFromAuth(token);
            var client = new MongoClient(url);
            var database = client.db('hotel');
            var collection = database.collection('users');
            var me = collection.findOne({email});
            delete me.password;

            res.json(me)
        }else{
            res.status(403).json({
                message:"You are not signed in",
                loggedIn:false
            })
        }
    }catch(error)
    {
        console.log(error);
        res.status(500).json({
            message:"Could not load your details",
            loggedIn:false
        })
    }
}

module.exports = {getMe}