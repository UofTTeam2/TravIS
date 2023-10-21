require('dotenv').config();
const Amadeus = require('./amadeus');
const fetchCityData = require('./geoCode');
const locationScore = require('./locationScore');
const getPOI = require('./poi');
const safeScore = require('./safeScore');
const thingsToDo = require('./toDo');

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

const city = document.getElementById('#cityInput').value;

});