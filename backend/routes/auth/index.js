var express = require('express');
var router = express.Router();
var cryptojs = require('crypto-js');
const {MongoClient} = require('mongodb');
const {generateAccessToken} = require('./functions');
var url = 'mongodb://localhost:27017/';

router.post('/', async function(req,res){
    try {
        var email = req.body.email;
        var password = cryptojs.SHA512(req.body.password).toString();
        var client = new MongoClient(url);
        var database = client.db('hotel');
        var collection = database.collection('users');

        var user = await collection.countDocuments({
            email,password
        })

        if(user === 1)
        {
            var token = generateAccessToken(email)
            res.json({token})
        }else{
            res.json({message:"Username or password are not correct"})
        }
        client.close();
    }catch (error){
        console.log(error);
        res.status(500).json({message:"An error occored when logging in"});
    }
})

module.exports = router;