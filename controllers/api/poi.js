// const express = require('express');
const router = require('express').Router();
const Amadeus = require('amadeus');
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    // hostname: 'production'
});

router.get('/', async (req, res) => {
    //fetchCityData();
    try{
        const response = await amadeus.referenceData.locations.pointsOfInterest.get({
            latitude: 41.397158, //lat
            longitude: 2.160873 //lon
            // latitude: 43.6534817,
            // longitude: -79.3839347
        });
        const data = response.result;
        const poiData = data.data;
        // console.log(poiData);
        res.status(200).send(poiData);
        // res.render('test', poiData);
    }catch(err) {
        console.log(err);
        res.status(500).json(err);

    }
});

// endpoint from npm documentation
// amadeus.referenceData.locations.pointsOfInterest.get({
//     latitude : 41.397158,
//     longitude : 2.160873
//   }).then(function(response){
//     console.log(response.body);   //=> The raw body
//     console.log(response.result); //=> The fully parsed result
//     console.log(response.data);   //=> The data attribute taken from the result
//   }).catch(function(error){
//     console.log(error.response); //=> The response object with (un)parsed data
//     console.log(error.response.request); //=> The details of the request made
//     console.log(error.code); //=> A unique error code to identify the type of error
//   });


module.exports = router;