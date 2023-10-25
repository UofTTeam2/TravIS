// Desc: This file gets the coordinates of the user's location and then uses those coordinates
//to get a list of points of interest, activities, and safety and location scores from the Amadeus APIs.
//The list of points of interest is then rendered to the page using handlebars.

const router = require('express').Router();
const Amadeus = require('amadeus');
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID, // assuming that based on the documentation you just need these and nothing else and they are in the .env file
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    // hostname: 'production' //use this to switch to production server, switch keys in .env file
});

// Route to get the points of interest, activities, and safety and location scores
router.get('/:lat/:lon', async (req, res) => {
// router.get('/', async (req, res) => {


    const lat = req.params.lat;
    const lon = req.params.lon;
    console.log(lat, lon);
    try {
        // const lat = 52.5200;
        // const lon = 13.4050;
        if (!lat || !lon) {
            return res
                .status(400)
                .json({ message: 'Latitude and Longitude are required' });
        }
        const poiResponse = await amadeus.referenceData.locations.pointsOfInterest.get({
            latitude: lat,
            longitude: lon,
        });
        const activityResponse = await amadeus.shopping.activities.get({
            latitude: lat,
            longitude: lon,
        });
        const safetyResponse = await amadeus.safety.safetyRatedLocations.get({
            latitude: lat,
            longitude: lon,
        });
        const locationResponse = await amadeus.location.analytics.categoryRatedAreas.get({
            latitude: lat,
            longitude: lon,
        });
        const poiData = await poiResponse.result.data;
        // console.log(poiData); If the whole data with all related properties are there, then it should be fine. If not, then maybe you have to destructure the data to get the properties you need
        const activityData = await activityResponse.result.data;
        const safetyData = await safetyResponse.result.data;
        const locationData = await locationResponse.result.data;
        // maybe after that we have to create a function like the one in locationScore.js to destructure the data. thend send back those as response, like this: e.g  poiData: relatedFunction(poidata) ===> which will act as method to destructure the data. then on the client side we do sth like this: const = receivedPoiData = response.poiData.text() ===> which will convert the data to text and then we can use it in the handlebars file. **** in this case instead of res.render we will use res.json
        // const responseData = {
        //     poiData,
        //     activityData,
        //     safetyData,
        //     locationData,
        // };
        // res.status(200).json(responseData);
        // console.log(responseData);
        // const htmlContent = responseData;
        // res.header('Content-Type', 'text/html');//trying to get the html content to the client side, so it displays as html and not show the html tags
        // res.render('poitestold', responseData); //**** assuming that you are using the same place holder names in the handlebars file
        res.render('poitestold', { poiData, activityData, safetyData, locationData });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Failed to get points of interest' });
    }
});

module.exports = router;