require('dotenv').config();
// const Amadeus = require('amadeus');
// const fetchCityData = require('./geoCode');
const locationScore = require('./locationScore');
const getPOI = require('./poi');
const safeScore = require('./safeScore');
const thingsToDo = require('./toDo');
const template = require('../../views/poi.handlebars');
const city = document.getElementById('cityInput').value;

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    // console.log(city);
    const poiData = await getPOI(city);
    const toDoData = await thingsToDo(city);
    const safeData = await safeScore(city);
    const locationData = await locationScore(city);

    console.log(poiData);
    console.log(toDoData);
    console.log(safeData);
    console.log(locationData);

    document.querySelector('.hide').classList.remove('hide');

    const renderHTML = template({ poiData, toDoData, safeData, locationData });
    document.querySelector('recommendations').innerHTML = renderHTML;
});
module.exports = city;