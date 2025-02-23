
let API = "https://api.weatherapi.com/v1/forecast.json?key=9559b457c5ef4c1aac4233115241212&days=3"
let searchArea = document.getElementById("search-area");
let fullDate = new Date();

let day = fullDate.getDay();
let date = fullDate.getDate();
let month = fullDate.getMonth();
let nextday = day + 1;
let TheDayAfterTheNext = nextday + 1;

if (day == 6) {
    nextday = 0;
    TheDayAfterTheNext = 1;
}

if (nextday == 6) {
    TheDayAfterTheNext = 0;
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

let today = days[day];
let tomorrow = days[nextday];
let TheDayAfterTomorrow = days[TheDayAfterTheNext];
let currentMonth = months[month];
async function getWeather(city) {
    let req = await fetch(`${API}&q=${city ? city : "alexandria"}`);
    let data = await req.json();
    display(data);

}
function search() {
    searchInput = searchArea.value;
    if (searchInput.length >= 3) {
        getWeather(searchInput);
    }
}
function display(data) {
    let current = data.current;
    let tomorrowData = data.forecast.forecastday[1].day;
    let TheDayAfterTomorrowData = data.forecast.forecastday[2].day;
    let location = data.location;
    let cartoona = ` 
    <div class='row mx-auto my-5'>
    <div class="col-xl-4 px-0   ">
    <div class="card border-0 ">
        <div class="card-header rounded-0 odd-head ">
            <div class="d-flex justify-content-between align-items-center">
                <p class="m-0">${today}</p>
                <p class="m-0">${date} ${currentMonth}</p>
            </div>
        </div>
        <div class="card-body odd-body">
            <p id="weather-location " class="fs-5">${data.location.name}</p>
            <div class="d-flex flex-column">
                <h1 id="weather-temp" class="display-1 text-white fw-bolder">${current.temp_c}°C</h1>
                <img width="70px" src=${current.condition.icon} alt="">
            </div>
            <p id="weather-desc" class="mt-3 blue-text">${current.condition.text}</p>

            <div class="d-flex gap-2 justify-content-between w-50 pt-4 pb-2">
                <div class="img-one d-flex align-items-center gap-2">
                    <img width="25px" src="imgs/icon-umberella.png" alt="umberella">
                    <p class="mb-0">20%</p>
                </div>

                <div class="img-one d-flex align-items-center gap-2">
                    <img width="25px" src="imgs/icon-wind.png" alt="umberella">
                    <p class="mb-0">28%</p>
                </div>

                <div class="img-one d-flex align-items-center gap-2">
                    <img width="25px" src="imgs/icon-compass.png" alt="umberella">
                    <p class="mb-0">21%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 px-0">
        <div class="card border-0 h-100">
            <div class="card-header rounded-0 even-head text-center">
                <p class="mb-0">${tomorrow}</p>
            </div>
            <div
            class="card-body even-body d-flex flex-column justify-content-center align-content-center ">
            <div class="text-center"><img width="60px" src=${tomorrowData.condition.icon} alt=""></div>
            <div class="text-center">
                <p class="m-0 fs-4 text-white fw-bold" id="sec-day-max-deg">${tomorrowData.maxtemp_c}°C</p>
                <p class="mb-0 fs-6" id="sec-day-min-deg">${tomorrowData.mintemp_c}°C</p>
            </div>
            <p id="sec-day-desc" class="mt-3 text-center blue-text">${tomorrowData.condition.text}</p>
        </div>
    </div>
</div>
<div class="col-xl-4 px-0">
    <div class="card border-0 h-100">
        <div class="card-header rounded-0 odd-head text-center">
            <p class="mb-0">${TheDayAfterTomorrow}</p>
        </div>
        <div class="card-body odd-body d-flex flex-column justify-content-center align-content-center ">
            <div class="text-center"><img width="60px" src=${TheDayAfterTomorrowData.condition.icon}  alt=""></div>
            <div class="text-center">
                <p class="m-0 fs-4 text-white fw-bold" id="sec-day-max-deg">${TheDayAfterTomorrowData.maxtemp_c}°C</p>
                <p class="mb-0 fs-6" id="sec-day-min-deg">${TheDayAfterTomorrowData.mintemp_c}°C</p>
            </div>
            <p id="sec-day-desc" class="mt-3 text-center blue-text">${TheDayAfterTomorrowData.condition.text}</p>
        </div>
    </div>
</div>
</div>`

    document.getElementById("weather-details").innerHTML = cartoona;
}
searchArea.addEventListener("input", search);

getWeather();
