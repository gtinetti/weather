const ui = new UI;
const weather = new OpenWeather('ae28c32e111b8e01b0e41ede4b77ea15');

const _osmap = document.querySelector('#osm-map');
const lmap = new LMap(_osmap);

loadWeather();

function loadWeather () {
  if (!'geolocation' in navigator)
    return failedPosition();

  const geo = navigator.geolocation;
  geo.getCurrentPosition(successPosition, failedPosition);
}

function successPosition (position) {
  const { coords, timestamp } = position;

  weather.get(coords.latitude, coords.longitude)
    .then(response => ui.displayWeatherResults(response))
    .catch(err => console.warn(err.message))
    .finally(() => {
      try {
        lmap.setCoords(coords.latitude, coords.longitude);
        lmap.moveMarker();
        lmap.setCircleArea(coords.accuracy);
        lmap.moveMap(14);
      } catch (err) {
        console.warn(err.message)
      }
    })
}

function failedPosition () {
  const message = `You'll not be able to use this application.
    Please, allow the access to your location or try another browser"`;

  console.warn(message.replace(/\s{2,}/g, ' '));
  ui.displayAlertUnsupported();

  return false;
}