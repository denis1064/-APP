const apiKey = "768e0288406389e6e0f9840659813b24";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");

const searchButton = document.querySelector(".search-box button");

const weatherIcon = document.querySelector(".weather-image i");

const weather = document.querySelector(".weather");

const errorText = document.querySelector(".error");
const background = document.getElementById("background");
const images = [
  "images/aaa.jpg",
  "images/bbb.jpg",
  "images/victor-awesome-photography-FAplWxaP8B0-unsplash.jpg",
];
let currentImageIndex = 0;

function changeBackground() {
  background.style.backgroundImage = `url(${images[currentImageIndex]})`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeBackground, 5000);

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorText.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&#8451";
    if (data.main && data.main.temp) {
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "&#8451";
    } else {
      console.error("Property 'temp' is undefined in the API response");
      if (data.main && data.main.temp) {
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "&#8451";
      } else {
        console.error("Property 'temp' is undefined in the API response");
        throw new Error("Я сказал введите город");
      }
    }
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clear") {
      weatherIcon.className = "fa-solid fa-sun";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "fa-solid fa-cloud-rain";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "fa-solid fa-cloud-mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
    }

    weather.style.display = "block";
    errorText.style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});

