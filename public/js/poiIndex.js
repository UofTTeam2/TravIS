
// require('dotenv').config();
// const Handlebars = require('handlebars');

// document.getElementById('searchForm').addEventListener('submit', async function(event) {
//     event.preventDefault();
//     const city = document.getElementById('cityInput').value;

//     try {
//         const response = await fetch(`/poi?city=${city}`);
//         const responseData = await response.json();

//         // Compile Handlebars template
//         const template = require('../../views/poi.handlebars');
//         const compiledTemplate = Handlebars.compile(template);

//         // Compile template with received data
//         const renderHTML = compiledTemplate(responseData);

//         // Update HTML with compiled template
//         document.querySelector('#recommendations').innerHTML = renderHTML;

//         // Show hidden elements with data
//         document.querySelector('.hide').classList.remove('hide');
//     } catch (error) {
//         console.error(error);
//     }
// });
require('dotenv').config();
const Handlebars = require('handlebars');
console.log('hello');

// Event listener for the form submission
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    // const city = document.getElementById('cityInput').value;
    const city = 'Berlin';

    try {
        const response = await fetch(`api/poi?city=${city}`);
        const responseData = await response.json();

        // Get the template from the HTML using its ID
        const template = document.getElementById('poi-template').innerHTML;

        // Compile the template with Handlebars
        const compiledTemplate = Handlebars.compile(template);
        console.log(template);

        // Compile template with received data
        const renderHTML = compiledTemplate(responseData);
        console.log(responseData);

        // Update HTML with compiled template
        document.querySelector('#recommendations').innerHTML = renderHTML;

        // Show hidden elements with data
        document.querySelector('.hide').classList.remove('hide');
    } catch (error) {
        console.error(error);
    }
});