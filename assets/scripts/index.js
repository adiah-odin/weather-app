const apiKey = "d405777b1ce44f4c8fc154934231004";

// async function weather(url = "") {
//   const response = await fetch(url, {});
// }

const baseUrl = "https://api.weatherapi.com/v1";

// async function weather(url = "", data = {}) {
//   const response = await fetch(url, {});
//   const weatherData = await response.json();
//   return weatherData;
// }

// // weather api call
// const WeatherData = weather(`${baseUrl}/current.json?key=${apiKey}&q=auto:ip`);
// console.log(WeatherData);

// ---------------------------------------

// fetch(`${baseUrl}/current.json?key=${apiKey}&q=auto:ip`)
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// ---------------------------------------

// async function fetchWeather() {
//   const response = await fetch(
//     `${baseUrl}/current.json?key=${apiKey}&q=auto:ip`
//   );
//   const weatherData = response.json();
//   return weatherData;
// }

// fetchWeather().then((weatherData) => console.log(weatherData));

// ---------------------------------------

// async function getWeather() {
//   const response = await fetch(
//     `${baseUrl}/current.json?key=${apiKey}&q=auto:ip`,
//     { mode: "cors" }
//   );
//   const weatherData = await response.json();
// }

// getWeather();

// ----------------------------------------

// fetch wrapper
async function getWeather(url = "", data = {}) {
  const response = await fetch(url, {});
  return response.json();
}

// get current weather
const getCurrentWeather = (location) => {
  getWeather(`${baseUrl}/current.json?key=${apiKey}&q=${location}`).then(
    (data) => displayWeather(data)
  );
};

document.addEventListener("DOMContentLoaded", getCurrentWeather("auto:ip"));

// get seven day forecast

const getForecast = () => {
  getWeather(
    `${baseUrl}/forecast.json?key=${apiKey}&q=auto:ip&days=7&aqi=no&alerts=no}`
  ).then((data) => console.log(data));
};

// Get the relevant data for the app
// time, location, weather conditions
// getForecast();
// data[current][gust_kph]
// data[current][gust_mph]

const extractCurrentData = (data) => {
  const condition = data.current.condition.text;
  const conditionImage = data.current.condition.icon;
  const tempCelsius = data.current.temp_c;
  const tempFahrenheit = data.current.temp_f;
  const feelsLikeCelsius = data.current.feelslike_c;
  const feelslikeFahrenheit = data.current.feelslike_f;
  const precipitationInches = data.current.precip_in;
  const precipitationMetric = data.current.precip_mm;
  const humidity = data.current.humidity;
  const uv = data.current.uv;
  const wind_mph = data.current.wind_mph;
  const wind_kph = data.current.wind_kph;

  const country = data.location.country;
  const city = data.location.name;
  const latitude = data.location.lat;
  const longitude = data.location.lon;
  const time = data.location.localtime;

  return {
    time,
    location: { country, city, coordinates: { latitude, longitude } },
    weather: {
      temperature: {
        actual: { celsius: tempCelsius, fahrenheit: tempFahrenheit },
        feelsLike: {
          celsius: feelsLikeCelsius,
          fahrenheit: feelslikeFahrenheit,
        },
      },
      precipitation: {
        inches: precipitationInches,
        mm: precipitationMetric,
      },
      wind: { wind_mph, wind_kph },
      humidity,
      uv,
      description: { condition, conditionImage },
    },
  };
};

const displayWeather = (data) => {
  const weather = extractCurrentData(data);
  // console.log(weather);
  const condition = document.getElementById("weatherCondition");
  condition.innerHTML = weather.weather.description.condition;

  const temperature = document.getElementById("temperature");
  temperature.innerHTML = `${weather.weather.temperature.actual.celsius}°C`;

  const date = document.getElementById("date");
  date.innerHTML = weather.time;

  const location = document.getElementById("location");
  location.innerHTML = `${weather.location.city}, ${weather.location.country}`;

  const feelsLike = document.querySelector("#feelsLike .data__value");
  feelsLike.innerHTML = `${weather.weather.temperature.feelsLike.celsius}°C`;

  const humidity = document.querySelector("#humidity .data__value");
  humidity.innerHTML = `${weather.weather.humidity}%`;

  const windSpeed = document.querySelector("#windSpeed .data__value");
  windSpeed.innerHTML = `${weather.weather.wind.wind_kph}kph`;
};

const form = document.getElementById("cityForm");
// const formData = new FormData(form);
form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const city = formData.get("city");
  // try {
  //   getCurrentWeather(city);
  //   form.reset();
  // } catch (error) {
  //   console.error(error);
  // }
  getCurrentWeather(city);
  formData.reset;
};
