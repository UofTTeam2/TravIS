require('dotenv').config();
const Handlebars = require('handlebars');
// const Amadeus = require('amadeus');
// const fetchCityData = require('./geoCode');
const locationScore = require('./locationScore');
const getPOI = require('./poi');
const safeScore = require('./safeScore');
const thingsToDo = require('./toDo');
const template = require('../../views/poi.handlebars');
const compiledTemplate = Handlebars.compile(template);


const city = document.getElementById('cityInput').value;
// const city = 'Berlin';

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    console.log(city);
    try {
        const poiData = await getPOI();
        const toDoData = await thingsToDo();
        const safeData = await safeScore();
        const locationData = await locationScore();

        const renderHTML = compiledTemplate({ poiData, toDoData, safeData, locationData, city });
        document.querySelector('#recommendations').innerHTML = renderHTML;

        document.querySelector('.hide').classList.remove('hide');
    } catch (error) {
        console.error(error);
    }
});

module.exports = city;