import getWeekDay from "./utils/customeDate.js";
import getWeatherData from "./utils/httpReq.js";
import { showModal, removeModal } from "./utils/modal.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const modalButton = document.querySelector(".modal-button");

const initHandler = async () => {
  const currentWeatherData = await getWeatherData("current", "Rasht");
  renderCurrentWeather(currentWeatherData);
  const forecastData = await getWeatherData("forecast", "Rasht");
  renderForecastWeather(forecastData);
};

const renderCurrentWeather = (data) => {
  if (!data) return;

  const weatherJSX = `
            <h1>${data.name}, ${data.sys.country}</h1>
            <div id="main">
            <img src="https://openweathermap.org/img/w/${
              data.weather[0].icon
            }.png" alt="weather icon"/>
            <p>${data.weather[0].main}</p>
            <span>${Math.round(data.main.temp)} °C</span>
            </div>
            <div id="info">
                <p>Humidity: <span>${data.main.humidity} %</span></p>
                <p>Wind Speed: <span> ${data.wind.speed} m/s</span></p>
            </div>
            
    `;

  weatherContainer.innerHTML = weatherJSX;
};

const renderForecastWeather = (data) => {
  if (!data) return;

  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
        <div>
        <img src="https://openweathermap.org/img/w/${
          i.weather[0].icon
        }.png" alt="weather icon"/>
        <h3>${getWeekDay(i.dt)}</h3>
        <p>${Math.round(i.main.temp)} °C</p>
        <span>${i.weather[0].main}</span>
        </div>
        `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("Please enter your city name");
    return;
  }
  const currentWeatherData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentWeatherData);
  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
  const currentWeatherData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currentWeatherData);

  const forecastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(forecastData);
};

const errorCallback = (error) => {
  console.log(error);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("your browser doesnt support geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
