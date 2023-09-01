const url =
  "http://api.weatherapi.com/v1/forecast.json?key=5d3dabed1d754a5e999103359232408&days=7&aqi=no&alerts=no&q=";

let unitChoice = "metric";
let place = "tel aviv";

let info = {
  forecast: [
    {
      degree: "",
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
  if (unitChoice === "metric") {
    info.forecast[0].degree = data.current.temp_c;
  } else if (unitChoice === "imperial") {
    info.forecast[0].degree = data.current.temp_f;
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

function dayInWeek(date) {}

getWeather();
