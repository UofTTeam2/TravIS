//Description: fetches safety scores for a city out of 100
// =============================================================

// Dependencies
// =============================================================
const Amadeus = require('amadeus');
const fetchCityData = require('./geoCode'); //gets coordinates of user's location from geoCode.js
require('dotenv').config();
// =============================================================

// Amadeus API call
// =============================================================
const amadeus = new Amadeus({
    clientId: 'VQKv0PtyKl6XGnJyaYaHS8UPD9fCeCmb',
    clientSecret: 'TWb8Y2pxxA1Np1UZ',
    // clientId: process.env.AMADEUS_CLIENT_ID,
    // clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});
//get safety scores for user's location, after getting latitude and longitude of user's location first
async function safeScore() {
    try {
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const response = await amadeus.safety.safetyRatedLocations.get({
                latitude: lat,
                longitude: lon,
            });
            const data = response.result;
            const safeData = data.data;
            // console.log(safeData);

            safeData.forEach((safeScore) => {
                const areaType = safeScore.subType;
                const areaName = safeScore.name;
                const lgbtqSafety = safeScore.safetyScores.lgbtq;
                const medical = safeScore.safetyScores.medical;
                const safeOverall = safeScore.safetyScores.overall;
                const physicalHarm = safeScore.safetyScores.physicalHarm;
                const politicalFreedom =
                    safeScore.safetyScores.politicalFreedom;
                const theft = safeScore.safetyScores.theft;
                const women = safeScore.safetyScores.women;
                console.log(`Safety Scores 0-100 for ${areaName}, ${areaType}:
                Safety for LBTQ: ${lgbtqSafety},
                Health and medical: ${medical},
                Overall Safety Score: ${safeOverall},
                Physical threat: ${physicalHarm},
                Political freedom: ${politicalFreedom},
                Theft: ${theft},
                Safety for women: ${women}`);
            });
        } else {
            console.log('Error: no latitude/longitude data');
        }
        // response.render('test', { safeData }); //render safeData to test.handlebars
    } catch (error) {
        console.log('Error', error.message);
    }
}
// =============================================================
// invoke function to get safety scores
safeScore();
// =============================================================
// export safeScore function
module.exports = safeScore;