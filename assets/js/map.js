class LMap {
  constructor (_element) {
    this.osmap = L.map(_element);
    this.coords = L.latLng(0, 0)
    this.marker = L.marker(this.coords);
    this.circle;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: ['a', 'b', 'c']
    }).addTo(this.osmap);

    this.osmap.setView(this.coords, 2);
    this.marker.addTo(this.osmap);

    this.setEvents();
  }

  setCircleArea (radius) {
    this.circle = L.circle(this.coords, { radius, opacity: 0.3 })
    this.circle.addTo(this.osmap);
  }

  setCoords (latitude, longitude) {
    this.coords = L.latLng(latitude, longitude);
  }

  moveMarker () {
    this.marker.setLatLng(this.coords);
  }

  moveMap (zoom) {
    this.osmap.flyTo(this.coords, zoom, { duration: 1 });
  }

  setEvents () {
    this.osmap.addEventListener('click', e => {
      this.setCoords(e.latlng.lat, e.latlng.lng);
      this.moveMarker()
      this.circle.remove();

      weather.get(e.latlng.lat, e.latlng.lng)
        .then(response => { ui.displayWeatherResults(response); })
        .catch(err => { console.warn(err.message); });
    });
  }
}