//Connects variables to html file
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var weatherDisp = document.querySelector(".weather-disp");
var cityLi = document.querySelector(".city-list");

//Empty array for local storage
var searchedCities = [];

// Key from OpenWeatherMap
var apiKey = "b05887e3a76e62ee89a118e66b1c531c";


//Searches the cities and fetches the data
function weatherSearch(event) {
  event.preventDefault();
  weatherDisp.innerHTML = "";
  var searchedCity = searchInput.value.trim();

  if (searchedCity) {
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=imperial`;
    fetch(currentWeather).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          weatherNow(data);
        });
      }
    });
    var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=imperial`;
    fetch(forecast).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          fiveDay(data);
        });
      }
    });

    searchedCities.push(searchedCity);
    searchInput.value = "";
    saveCities();
    cityHistory();
  } else {
    window.alert("Please enter a city name");
    return;
  }
}


// Saves searches to local storage
function saveCities() {
  localStorage.setItem("Previous City", JSON.stringify(searchedCities));
}
function cityHistory() {
  cityLi.innerHTML = "";
  for (let i = 0; i < searchedCities.length; i++) {
    var city = searchedCities[i];
    var button = document.createElement("button");
    button.textContent = city.toUpperCase();
    button.classList = "btn btn-primary";
    button.id = "new-btn";
    cityLi.appendChild(button);
  }
}

// Populates the container for current weather
function weatherNow(data) {
  var currentDate = "Current Date";
  var dateEl = document.createElement("div");
  var headerEl = document.createElement("h2");
  var conditionEl = document.createElement("ul");
  var tempEl = document.createElement("li");
  var humidityEl = document.createElement("li");
  var windEl = document.createElement("li");
  var imgEl = document.createElement("img");
  var picEl =
    "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

  imgEl.setAttribute("src", picEl);
  imgEl.setAttribute("id", "IconImg");
  dateEl.className = "item";
  dateEl.id = "current-weather";

  dateEl.appendChild(headerEl);
  dateEl.appendChild(conditionEl);
  dateEl.appendChild(tempEl);
  dateEl.appendChild(humidityEl);
  dateEl.appendChild(windEl);
  dateEl.appendChild(imgEl);
  weatherDisp.appendChild(dateEl);

  headerEl.textContent = currentDate;
  tempEl.textContent = " Temp: " + data.main.temp + " ℉";
  humidityEl.textContent = " Humidty: " + data.main.humidity;
  windEl.textContent = " Wind speed: " + data.wind.speed;
}

// Builds 5 containers for 5day forecast
function fiveDay(data) {
  var futureCast = data.list;
  for (let i = 1; i < futureCast.length; i += 8) {
    var forecastDivs = document.createElement("div");
    forecastDivs.classList = "item Day";
    var day = dayjs(futureCast[i].dt_txt).format("M/DD/YYYY");
    var weatherIcon = futureCast[i].weather[0].icon;

    forecastDivs.innerHTML = `<h2>${day}</h2>
      <ul>
      <li>Temp: ${futureCast[i].main.temp} ℉ </li>
      <li> Humidity: ${futureCast[i].main.humidity}</li>
      <li> Wind Speed: ${futureCast[i].wind.speed}</li>
      <img src= http://openweathermap.org/img/w/${weatherIcon}.png>
      </ul>`;
    weatherDisp.appendChild(forecastDivs);
  }
}

// Creates the fetched data from past searches
function pastSearch(event) {
  weatherDisp.innerHTML = "";
  var searchedCity = event.target.innerHTML;

  if (searchedCity) {
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=imperial`;
    fetch(currentWeather).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          weatherNow(data);
        });
      }
    });
    var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=imperial`;
    fetch(forecast).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          fiveDay(data);
        });
      }
    });
  }
}

function init() {
  var savedCities = JSON.parse(localStorage.getItem("Previous City"));
  if (savedCities !== null) {
    searchedCities = savedCities;
  }
  cityHistory();
}

searchForm.addEventListener("click", weatherSearch);

cityLi.addEventListener("click", pastSearch);

init();
