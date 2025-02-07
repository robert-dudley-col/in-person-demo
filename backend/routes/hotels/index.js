var express = require('express');
var router = express.Router();
var url = 'mongodb://localhost:27017/';
const {MongoClient} = require('mongodb');
const {authenticateToken} = require('../auth/functions');

router.get('/', async function(req,res){
    try {
        var token = req.headers['authorization'];

        if(authenticateToken(token))
        {
            var client = new MongoClient(url);
            var database = client.db('hotel');
            var collection = database.collection('hotels');

            var hotels = await collection.find().toArray();

            res.json({hotels});
        }else{
            res.status(403).json({message:"You are not signed in"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"An error occored when getting the hotels"})
    }
})

module.exports = router;