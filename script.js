const url =
  "https://api.weatherapi.com/v1/forecast.json?key=5d3dabed1d754a5e999103359232408&days=7&aqi=no&alerts=no&q=";

let unitChoice = "imperial";
let place = "tel aviv";

let info = {
  forecast: [
    {
      country: "",
      city: "",
      degree: "",
      unit: "",
      conditionText: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      conditionIcon: "",
    },
  ],
};

async function getWeather() {
  const response = await fetch(url + place);
  const json = await response.json();
  saveData(json);
}

function saveData(data) {
  info.forecast[0].city = data.location.name;
  info.forecast[0].country = data.location.country;
  if (unitChoice === "metric") {
    info.forecast[0].degree = data.current.temp_c;
    info.forecast[0].unit = "°C";
  } else if (unitChoice === "imperial") {
    info.forecast[0].degree = data.current.temp_f;
    info.forecast[0].unit = "°F";
  }
  info.forecast[0].conditionIcon = data.current.condition.icon;
  info.forecast[0].conditionText = data.current.condition.text;
  for (let i = 1; i < info.forecast.length; i++) {
    info.forecast[i].day = dayInWeek(data.forecast.forecastday[i].date);
    if (unitChoice === "metric") {
      info.forecast[i].degree = data.forecast.forecastday[i].day.avgtemp_c;
    } else if (unitChoice === "imperial") {
      info.forecast[i].degree = data.forecast.forecastday[i].day.avgtemp_f;
    }
    info.forecast[i].conditionIcon =
      data.forecast.forecastday[i].day.condition.icon;
  }
  console.log(data);
}

function dayInWeek(date) {
  date = new Date(date);
  const dayNum = date.getDay();
  let day;

  switch (dayNum) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
    default:
      day = "Invalid Day";
  }

  return day;
}

function displayMain() {
  const degree = document.querySelector(".main .degree");
  const unit = document.querySelector(".main .unit");
  const conditionIcon = document.querySelector(".main .icon");
  const conditionText = document.querySelector(".main .text");
  const city = document.querySelector(".main .city");

  const country = document.querySelector(".main .country");

  degree.textContent = info.forecast[0].degree;
  unit.textContent = info.forecast[0].unit;
  conditionIcon.src = info.forecast[0].conditionIcon;
  conditionText.textContent = info.forecast[0].conditionText;
  city.textContent = `${info.forecast[0].city},`;
  country.textContent = info.forecast[0].country;
}

function displayForecast() {
  const cells = Array.from(document.querySelectorAll(".cell"));
  for (let i = 0; i < cells.length; i++) {
    cells[i].querySelector(".day").textContent = info.forecast[i + 1].day;
    cells[i].querySelector(".icon").src = info.forecast[i + 1].conditionIcon;
    cells[i].querySelector(".degree").textContent = `${
      info.forecast[i + 1].degree
    }°`;
  }
}

function start() {
  getWeather().then(displayMain).then(displayForecast);
}

const search = document.querySelector(".search");
search.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    place = search.value;
    start();
  }
});

start();
