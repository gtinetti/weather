class UI {
  constructor () {
    this._mainContainer = document.querySelector('section.container.main');
    this._weatherRow = document.querySelector('section > div.row.weather');
    this._weatherLoader = document.querySelector('div.card > div.card-body > div.w-loader')

    this._weatherMainBlock = document.querySelector('div.card > div.card-body > div.row.w-main');
    this._weatherDetailsBlock = document.querySelector('div.card > div.card-body > div.row.w-details');
    this._weatherLocationBlock = document.querySelector('div.card > div.card-body > div.row.w-location')
  }

  displayWeatherResults (results) {
    const { main, weather, wind, sys, name } = results;
    if (
      typeof main === 'undefined' ||
      typeof weather === 'undefined' ||
      typeof wind === 'undefined' ||
      typeof sys === 'undefined' ||
      typeof name === 'undefined'
    ) return console.warn('Unable to display weather info.');

    const mainWeather = weather[0];

    const iconHREF = `${mainWeather.icon_uri}/${mainWeather.icon}@2x.png`;

    /** main block */
    const _icon = this._weatherMainBlock.querySelector('#w-icon'),
          _temperature = this._weatherMainBlock.querySelector('#w-temperature'),
          _description = this._weatherMainBlock.querySelector('#w-description');

    _icon.innerHTML = `<img src="${iconHREF}">`;
    _temperature.innerHTML = `${main.temp}&#176;C`;
    _description.textContent = mainWeather.description;

    /** details block */
    const _windItem = this._weatherDetailsBlock.querySelector('ul li.list-inline-item > span#wind'),
          _feelsLikeItem = this._weatherDetailsBlock.querySelector('ul li.list-inline-item > span#feels-like'),
          _humidityItem = this._weatherDetailsBlock.querySelector('ul li.list-inline-item > span#humidity');


    let feelsLikeArr = main.feels_like.toString().split(/\./);
    let feelsLike = `${feelsLikeArr[0]}.${feelsLikeArr[1].slice(0, 1)}`;

    _windItem.innerHTML = `${wind.speed}<small>m/s</small>`;
    _feelsLikeItem.innerHTML = `${feelsLike}<small>&#176;C</small>`;
    _humidityItem.innerHTML = `${main.humidity}<small>%</small>`;

    /** location block */
    const _location = this._weatherLocationBlock.querySelector('#w-location');
    _location.textContent = name;

    this._weatherLoader.classList.add('d-none');
    this._weatherMainBlock.classList.remove('d-none')
    this._weatherDetailsBlock.classList.remove('d-none')
    this._weatherLocationBlock.classList.remove('d-none')
  }

  displayAlertUnsupported () {
    const _row = document.createElement('div');
    _row.className = 'row unsupported';

    const _alert = `
    <div class="col-lg-6 col-md-6 col-sm-6 mx-auto">
      <div class="alert alert-dismissible alert-danger">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Oops!</strong> Looks like your browser does not supports this app.
      </div>
    </div>`;

    _row.innerHTML = _alert.replace(/\s{2,}/g, '');
    this._mainContainer.insertBefore(_row, this._weatherRow);
  }
}