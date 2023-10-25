// Function to fetch the coordinates of a city
const fetchCityData = async (city) => {
    // const apiKey = process.env.GEOCODE_API_KEY;
    const apiKey = 'ZqSCB/0BSxQD4+VQ8BG+cA==Exh8YYVi9hdMvbfb';
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
            const lat = result[0].latitude;
            const lon = result[0].longitude;
            // console.log('The Coordinates of', city, 'are:','Latitude:', lat, 'Longitude:', lon);
            return { lat, lon };
        } else {
            //handle api errors
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        //handle network or parsing errors
        console.error('Error:', error.message);
        return null;
    }
};

const getCityData = async (event) => {
    event.preventDefault();
    try {
        const cityInput = document.getElementById('cityInput').value;
        console.log(cityInput);
        const city = await fetchCityData(cityInput);
        console.log(city);

        window.location.pathname = `/poi/${city.lat}/${city.lon}/${cityInput}`;

    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};

// Event listener for the search button
document.getElementById('searchForm').addEventListener('submit', getCityData);
