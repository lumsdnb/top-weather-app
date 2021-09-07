const API_KEY = '';
let fetchResult;
let city;

const cityInput = document.getElementById('city-input');
cityInput.addEventListener('keyup', (e) => {
  city = cityInput.value;
  if (e.key === 'Enter') {
    getWeatherForecast();
  }
});

async function getWeatherForecast() {
  const ENDPOINT = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4&aqi=no&alerts=no`;

  try {
    let result = await fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        fetchResult = data;
        console.log(data.current);
        updateDOM();
      });
  } catch (err) {
    alert('location not found');
  }
}

const updateDOM = () => {
  document.getElementById('temp-today').textContent =
    fetchResult.current.temp_c + '°';
  console.log(fetchResult.current.temp_c);
  document.getElementById('humidity-today').textContent =
    fetchResult.current.humidity + ' %';
  document.getElementById('wind-today').textContent =
    fetchResult.current.wind_kph + ' km/h';
  changeWeatherIcon(fetchResult.current.condition.icon);
  document.getElementById('weather-condition').textContent =
    fetchResult.current.condition.text;
};

const changeWeatherIcon = (src) => {
  const weatherIconEl = document.getElementById('weather-icon');
  weatherIconEl.className = '';
  weatherIconEl.src = src;
};
