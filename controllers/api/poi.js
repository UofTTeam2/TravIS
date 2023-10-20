// const express = require('express');
const router = require('express').Router();
const Amadeus = require('amadeus');
require('dotenv').config();
const fetchCityData = require('../../public/js/geoCode');

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    // hostname: 'production'
});

router.get('/', async (req, res) => {

    try{
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const response = await amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: lat,
                longitude: lon
            });
            const data = response.result;
            const poiData = data.data;
            // console.log(poiData);
            res.render('Points of Interest', { poiData: poiData });
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