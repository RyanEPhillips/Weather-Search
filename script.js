const API_KEY = 'c70c0ce324534fb7b82163146240307';
const weatherAPIurl = 'https://api.weatherapi.com/v1/current.json';


async function getLocation() {
    const zipCode = document.getElementById('zip').value.trim();
    if (zipCode.length !== 5 || isNaN(zipCode)) {
        displayError('Enter valid 5 digit zip code');
        return;
    }

    const requesturl = `${weatherAPIurl}?key=${API_KEY}&q=${zipCode}`;
    try {
        const response = await fetch(requesturl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error);
        displayError('Failed to fetch weather data');
    }
}       

document.getElementById('zip').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        getLocation();
    }
});    
function displayWeather(data) {
    const { temp_f, wind_mph, cloud, humidity, } = data.current;
    const city = data.location.name;
    const weatherResults = `
        <p>City: ${city}
        <p>Temperature: ${temp_f} °F</p>
        <p>Cloudy: ${cloud}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${wind_mph} mph</p>
    `;

    document.getElementById('weatherResults').innerHTML = weatherResults;
}

function displayError(message) {
    document.getElementById('weatherResults').innerHTML = `<p>${message}</p>`;
}