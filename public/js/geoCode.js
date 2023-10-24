//Description: fetches latitude and longitude of a city based on user input,
// to be used in other API calls
// =============================================================

// Dependencies
require('dotenv').config();
// const city = require('./poiIndex');
// =============================================================

//https://api-ninjas.com/api/geocoding - API documentation
// city defined for testing purposes
// const city = 'Berlin';
// // use next 2 lines for production, change element id to match input field
// const city = document.getElementById('cityInput').value;
// const apiKey = process.env.GEOCODE_API_KEY;
const apiKey = 'ZqSCB/0BSxQD4+VQ8BG+cA==Exh8YYVi9hdMvbfb';//comment out for production
const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;

//API call to get latitude and longitude of city
// =============================================================
async function fetchCityData() {
    // city defined for testing purposes
    // const city = 'Berlin';
    // // use next 2 lines for production, change element id to match input field
    // // const city = document.getElementById('cityInput').value;
    // // const apiKey = process.env.GEOCODE_API_KEY;
    // const apiKey = 'ZqSCB/0BSxQD4+VQ8BG+cA==Exh8YYVi9hdMvbfb';//comment out for production
    // const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            // console.log(result);
            const lat = result[0].latitude;
            const lon = result[0].longitude;
            console.log('Latitude:', lat, 'Longitude:', lon);
            return { lat, lon};
        } else {
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}
// =============================================================
//export function to be used in other files
module.exports = fetchCityData;