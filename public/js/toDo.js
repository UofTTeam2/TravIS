//Desc: this file gets the coordinates of the user's location and then uses those coordinates
//to get a list of recommended tours and activities from the Amadeus API.
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
    clientId: 'VQKv0PtyKl6XGnJyaYaHS8UPD9fCeCmb', //delete for production
    clientSecret: 'TWb8Y2pxxA1Np1UZ', //delete for production
    // clientId: process.env.AMADEUS_CLIENT_ID,
    // clientSecret: process.env.AMADEUS_CLIENT_SECRET,

});
//get tours and activities for user's location
async function thingsToDo() {
    try {
        //get latitude and longitude of user's location first before making API call
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const response = await amadeus.shopping.activities.get({
                latitude: lat,
                longitude: lon
            });
            const data = response.result;
            const toDoData = data.data;
            // console.log(toDoData);

            toDoData.forEach((toDo) => {
                const toDoName = toDo.name;
                const toDoDescription = toDo.description;
                //set default values for price and currency, in case they are not available
                let toDoPrice = 'N/A';
                let toDoCurrency = 'N/A';
                let toDoBooking = 'N/A';

                // Check if price object and its properties exist, then assign values
                if (toDo.price && toDo.price.amount && toDo.price.currencyCode && toDo.bookingLink) {
                    toDoPrice = toDo.price.amount;
                    toDoCurrency = toDo.price.currencyCode;
                    toDoBooking = toDo.bookingLink;
                }
                const toDoPics = toDo.pictures;
                const toDoDuration = toDo.minimumDuration;
                console.log(`Here are some recommended activities for your location:
                name: ${toDoName}, 
                description: ${toDoDescription},
                price: ${toDoPrice} ${toDoCurrency}, 
                pictures: ${toDoPics}, 
                booking_link: ${toDoBooking},
                minimum_duration: ${toDoDuration}`);
            });
        } else {
            console.log('Error: no latitude/longitude data');
        }
        // response.render('test', { toDoData }); //render toDoData to test.handlebars
    } catch (error) {
        console.log('Error:', error.message);
    }
}
// =============================================================
// invoke function to get tours and activities
// thingsToDo();
// =============================================================
// export thingsToDo function
module.exports = thingsToDo;