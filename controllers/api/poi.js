// Desc: This file gets the coordinates of the user's location and then uses those coordinates
//to get a list of points of interest from the Amadeus API.
//The list of points of interest is then rendered to the page using handlebars.
//======================================================================

// Dependencies
// =====================================================================
const router = require('express').Router();
const Amadeus = require('amadeus');
require('dotenv').config();

//gets longitude and latitude of user's location, imported from geoCode.js
const fetchCityData = require('../../public/js/geoCode');
//======================================================================

// Amadeus API call
//======================================================================
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    // hostname: 'production' //use this to switch to production server, switch keys in .env file
});

router.get('/', async (req, res) => {

    try{
        //get latitude and longitude of user's location first before making API call
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            //get points of interest from Amadeus API
            const response = await amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: lat,
                longitude: lon
            });
            const data = response.result;
            //define poiData as the data from the API call
            const poiData = data.data;
            // console.log(poiData);
            // res.status(200).send(poiData); //send data to client
            res.render('test', { poiData: poiData }); //render to page using handlebars
        } else {
            console.log('Error: no latitude/longitude data');
            res.status(400).json({ error: 'No latitude/longitude data' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.get('/', (req, res) => {
//     res.render('poiIndex', { poiData, toDoData, safeData, locationData });
// });

module.exports = router;

