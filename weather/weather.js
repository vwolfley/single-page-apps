// https://openweathermap.org/current
// https://openweathermap.org/weathermap
// https://api-ninjas.com/

// Listen for form submission
document
    .getElementById("weatherForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the value from the input field
        const city = document.getElementById("location").value.trim();

        // Call the API function with the city name
        locationApiFetch(city);
    });

// The function to call the location api
async function locationApiFetch(city) {
    const url = `https://api.api-ninjas.com/v1/city?name=${city}`;
    const options = {
        method: "GET",
        headers: {
            "X-Api-Key": "JqVU78FmGF8DRs5wmCnWaA==BYYns69uqwTlcmyd",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            // console.log(result);
            // console.log(result[0].latitude, result[0].longitude);
            weatherApiFetch(result[0].latitude, result[0].longitude);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

async function weatherApiFetch(lat, lon) {
    const apiKey = "0aec6412eede92415f476e7030db63f4";
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    // console.log(data);

    // Retrieve city name from input field
    const city = document.getElementById("location").value.trim();

    // Get references to DOM elements
    const locationDisplay = document.querySelector("#location-display");
    const tempArea = document.querySelector(".temp-area");
    const captionDesc = document.querySelector("#weather-description");
    const feelsLike = document.querySelector("#feels-like");
    const windSpeed = document.querySelector("#wind-speed");
    const humidity = document.querySelector("#humidity");

    // Clear any previous weather icon and temperature before adding new ones
    tempArea.innerHTML = '';

    // Create and append elements dynamically
    const weatherIcon = document.createElement("img");
    const currentTemp = document.createElement("span");

    // Set attributes for temperature and icon elements
    currentTemp.setAttribute("id", "current-temp");
    weatherIcon.setAttribute("width", "100");
    weatherIcon.setAttribute("height", "100");

    tempArea.append(weatherIcon, currentTemp);

    // Destructure the `data.current` object for easier access
    const { temp, feels_like, wind_speed, humidity: humidityValue, weather } = data.current;

    // Format temperature to show no decimal points
    const formattedTemp = temp.toFixed(0);
    currentTemp.innerHTML = `${formattedTemp}&deg;F`;

    // Display other weather information
    feelsLike.innerHTML = `${feels_like.toFixed(0)}&deg;F`;
    windSpeed.innerHTML = `${wind_speed.toFixed(0)}mph`;
    humidity.innerHTML = `${humidityValue}%`;

    // Display weather icon and description
    if (weather.length > 0) {
        const { icon, description } = weather[0]; // Get first weather event
        const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", description);

        captionDesc.innerHTML = description;
    }

    // Update the city name display in a safe element, not the input field
    locationDisplay.innerHTML = city.toUpperCase();
}

