const fetchCityData = async (city) => {
    try {
        const response = await fetch(`/api/city?city=${city}`);
        if (response.ok) {
            const result = await response.json();
            const lat = result.lat;
            const lon = result.lon;
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
