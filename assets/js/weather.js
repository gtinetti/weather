class OpenWeather {
  constructor (apiKey) {
    this.baseURI = 'https://api.openweathermap.org/data/2.5/weather';
    this.apiKey = apiKey;
    this.iconBaseURI = 'https://openweathermap.org/img/wn';
  }

  async get (latitude, longitude) {
    latitude = latitude.toString().slice(0, 8)
    longitude = longitude.toString().slice(0, 8);

    const uri = `${this.baseURI}?appid=${this.apiKey}&lat=${latitude}&lon=${longitude}&units=metric`;

    const request = await fetch(uri);
    const response = await request.json();

    response.weather.map(weather => {
      weather.icon_uri = this.iconBaseURI;
      return weather;
    })

    const { main, weather, wind, sys, name } = response;
    return { main, weather, wind, sys, name };
  }
}