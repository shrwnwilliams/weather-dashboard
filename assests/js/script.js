$(document).ready(function () {
  var userCityInput = $("#city-search-input");
  var formInputEl = $("#city-search");
  var todaysDateEl = $("#todays-date");
  var weatherDisplay = $("#weather-display");
  var fiveDayDisplay = $("#5-day-forecast");
  var currentCity = $("#city-name");
  var currentTemp = $("#current-temperature");
  var currentHumidity = $("#current-humidity");
  var currentWind = $("#current-wind");
  var currentUvIndex = $("#current-uv");
  var pastSearchList = $("#past-searches");

  var dayOneHigh = $("#1-day-high");
  var dayOneLow = $("#1-day-low");
  var dayOneHumidity = $("#1-day-humid");
  var dayOneDisplay = $("#weather-disp-1");

  var dayTwoHigh = $("#2-day-high");
  var dayTwoLow = $("#2-day-low");
  var dayTwoHumidity = $("#2-day-humid");
  var dayTwoDisplay = $("#weather-disp-2");

  var dayThreeHigh = $("#3-day-high");
  var dayThreeLow = $("#3-day-low");
  var dayThreeHumidity = $("#3-day-humid");
  var dayThreeDisplay = $("#weather-disp-3");

  var dayFourHigh = $("#4-day-high");
  var dayFourLow = $("#4-day-low");
  var dayFourHumidity = $("#4-day-humid");
  var dayFourDisplay = $("#weather-disp-4");

  var dayFiveHigh = $("#5-day-high");
  var dayFiveLow = $("#5-day-low");
  var dayFiveHumidity = $("#5-day-humid");
  var dayFiveDisplay = $("#weather-disp-5");

  var today = moment();
  var searchHistory = JSON.parse(localStorage.getItem("history")) || [];

  todaysDateEl.text(today.format("l"));

  function getLatLong(city) {
    var requestUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=49e97d128aa0b52b9299b5b1b5a52107";

    fetch(requestUrl)
      .then(function (response) {
        if (response.ok) return response.json();
      })
      .then(function (data) {
        console.log(data);
        currentCity.text(data.name);
        // console.log(data.coord.lat);
        // console.log(data.coord.lon);
        getFiveDay(data.coord.lat, data.coord.lon);
        getCityWeather(data.coord.lat, data.coord.lon);
        if (searchHistory.indexOf(city) === -1) {
          searchHistory.push(city);
          localStorage.setItem("history", JSON.stringify(searchHistory));
          saveCity(city);
        }
      });
  }
  // data:name

  var getSearchValue = function () {
    var searchValue = userCityInput.val();
    getLatLong(searchValue);
    saveCity(searchValue);
  };

  var saveCity = function (searchValue) {
    var searchItem = $("<li>").text(searchValue).addClass("list-group-item");
    console.log(searchItem);
    pastSearchList.append(searchItem);
    userCityInput.val("");
  };
  // searchItem.id = searchValue;
  pastSearchList.on("click", "li", function () {
    getLatLong($(this).text());
  });

  var getCityWeather = function (lat, lon) {
    var requestWeatherUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&exclude=hourly,minutely&appid=49e97d128aa0b52b9299b5b1b5a52107";

    fetch(requestWeatherUrl)
      .then(function (response) {
        if (response.ok) return response.json();
      })
      .then(function (data) {
        console.log(data);
        currentTemp.text(data.current.temp + "°F");
        currentHumidity.text(data.current.humidity + "%");
        currentWind.text(data.current.wind_speed + " mph");
        if (data.current.uvi >= 7) {
          currentUvIndex.addClass("btn btn-danger");
        } else if (data.current.uvi <= 2) {
          currentUvIndex.addClass("btn btn-success");
        } else {
          currentUvIndex.addClass("btn btn-warning");
        }
        currentUvIndex.text(data.current.uvi);
      });
  };

  var getFiveDay = function (lat, lon) {
    var requestWeatherUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&exclude=hourly,minutely&appid=49e97d128aa0b52b9299b5b1b5a52107";

    fetch(requestWeatherUrl)
      .then(function (response) {
        if (response.ok) return response.json();
      })
      .then(function (data) {
        console.log(data);
        dayOneHigh.text(data.daily[0].temp.max + "°F");
        dayOneLow.text(data.daily[0].temp.min + "°F");
        dayOneHumidity.text(data.daily[0].humidity + "%");
        dayOneDisplay.attr("src", "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png");
        
        dayTwoHigh.text(data.daily[1].temp.max + "°F");
        dayTwoLow.text(data.daily[1].temp.min + "°F");
        dayTwoHumidity.text(data.daily[1].humidity + "%");
        dayTwoDisplay.attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");

        dayThreeHigh.text(data.daily[2].temp.max + "°F");
        dayThreeLow.text(data.daily[2].temp.min + "°F");
        dayThreeHumidity.text(data.daily[2].humidity + "%");
        dayThreeDisplay.attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");

        dayFourHigh.text(data.daily[3].temp.max + "°F");
        dayFourLow.text(data.daily[3].temp.min + "°F");
        dayFourHumidity.text(data.daily[3].humidity + "%");
        dayFourDisplay.attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");

        dayFiveHigh.text(data.daily[4].temp.max + "°F");
        dayFiveLow.text(data.daily[4].temp.min + "°F");
        dayFiveHumidity.text(data.daily[4].humidity + "%");
        dayFiveDisplay.attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
      });
  };

  formInputEl.on("submit", function (event) {
    event.preventDefault();
    // getLatLong();
    getSearchValue();
    weatherDisplay.removeClass("d-none");
    fiveDayDisplay.removeClass("d-none");
  });

  // storing past search list items into local storage
  // finding different end point for 5 day forecast

  // var weatherImg = $("<img>");
  // weatherImg.attr("src", "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon +"@2x.png");
  // weatherDisplay.append(weatherImg);
});
