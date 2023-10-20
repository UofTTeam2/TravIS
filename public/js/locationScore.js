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
async function locationScore() {
    try {
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const response = await amadeus.location.analytics.categoryRatedAreas.get({
                latitude: lat,
                longitude: lon
            });
            const data = response.result;
            const locationData = data.data;
            // console.log(locationData);

            locationData.forEach((score) => {
                const radius = score.radius;
                const categoryScores = score.categoryScores;

                // Check if categoryScores object and its properties exist
                if (categoryScores && categoryScores.sight && categoryScores.restaurant && categoryScores.shopping && categoryScores.nightLife) {
                    const overallSightsScore = categoryScores.sight.overall;
                    const historicalSightScore = categoryScores.sight.historical;
                    const beachAndParkScore = categoryScores.sight.beachAndPark;
                    const restaurants = categoryScores.restaurant.overall;
                    const vegetarian = categoryScores.restaurant.vegetarian;
                    const shoppingOverall = categoryScores.shopping.overall;
                    const shoppingLuxury = categoryScores.shopping.luxury;
                    const nightLife = categoryScores.nightLife.overall;

                    console.log(`Location score 0-100 within ${radius}m radius:
                        Overall sights: ${overallSightsScore},
                        Historical sights: ${historicalSightScore},
                        Beaches and/or parks: ${beachAndParkScore},
                        Restaurants : ${restaurants},
                        Vegetarian options: ${vegetarian},
                        Overall shopping: ${shoppingOverall},
                        Luxury shopping: ${shoppingLuxury},
                        Nightlife: ${nightLife}`);
                } else {
                    console.log(`Error: Invalid categoryScores data for area with radius ${radius}m`);
                }
            });
        } else {
            console.log('Error: no latitude/longitude data');
        }
        // response.render()
    } catch (error) {
        console.log(error);
    }
}
locationScore();

module.exports = locationScore;