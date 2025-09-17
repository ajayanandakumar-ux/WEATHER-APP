const apiKey = "f9d9855e8c5025d430a7275e0c73a101"; 


async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}


function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      },
      () => {
        alert("Location access denied. Please search by city.");
      }
    );
  } else {
    alert("Geolocation not supported in this browser.");
  }
}


async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML = `<p>❌ City not found</p>`;
      return;
    }

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><b>${data.weather[0].main}</b> - ${data.weather[0].description}</p>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>⚠️ Error fetching weather data</p>`;
  }
}
