require('dotenv').config();

//https://api-ninjas.com/api/geocoding
// city defined for testing purposes
const city = 'Berlin';
// use this line for production, change element id to match input field
// const city = document.getElementById('cityInput').value;
// const apiKey = process.env.GEOCODE_API_KEY;
const apiKey = 'ZqSCB/0BSxQD4+VQ8BG+cA==Exh8YYVi9hdMvbfb';
const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;

async function fetchCityData() {
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
        console.error('Error:', error);
        return null;
    }
}

module.exports = fetchCityData;