require('dotenv').config();
const Handlebars = require('handlebars');
const fetchCityData = require('./geoCode');
const Amadeus = require('amadeus');
const locationScore = require('./locationScore');
const getPOI = require('./poi');
const safeScore = require('./safeScore');
const thingsToDo = require('./toDo');
const template = require('../../views/poi.handlebars'); // Handlebars template
const compiledTemplate = Handlebars.compile(template); // compiles template

// event listener for city search button
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    // get city name from user input to be used elsewhere
    const city = document.getElementById('cityInput').value;
    console.log(city);

    try {
        const { lat, lon } = await fetchCityData(city);

        // api calls to get data
        // const [poiData, toDoData, safeData, locationData] = await Promise.all([

        // functions here to get data
        
    // ]);


        //compile template with received data
        const renderHTML = compiledTemplate({ poiData, toDoData, safeData, locationData, city });
        
        //update HTML with compiled template
        document.querySelector('#recommendations').innerHTML = renderHTML;

        // show hidden elements with data
        document.querySelector('.hide').classList.remove('hide');
    } catch (error) {
        console.error(error);
    }
});

module.exports = city;