import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import, file name and path for other js files

// Business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

// UI Logic

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) {
  const temperatureFahrenheit = kelvinToFahrenheit(apiResponse.main.temp);
  const humidity = apiResponse.main.humidity;
  const weatherDescription = apiResponse.weather[0].description;
  const windSpeed = apiResponse.wind.speed;

  document.querySelector(`#showResponse`).innerText = `Weather in ${city}:
    - Temperature: ${temperatureFahrenheit}degrees Fahrenheit
    - Humidity: ${humidity}%
    - Weather Description: ${weatherDescription}
    - Wind Speed: ${windSpeed} meter/sec`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
