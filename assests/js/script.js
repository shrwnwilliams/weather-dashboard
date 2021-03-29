var userCityInput = $("#city-search-input");
var formInputEl = $("#city-search");

function getCity() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + userCityInput.val() +"&units=imperial&appid=49e97d128aa0b52b9299b5b1b5a52107";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}


formInputEl.on("submit", function (event) {
    event.preventDefault();
    console.log(userCityInput.val());
    getCity();
});
