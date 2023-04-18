const { set, get } = require("lodash");

console.log("heyy");

const div = document.getElementById("content");
const img = document.getElementById("image");
const weatherCondition = document.getElementById("weather-condition");
const region = document.getElementById("region");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const celsius = document.getElementById("celsius");
const smallCelsius = document.getElementById("small-celsius");

async function getWeatherData(city){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5ff0ce56466745f2bd183651231504&q=${city}`, {mode: 'cors'})
        const weatherData = await response.json();
        if(weatherData.error){
            alert(weatherData.error.message);
            return false;
        }else {
            console.log(weatherData);
            return weatherData;
        }
    }
    catch (err) {
        alert(err);
    }    
}

const search = document.getElementById("search");

let input = "sumgait";
search.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        event.preventDefault();
        input = search.value;
        setWeatherProperties();
    }
})

async function setWeatherProperties() {

    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    const property = await getWeatherData(input);
  
    weatherCondition.textContent = property.current.condition.text;
    region.textContent = property.location.name + ", " + property.location.country;

    temperature.textContent = property.current.temp_c;

    feelsLike.textContent = 'Feels like: ' + property.current.feelslike_c;

    wind.textContent = 'Wind: ' + property.current.wind_kph + 'kph';

    humidity.textContent = 'Humidity: ' + property.current.humidity + '%';
    
    loader.style.display = "none";
}

setWeatherProperties();
