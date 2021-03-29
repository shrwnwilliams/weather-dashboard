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

function getCity() {
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
      currentTemp.text(data.main.temp + "°F");
      currentHumidity.text(data.main.humidity + "%");
      currentWind.text(data.wind.speed + " mph");
    });
}

formInputEl.on("submit", function (event) {
  event.preventDefault();
  getCity();
  weatherDisplay.removeClass("d-none");
  currentCity.text(userCityInput.val());
  var searchItem = $("<a>")
  searchItem.attr("href", "https://google.com");
  searchItem.text(userCityInput.val());
  pastSearchList.append(searchItem);
});

// Add the searched terms to a list underneath the search bar
// when clicking on the lists in the bar, the weather will change to those cities
// storing past search list items into local storage
// finding different end point for 5 day forecast