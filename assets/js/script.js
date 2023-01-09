/*

Create input form
Save input form information to local storage
Show previous searches from local storage onto page
Make previous searches clickable
Add weather api
User weather api to fetch current weather for selected city
User weather api to fetch 5 day forecast for each city
Add display icons for different kinds of weather that show up for each kind of weather.

*/

var searchBar = document.getElementById("search-city");
var searchForm = document.getElementById("search-form");

var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];


function fetchRequest(city){
fetch('api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       // This is where I'm putting all of my functionality
       // Get lat and lon variables ; fetch within a fetch. 

        console.log(data);
    });
}

searchForm.addEventListener("submit", function(event){
    event.preventDefault();
    var cityName = searchBar.value;
    console.log(cityName);
    fetchRequest(cityName);
    console.log("submited");
})