var express = require('express');
var router = express.Router();
var url = 'mongodb://localhost:27017/';
const {MongoClient} = require('mongodb');

router.get('/', async function(req,res){
    try {
        var client = new MongoClient(url);
        var database = client.db('hotel');
        var collection = database.collection('hotels');

        var hotels = await collection.find().toArray();

        console.log(hotels)

        res.json({hotels});

    } catch (error) {
        res.status(500).json({message:"An error occored when getting the hotels"})
    }
})

module.exports = router;