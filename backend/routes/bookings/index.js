var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
var url = 'mongodb://localhost:27017/';
var AuthFunctions = require('../auth/functions');

router.post('/',async function(req,res){
    try{
        var token = req.headers['authorization'];
        if(AuthFunctions.authenticateToken(token))
        {
            
        }else{
            res.status(403).json({message:"You are not logged in"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Could not create booking"})
    }
})

module.exports = router;