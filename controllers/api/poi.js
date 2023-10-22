// Desc: This file gets the coordinates of the user's location and then uses those coordinates
//to get a list of points of interest, activities, and safety and location scores from the Amadeus APIs.
//The list of points of interest is then rendered to the page using handlebars.
//======================================================================

// Dependencies
// =====================================================================
const router = require('express').Router();
const Amadeus = require('amadeus');
require('dotenv').config();

// gets longitude and latitude of user's location, imported from geoCode.js
const fetchCityData = require('../../public/js/geoCode');
//======================================================================

// Amadeus API call
//======================================================================
// Amadeus API credentials
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    // hostname: 'production' //use this to switch to production server, switch keys in .env file
});
//======================================================================
// Amadeus API call, gets points of interest, activities, and safety and location scores
// then combines them into one object and renders them to the page using handlebars
// reference for promise.all(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
router.get('/', async (req, res) => {
    try {
        // gets latitude and longitude of user's location using geoCode.js
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            // gets points of interest, activities, and safety and location scores
            const [poiResponse, activityResponse, safetyResponse, locationResponse] = await Promise.all([
                amadeus.referenceData.locations.pointsOfInterest.get({ latitude: lat, longitude: lon }),
                amadeus.shopping.activities.get({ latitude: lat, longitude: lon }),
                amadeus.safety.safetyRatedLocations.get({ latitude: lat, longitude: lon }),
                amadeus.location.analytics.categoryRatedAreas.get({ latitude: lat, longitude: lon })
            ]);
            //define variables for each response
            const poiData = poiResponse.result.data;
            const toDoData = activityResponse.result.data;
            const safeData = safetyResponse.result.data;
            const locationData = locationResponse.result.data;

            //define object to be rendered to page, combining all data
            const responseData = {
                poiData: poiData,
                toDoData: toDoData,
                safeData: safeData,
                locationData: locationData
            };
            // res.status(200).json(responseData); //keep this for testing in insomnia
            res.render('poi', responseData); //render data to page using handlebars
        } else {
            //log error if no latitude/longitude data is returned
            console.log('Error: no latitude/longitude data'); //
            res.status(400).json({ error: 'No latitude/longitude data' });
        }
    } catch (err) {
        //log error if any other error occurs
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;