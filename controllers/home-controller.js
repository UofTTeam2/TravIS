// Desc: This file will handle all of the home routes for the application
// =============================================================

// Dependencies, Models, and Middleware
// =============================================================
// const express = require('express');
const router = require('express').Router();
const https = require('https');
const { User, Trip, Location } = require('../models');
const loginAuth = require('../utils/auth');
const Amadeus = require('amadeus');


require('dotenv').config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    hostname: 'production' //use this to switch to production server, switch keys in .env file
});

//Get route for the signup page
// =============================================================
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});
//==============================================================

//Get route for the login page
// =============================================================
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
//==============================================================
router.get('/search', (req, res) => {
    res.render('search');
});

//used chat gpt to help move code to back end for security reasons
router.get('/api/city', async (req, res) => {
    const { city } = req.query;
    try {
        const apiKey = process.env.GEOCODE_API_KEY;
        const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;

        https.get(apiUrl, { headers: { 'X-Api-Key': apiKey } }, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    const lat = result[0].latitude;
                    const lon = result[0].longitude;
                    res.status(200).json({ lat, lon });
                } catch (error) {
                    console.error('Error:', error.message);
                    res.status(500).json({ error: 'Error parsing city data' });
                }
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error fetching city data' });
    }
});

router.get('/poi/:lat/:lon/:city', async (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const city = req.params.city;

    try {
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
        const activityData = await activityResponse.result.data;
        const safetyData = await safetyResponse.result.data;
        const locationData = await locationResponse.result.data;

        res.status(200).render('cityResults', {poiData, activityData, safetyData, locationData, city});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Our server is on vacation mode, please try again' });
        console.error('Error: server error, try again', error.message);
    }
});

router.get('/', (req, res) => {
    res.render('homepage');
});

module.exports = router;