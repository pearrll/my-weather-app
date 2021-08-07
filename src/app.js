let currrentTime = new Date();
let months = [
  "Janurary",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = months[currrentTime.getMonth()];
let date = currrentTime.getDate();
let year = currrentTime.getFullYear();

let day = days[currrentTime.getDay()];
let hour = currrentTime.getHours();
if (hour < 10) {
  hours = `0${hours}`;
}
let minutes = currrentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector("#current-time");
let currentDate = document.querySelector("#current-date");

time.innerHTML = `${day} ${hour}:${minutes}`;
currentDate.innerHTML = `${month} ${date}, ${year}`;

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
function searchTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "1c66c51ba5042df55b9bfe1a0cc5de29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchTemperature);
}

function fetchCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "1c66c51ba5042df55b9bfe1a0cc5de29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchTemperature);
}

let submit = document.querySelector("#submit-button");
submit.addEventListener("click", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", fetchCurrentLocation);

searchCity("san pedro");
