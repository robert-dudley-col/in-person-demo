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
            var search = req.query.search;

            console.log(search);
            var client = new MongoClient(url);
            var database = client.db('hotel');
            var collection = database.collection('hotels');

            if(search=='' || search==undefined)
            {
                var hotels = await collection.find().toArray();
            }else{
                var hotels = await collection.find({
                    '$or':[
                        {location:{'$regex':search,'$options':'i'}},
                        {description:{'$regex':search,'$options':'i'}}
                    ]
                }).toArray();
            }
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