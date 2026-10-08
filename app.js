var searchBox = document.querySelector("#search-box");
var weatherOutput = document.querySelector("#weather-output");
var cityName = document.querySelector("#city-name");
var searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener(
    "click",
    async function () {
        var city = searchBox.value.trim();
        searchBox.value =  "";

        var api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21805bff7224936fa25d6cec016a0a4b&units=metric`;
        
        weatherOutput.innerHTML = "";
        cityName.innerHTML = "";


        var response = await fetch(api);
        if(response.status == 404){
            cityName.innerHTML = ` <h1> city does not exist in our database  </h1>`;
            return;
        }

        var data = await response.json();

        cityName.innerHTML = `<h1>${city}</h1>`;
       
        weatherOutput.innerHTML = `
         <div class="status">
                    ${data.weather[0].main}
                </div>
                <div class="weather-icon">
                    <i class="fa-solid fa-cloud"></i>
                </div>
                <div class="temperature">
                    ${data.main.temp}°
                </div>
                <div class="min-max">
                    <span>Min: ${data.main.temp_min}°</span>
                    <span>Max: ${data.main.temp_max}°</span>
                </div>
            
        
        <!-- close weather-info -->

        <!-- Weather Cards -->

        <div class="weather-cards">
            <div class="card">
                <i class="fa-solid fa-temperature-half"></i>
                <div class="card-text">
                    <h3>Real Feel</h3>
                    <p>${data.main.feels_like}°</p>
                </div>
            </div>
            <div class="card">
                <i class="fa-solid fa-droplet"></i>
                <div class="card-text">
                    <h3>Humidity</h3>
                    <p>${data.main.humidity}%</p>
                </div>
            </div>
            <div class="card">
                <i class="fa-solid fa-wind"></i>
                <div class="card-text">
                    <h3>Wind</h3>
                    <p>${data.wind.speed} m/s</p>
                </div>
            </div>
            <div class="card">
                <i class="fa-solid fa-gauge-high"></i>
                <div class="card-text">
                    <h3>Pressure</h3>
                    <p>${data.main.pressure} hPa</p>
                </div>
            </div>
        </div> 
        <!-- close weather-cards -->
        `
    }
)