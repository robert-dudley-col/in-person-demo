var express = require('express');
var router = express.Router();
const {MongoClient, Collection} = require('mongodb');
var url = 'mongodb://localhost:27017/';
var AuthFunctions = require('../auth/functions');
var mongo = require('mongodb');

router.get('/@me', async function(req,res){
    try {
        var token = req.headers['authorization'];
        if(AuthFunctions.authenticateToken(token))
        {
            var user = await AuthFunctions.getIDFromAuth(token);
            var client = new MongoClient(url);
            var database = client.db('hotel');
            var collection = database.collection('bookings');
            var bookings = await collection.find({
                user:user
            }).toArray();

            res.json(bookings);
        }else{
            res.status(403).json({message:"You are not authorised"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"An error occrored"});
    }
})

router.post('/',async function(req,res){
    try{
        var token = req.headers['authorization'];
        if(AuthFunctions.authenticateToken(token))
        {
            var user = await AuthFunctions.getIDFromAuth(token);
            var hotel = req.body.hotel;
            var checkin = req.body.checkin;
            var checkout = req.body.checkout;
            var twin = req.body.twin;
            var single = req.body.single;
            var double = req.body.double;
            var family = req.body.family;
            if(
                user && 
                hotel && 
                checkin && 
                checkout && 
                (twin || twin ===0) && 
                (single || single === 0) && 
                (double || double === 0) && 
                (family || family === 0)
            )
            {
                var client = new MongoClient(url);
                var database = client.db('hotel');
                var collection = database.collection('bookings');
                var booking = await collection.insertOne({
                    user,hotel,checkin,checkout,twin,single,double,family
                })

                if(booking.acknowledged)
                {
                    res.json({booking:booking.insertedId})
                }else{
                    res.status(500).json({message:"Could not create booking"})
                }
            }else{
                res.status(500).json({message:"Could not create booking"})
            }
        }else{
            res.status(403).json({message:"You are not logged in"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Could not create booking"})
    }
})


router.get('/:id', async function(req,res){
    try {
        var token = req.headers['authorization'];
        if(AuthFunctions.authenticateToken(token))
        {
            var user = await AuthFunctions.getIDFromAuth(token);

            const client = new MongoClient(url);
            const database = client.db('hotel');
            
            var booking = await database.collection('bookings').findOne({
                _id:new mongo.ObjectId(req.params.id)
            });

            if(user == booking.user.toString())
            {
                var hotel = await database.collection('hotels').findOne({
                    _id:new mongo.ObjectId(booking.hotel)
                })

                var user = await database.collection('users').findOne({
                    _id:booking.user
                })
                delete user.password
                
                booking.user = user;
                booking.hotel = hotel;
                res.json(booking);
            }else{
                res.status(403).json({message:"This is not the booking you're looking for 👀"});
            }
        }else{
            res.status(403).json({message:"You are not logged in"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Could not load booking"});
    }
})

module.exports = router;