const Amadeus = require('amadeus');
const fetchCityData = require('./geoCode');
require('dotenv').config();

const amadeus = new Amadeus({
    clientId: 'VQKv0PtyKl6XGnJyaYaHS8UPD9fCeCmb',
    clientSecret: 'TWb8Y2pxxA1Np1UZ',
    // clientId: process.env.AMADEUS_CLIENT_ID,
    // clientSecret: process.env.AMADEUS_CLIENT_SECRET,

});
//get tours and activities
async function safeScore() {
    try {
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const response = await amadeus.safety.safetyRatedLocations.get({
                latitude: lat,
                longitude: lon
            });
            const data = response.result;
            const safeData = data.data;
            console.log(safeData);

            safeData.forEach((safeData) => {
                const areaType = safeData.subType;
                const areaName = safeData.name;
                const lgbtqSafety = safeData.safetyScores.lgbtq;
                const medical = safeData.safetyScores.medical;
                const safeOverall = safeData.safetyScores.overall;
                const physicalHarm = safeData.safetyScores.physicalHarm;
                const politicalFreedom = safeData.safetyScores.politicalFreedom;
                const theft = safeData.safetyScores.theft;
                const women = safeData.safetyScores.women;
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
        // response.render()
    } catch (error) {
        console.log(error);
    }
}
safeScore();