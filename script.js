const API_KEY = "4a4a1c80daaeedd7e593f466c37facf1";
const inputdata = document.getElementById("inputField");  
const showWeather = document.getElementById("showWeather");  

const searchData = async () => {  
    const cityName = inputdata.value.trim();

    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }

    showWeather.innerHTML += `<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span></div>`;  

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
        const fetchData = await fetch(API_URL);
        const response = await fetchData.json();

        if (response.cod === "404") {
            alert(response.message);
        } else {
            showWeather.innerHTML += `
                <div class="weather-card">
                    <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="Weather Icon">
                    <h2>${response.main.temp} °C</h2>
                    <h5>${response.weather[0].main}</h5>
                    <p>${response.name}, ${response.sys.country}</p>
                </div>`;
        }
    } catch (error) {
        alert("Error fetching weather data. Please try again.");
    } finally {
        document.querySelector(".spinner-border").remove();
        inputdata.value = ""; // Clear the input field
    }
};
