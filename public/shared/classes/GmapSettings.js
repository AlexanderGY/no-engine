class GmapSettings {
  constructor(position) {
    if(position) {
      this.center = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.zoom = 13;
    } else {
      this.center = {lat: 20, lng: 20};
      this.zoom = 13;
    }
  }
}
