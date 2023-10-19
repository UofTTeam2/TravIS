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
async function thingsToDo() {
    try {
        const { lat, lon } = await fetchCityData();
        if (lat && lon) {
            const response = await amadeus.shopping.activities.get({
                latitude: lat,
                longitude: lon
            });
            const data = response.result;
            const toDoData = data.data;
            console.log(toDoData);

            toDoData.forEach((toDo) => {
                const toDoName = toDo.name;
                const toDoDescription = toDo.description;
                const toDoPrice = toDo.price;
                const toDoPics = toDo.pictures;
                const toDoBooking = toDo.bookingLink;
                const toDoDuration = toDo.minimumDuration;
                console.log(`name: ${toDoName}, 
                description: ${toDoDescription},
                price: ${toDoPrice}, 
                pictures: ${toDoPics}, 
                booking_link: ${toDoBooking},
                minimum_duration: ${toDoDuration}`);
            });
        } else {
            console.log('Error: no latitude/longitude data');
        }
        // response.render()
    } catch (error) {
        console.log(error);
    }
}

thingsToDo();

// endpoint from npm documentation:
// amadeus.shopping.activities.get({
//     latitude : 41.397158,
//     longitude : 2.160873
//   }).then(function(response){
//     console.log(response.body);   //=> The raw body
//     console.log(response.result); //=> The fully parsed result
//     console.log(response.data);   //=> The data attribute taken from the result
//   }).catch(function(error){
//     console.log(error.response); //=> The response object with (un)parsed data
//     console.log(error.response.request); //=> The details of the request made
//     console.log(error.code); //=> A unique error code to identify the type of error
//   });

