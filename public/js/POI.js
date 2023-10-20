const fetchCityData = require('./geoCode');
const Amadeus = require('amadeus');
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: 'VQKv0PtyKl6XGnJyaYaHS8UPD9fCeCmb',
    clientSecret: 'TWb8Y2pxxA1Np1UZ',
    // clientId: process.env.AMADEUS_CLIENT_ID,
    // clientSecret: process.env.AMADEUS_CLIENT_SECRET,

});

//get name and category of POI
async function getPOI() {
    try {
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const response = await amadeus.referenceData.locations.pointsOfInterest.get({
                // latitude: 41.397158,
                // longitude: 2.160873
                latitude: lat,
                longitude: lon
            });
            const data = response.result;
            const poiData = data.data;

            poiData.forEach((poi) => {
                const poiName = poi.name;
                const poiCategory = poi.category;
                console.log(`name: ${poiName}, category: ${poiCategory}`);
            });
        } else {
            console.log('Error: no latitude/longitude data');
        }
        // response.render()
    }catch(err) {
        console.log(err);
    }
}

getPOI();

module.exports = getPOI;