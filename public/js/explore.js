require('dotenv').config();

// Element IDs
const searchSection = document.getElementById('searchsection');
const tourSection = document.getElementById('toursection');
const safetySection = document.getElementById('safetysection');
const locSection = document.getElementById('locsection');
const poiSection = document.getElementById('poisection');

// Element Classes
const searchDiv = document.querySelector('.search');
const toursDiv = document.querySelector('.tours');
const safetyDiv = document.querySelector('.safety');
const locDiv = document.querySelector('.loc');
const poiDiv = document.querySelector('.poi');

// Hide all sections (use this function when the page loads)
const hideAll = () => {
    tourSection.style.display = 'none';
    safetySection.style.display = 'none';
    locSection.style.display = 'none';
    poiSection.style.display = 'none';
};

//Show all sections (use this function when the user clicks on the search button)
const showAll = () => {
    tourSection.style.display = 'block';
    safetySection.style.display = 'block';
    locSection.style.display = 'block';
    poiSection.style.display = 'block';
};

// GeoCode API call to get latitude and longitude of city
async function fetchCityData(city) {

    // // use next 2 lines for production, change element id to match input field
    // // const city = document.getElementById('cityInput').value;
    const apiKey = process.env.GEOCODE_API_KEY;
    // const apiKey = 'ZqSCB/0BSxQD4+VQ8BG+cA==Exh8YYVi9hdMvbfb';//comment out for production
    const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
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
            const lat = result[0].latitude;
            const lon = result[0].longitude;
            console.log('Latitude:', lat, 'Longitude:', lon);
            return { lat, lon };
        } else {
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// Event listener for the search button
document.getElementById('searchForm').addEventListener('submit', async event => {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    if (city) {
        const cityData = await fetchCityData(city);
        if (cityData) {
            const lon = cityData.lon;
            const lat = cityData.lat;
            console.log('Coordinates for', city, 'are:','Latitude:', lat, 'Longitude:', lon);
            showAll(); // Show all sections
        } else {
            console.error('Failed to fetch city data');
        }
    } else {
        console.error('Invalid city data');
    }
});



