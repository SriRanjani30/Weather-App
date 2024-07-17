document.addEventListener('DOMContentLoaded', () => {
    const defaultCity = 'New York'; // Set your default city here
    setTimeout(() => {
        document.querySelector('.loader-container').style.display = 'none';
        document.getElementById('weatherContainer').style.display = 'block';
        getWeather(defaultCity);
    }, 2000); // Simulate loading delay
});

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
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
    const icon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById('cityName').innerText = cityName;
    document.getElementById('temperature').innerText = `Temperature: ${temperature.toFixed(1)} °C`;
    document.getElementById('description').innerText = `Description: ${description}`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${windSpeed} m/s`;

    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'inline-block';
}
