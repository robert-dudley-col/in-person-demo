var express = require('express');
var router = express.Router();
const {MongoClient, Collection} = require('mongodb');
var url = 'mongodb://localhost:27017/';
var AuthFunctions = require('../auth/functions');

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

module.exports = router;