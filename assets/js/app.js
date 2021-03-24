const ui = new UI;
const weather = new OpenWeather();

document.addEventListener('DOMContentLoaded', loadWeather)

function loadWeather () {
  if (!'geolocation' in navigator)
    failedPosition();

  const geo = navigator.geolocation;
  geo.getCurrentPosition(successPosition, failedPosition);
}

function successPosition (position) {
  const { coords, timestamp } = position;
  const currentTime = new Date(timestamp);

  weather.get(coords)
    .then(response => { ui.displayWeatherResults(response) })
    .catch(err => console.warn(err));
}

function failedPosition () {
  const message = `You'll not be able to use this application.
    Please, allow the access to your location or try another browser"`;

  console.warn(message.replace(/\s{2,}/g, ' '));
  ui.displayAlertUnsupported();

  return false;
}