// Function to fetch the city data
const fetchCityData = async (city) => {
    const apiKey = 'ZqSCB/0BSxQD4+VQ8BG+cA==Exh8YYVi9hdMvbfb'; //comment out for production// replace this with the process.env.AMADEUS_API_KEY
    const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            const lat = result[0].latitude; //***** assuming the first result is the correct one
            const lon = result[0].longitude; //***** assuming the first result is the correct one
            console.log('Latitude:', lat, 'Longitude:', lon);
            return { lat, lon };
        } else {
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};

// Function to get the city data
const getCityData = async (event) => {
    event.preventDefault();

    try {
        // const cityInput = document.getElementById('cityInput').value;
        // const city = await fetchCityData('Berlin');

        const response = await fetch('/api/poi?lat=52.5200&lon=13.4050', {
        // const response = await fetch(`/api/poi?lat=${city.lat}&lon=${city.lon}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const resultHTML = await response.text(); // This is the part that I'm not sure about.
            document.getElementById('recommendations').innerHTML = resultHTML;
        } else {
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};

// Event listener for the search button
document.getElementById('searchForm').addEventListener('submit', getCityData);
