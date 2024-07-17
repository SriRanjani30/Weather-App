document.addEventListener('DOMContentLoaded', () => {
    const defaultCity = 'New York'; // Set your default city here
    getWeather(defaultCity);
});

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

async function getWeather(city) {
    const apiKey = 'API Key'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById('cityName').innerText = cityName;
    document.getElementById('temperature').innerText = `Temperature: ${temperature} °C`;
    document.getElementById('description').innerText = `Description: ${description}`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${windSpeed} m/s`;
}
