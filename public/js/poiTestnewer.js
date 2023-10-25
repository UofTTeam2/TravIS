document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cityInput = document.getElementById('cityInput').value;

    try {
        // Fetch data from server using city input
        const response = await fetch('/api/poi/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city: cityInput }),
        });

        if (response.ok) {
            const resultHTML = await response.text();
            document.getElementById('recommendations').innerHTML = resultHTML;
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});