// Function to fetch the coordinates of a city
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
            const lat = result[0].latitude;
            const lon = result[0].longitude;
            console.log('The Coordinates of', city, 'are:','Latitude:', lat, 'Longitude:', lon);
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

// Function to get the city data and render it to page
const getCityData = async (event) => {
    event.preventDefault();

    try {
        //extract city name from the form
        const cityInput = document.getElementById('cityInput').value;
        const city = await fetchCityData(cityInput);

        //check if city data is available
        if (city) {
            try {
                //fetch city data from server using obtained city coordinates
                const response = await fetch(`/api/poi?lat=${city.lat}&lon=${city.lon}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'text/html' },
                });
                if (response.ok) {
                    //render received html data to recommendations section
                    const resultHTML = await response.text();
                    document.getElementById('recommendations').innerHTML = resultHTML;
                } else {
                    //handle server error responses
                    console.error('Error:', response.statusText);
                    return null;
                }
            } catch (error) {
                //handle network or parsing errors from server response
                console.error('Error:', error.message);
                return null;
            }
        } else {
            //handle invalid city data
            console.error('Invalid city data');
        }
    }catch (error) {
        //handle form validation errors or other issues
        console.error('Error:', error.message);
        return null;
    }
};

// Event listener for the search button
document.getElementById('searchForm').addEventListener('submit', getCityData);
