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

// Get points of interest
//======================================================================
// router.get('/', async (req, res) => {

//     try{
//         //get latitude and longitude of user's location first before making API call
//         const { lat, lon } = await fetchCityData();
//         if (lat && lon) {
//             //get points of interest from Amadeus API
//             const response = await amadeus.referenceData.locations.pointsOfInterest.get({
//                 latitude: lat,
//                 longitude: lon
//             });
//             const data = response.result; //the fully parsed data
//             //define poiData as the data from the API call (array of objects)
//             const poiData = data.data;
//             // console.log(poiData);
//             res.status(200).send(poiData); //send data to client
//             // res.status(200).render('poi', { poiData }); //render to page using handlebars
//             // res.render('poi', { poiData: poiData }); //render to page using handlebars
//         } else {
//             console.log('Error: no latitude/longitude data');
//             res.status(400).json({ error: 'No latitude/longitude data' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// //Get tours and activities
// //======================================================================
// router.get('/activities', async (req, res) => {

//     try{
//         //get latitude and longitude of user's location first before making API call
//         const { lat, lon } = await fetchCityData();
//         if (lat && lon) {

//             const response = await amadeus.shopping.activities.get({
//                 latitude: lat,
//                 longitude: lon
//             });
//             const data = response.result; //the fully parsed data
//             //define toDoData as the data from the API call (array of objects)
//             const toDoData = data.data;
//             // console.log(toDoData);
//             res.status(200).send(toDoData); //send data to client
//             // res.status(200).render('poi', { toDoData }); //render to page using handlebars
//             // res.render('poi', { toDoData: toDOData }); //render to page using handlebars
//         } else {
//             console.log('Error: no latitude/longitude data');
//             res.status(400).json({ error: 'No latitude/longitude data' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// //Get safety score
// //======================================================================
// router.get('/safety', async (req, res) => {

//     try{
//         //get latitude and longitude of user's location first before making API call
//         const { lat, lon } = await fetchCityData();
//         if (lat && lon) {

//             const response = await amadeus.safety.safetyRatedLocations.get({
//                 latitude: lat,
//                 longitude: lon
//             });
//             const data = response.result; //the fully parsed data
//             //define safeData as the data from the API call (array of objects)
//             const safeData = data.data;
//             // console.log(safeData);
//             res.status(200).send(safeData); //send data to client
//             // res.status(200).render('poi', { safeData }); //render to page using handlebars
//             // res.render('poi', { safeData: safeData }); //render to page using handlebars
//         } else {
//             console.log('Error: no latitude/longitude data');
//             res.status(400).json({ error: 'No latitude/longitude data' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// //Get location score
// //======================================================================
// router.get('/location', async (req, res) => {

//     try{
//         //get latitude and longitude of user's location first before making API call
//         const { lat, lon } = await fetchCityData();
//         if (lat && lon) {

//             const response = await amadeus.location.analytics.categoryRatedAreas.get({
//                 latitude: lat,
//                 longitude: lon
//             });
//             const data = response.result; //the fully parsed data
//             //define locationData as the data from the API call (array of objects)
//             const locationData = data.data;
//             // console.log(locationData);
//             res.status(200).send(locationData); //send data to client
//             // res.status(200).render('poi', { locationData }); //send data to client
//             // res.render('poi', { locationData: locagtionData }); //render to page using handlebars
//         } else {
//             console.log('Error: no latitude/longitude data');
//             res.status(400).json({ error: 'No latitude/longitude data' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// if/when all data is received, render to page using handlebars
//======================================================================
// router.get('/cityinfo', async (req, res) => {
//     try{
//         const poiData = await getPOI();
//         const toDoData = await thingsToDo();
//         const safeData = await safeScore();
//         const locationData = await locationScore();
//         if (poiData && toDoData && safeData && locationData) {
//             res.status(200).send(poiData, toDoData, safeData, locationDat);
//             // res.render('poi', { poiData, toDoData, safeData, locationData, city });
//         } else {
//             console.log('Error: no data received');
//             res.status(400).json({ error: 'No data received' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;
//==============================test area below==============================
// router.get('/', async (req, res) => {
//     try {
//         const { lat, lon } = await fetchCityData();
//         if (lat && lon) {
//             const poiResponse = await amadeus.referenceData.locations.pointsOfInterest.get({
//                 latitude: lat,
//                 longitude: lon
//             });
//             const activityResponse = await amadeus.shopping.activities.get({
//                 latitude: lat,
//                 longitude: lon
//             });
//             const safetyResponse = await amadeus.safety.safetyRatedLocations.get({
//                 latitude: lat,
//                 longitude: lon
//             });
//             const locationResponse = await amadeus.location.analytics.categoryRatedAreas.get({
//                 latitude: lat,
//                 longitude: lon
//             });

//             const poiData = poiResponse.result.data;
//             const toDoData = activityResponse.result.data;
//             const safeData = safetyResponse.result.data;
//             const locationData = locationResponse.result.data;

//             // Render the data to a view (poi.handlebars) and send it to the client
//             res.status(200).send(poiData, toDoData, safeData, locationData);
//             // res.render('poi', { poiData, toDoData, safeData, locationData });
//         } else {
//             console.log('Error: no latitude/longitude data');
//             res.status(400).json({ error: 'No latitude/longitude data' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const { lat, lon } = await fetchCityData();
//         if (lat && lon) {
//             const [poiResponse, activityResponse, safetyResponse, locationResponse] = await Promise.all([
//                 amadeus.referenceData.locations.pointsOfInterest.get({ latitude: lat, longitude: lon }),
//                 amadeus.shopping.activities.get({ latitude: lat, longitude: lon }),
//                 amadeus.safety.safetyRatedLocations.get({ latitude: lat, longitude: lon }),
//                 amadeus.location.analytics.categoryRatedAreas.get({ latitude: lat, longitude: lon })
//             ]);

//             const poiData = poiResponse.result.data;
//             const toDoData = activityResponse.result.data;
//             const safeData = safetyResponse.result.data;
//             const locationData = locationResponse.result.data;

//             res.status(200).json({ poiData, toDoData, safeData, locationData });
//             // res.render('poi', { poiData, toDoData, safeData, locationData });
//         } else {
//             console.log('Error: no latitude/longitude data');
//             res.status(400).json({ error: 'No latitude/longitude data' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
router.get('/', async (req, res) => {
    try {
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const [poiResponse, activityResponse, safetyResponse, locationResponse] = await Promise.all([
                amadeus.referenceData.locations.pointsOfInterest.get({ latitude: lat, longitude: lon }),
                amadeus.shopping.activities.get({ latitude: lat, longitude: lon }),
                amadeus.safety.safetyRatedLocations.get({ latitude: lat, longitude: lon }),
                amadeus.location.analytics.categoryRatedAreas.get({ latitude: lat, longitude: lon })
            ]);

            const poiData = poiResponse.result.data;
            const toDoData = activityResponse.result.data;
            const safeData = safetyResponse.result.data;
            const locationData = locationResponse.result.data;

            const responseData = {
                poiData: poiData,
                toDoData: toDoData,
                safeData: safeData,
                locationData: locationData
            };

            // res.status(200).json(responseData);
            res.render('poi', responseData);
        } else {
            console.log('Error: no latitude/longitude data');
            res.status(400).json({ error: 'No latitude/longitude data' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;