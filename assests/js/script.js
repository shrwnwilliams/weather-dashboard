var userCityInput = $("#city-search-input");
var formInputEl = $("#city-search");
var todaysDateEl = $("#todays-date");
var weatherDisplay = $("#weather-display");
var currentCity = $("#city-name");
var currentTemp = $("#current-temperature");
var currentHumidity = $("#current-humidity");
var currentWind = $("#current-wind");
var currentUvIndex = $("#current-uv");
var pastSearchList = $("#past-searches");
var today = moment();

todaysDateEl.text(today.format("l"));

function getLatLong() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCityInput.val() +
    "&units=imperial&appid=49e97d128aa0b52b9299b5b1b5a52107";

  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.coord.lat);
      console.log(data.coord.lon);
      getCityWeather(data.coord.lat, data.coord.lon);

    });
}

var getCityWeather = function (lat, lon) {
  var requestWeatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=49e97d128aa0b52b9299b5b1b5a52107";

    fetch(requestWeatherUrl).then(function(response){
      if (response.ok) return response.json();
    }).then(function(data){
      console.log(data);
      currentTemp.text(data.current.temp + "°F");
      currentHumidity.text(data.current.humidity + "%");
      currentWind.text(data.current.wind_speed + " mph");
      if (data.current.uvi >= 7){
        currentUvIndex.addClass("btn btn-danger");
      } else if (data.current.uvi <= 2) {
        currentUvIndex.addClass("btn btn-success");
      } else {
        currentUvIndex.addClass("btn btn-warning");
      }
      currentUvIndex.text(data.current.uvi)
    })
};

formInputEl.on("submit", function (event) {
  event.preventDefault();
  getLatLong();
  weatherDisplay.removeClass("d-none");
  currentCity.text(userCityInput.val());
  var searchItem = $("<div>");
  searchItem.attr("href", "https://google.com");
  searchItem.text(userCityInput.val() + "\n");
  pastSearchList.append(searchItem);
});

// Add the searched terms to a list underneath the search bar
// when clicking on the lists in the bar, the weather will change to those cities
// storing past search list items into local storage
// finding different end point for 5 day forecast
