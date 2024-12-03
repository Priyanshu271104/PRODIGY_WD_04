const apiKey = '437a1a2e27d8a5bbfe8a78e0a8ff2d00';  // Replace with your OpenWeatherMap API key

// Function to fetch weather data by city name
function getWeatherByCity() {
  const city = document.getElementById('location').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert('City not found!');
      }
    })
    .catch(error => alert('Error fetching weather data'));
}

// Function to fetch weather data by user's geolocation
function getWeatherByGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          displayWeather(data);
        })
        .catch(error => alert('Error fetching weather data'));
    }, () => {
      alert('Geolocation is not supported by this browser or permission denied.');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Function to display weather data on the webpage (without image)
function displayWeather(data) {
  // Display location and weather data
  document.getElementById('location-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

  // Hide the weather icon section (as we've removed it)
  document.getElementById('weather-info').style.display = 'block';
}
