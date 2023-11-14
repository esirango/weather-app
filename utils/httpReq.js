import { showModal } from "./modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "cfdd558b978c81eff73f50552462c395";

const getWeatherData = async (type, data) => {
  let url = null;
  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&units=metric&appid=${API_KEY}`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${API_KEY}`;
      }
      break;
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&units=metric&appid=${API_KEY}`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${API_KEY}`;
      }

    default:
      url = `${BASE_URL}/forecast?q=rasht&units=metric&appid=${API_KEY}`;
      break;
  }
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
      return json;
    } else {
      showModal(json.message);
    }
  } catch (error) {
    console.log("an error ocuured");
  }
};

export default getWeatherData;
