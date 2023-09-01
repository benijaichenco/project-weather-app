const url =
  "http://api.weatherapi.com/v1/forecast.json?key=5d3dabed1d754a5e999103359232408&days=7&aqi=no&alerts=no&q=";

let unitChoice = "metric";
let place = "tel aviv";

let info = {
  forecast: [
    {
      day: "",
      degree: "",
      unit: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      unit: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      unit: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      unit: "",
      conditionIcon: "",
    },
    {
      dday: "",
      degree: "",
      unit: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      unit: "",
      conditionIcon: "",
    },
    {
      day: "",
      degree: "",
      unit: "",
      conditionIcon: "",
    },
  ],
};

async function getWeather() {
  const response = await fetch(url + place);
  const json = await response.json();
  console.log(json);
  return json;
}

getWeather();
