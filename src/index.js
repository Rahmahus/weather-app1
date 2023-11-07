let currentDate = new Date();
let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = currentDate.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let currentDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = currentDays[currentDate.getDay()];
let secondHeading = document.querySelector("h2");
secondHeading.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

function currentTemperature(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // document.querySelector("#temperature-low").innerHTML = Math.round(
  //   response.data.main.temp_min
  // );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(theCity) {
  let apiKey = "e75720382eef067d2e98ea6348960552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${theCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}
function handlesearch(event) {
  event.preventDefault();
  let theCity = document.querySelector("#show-input").value;
  search(theCity);
}
let submitCity = document.querySelector("#city-form");
submitCity.addEventListener("submit", handlesearch);

search("London");

function displayLocation(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let apiKey = "e75720382eef067d2e98ea6348960552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayLocation);
}

// let currentButton = document.querySelector("button");
// currentButton.addEventListener("click", currentPosition);
