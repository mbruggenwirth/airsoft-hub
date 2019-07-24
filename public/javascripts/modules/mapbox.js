const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import axios from 'axios';


let mapbox = null;
let geojson = null;

const Mapbox = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1Z2dlbndpcnRoIiwiYSI6ImNqeDU0ZjUyNDBmNHQzem55bmxzM2M0YXMifQ.dxLiDLbpVEHE4GsJAN0kgw';
  mapbox = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-41.9245637, 45.5020546],
    zoom: 3
  });

  mapbox.dragRotate.disable();
  mapbox.touchZoomRotate.disableRotation();
  MapBoxPlaceMarkers();
};

const MapBoxCenterMap = (geolocation) => {
  mapbox.flyTo({
    center: geolocation,
    zoom: 5
  });
};

const placeMarker = (marker) => {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
      .setLngLat(marker.location.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${marker.name}</h3><span>${marker.type}</span><p>${marker.location.properties.address}</p>`))
      .addTo(mapbox);
};

const MapBoxPlaceMarkers = async () => {
  try {
    const events = await axios('/get/events');
    geojson = {
      type: "FeatureCollection",
      features: events.data.map((event) => event.location)
    };

    mapbox.on('load', () => {
      mapbox.addSource('events', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });

      events.data.forEach((event) =>  {
        placeMarker(event);
      });

    });

  } catch (e) {
    console.error(e);
  }
};


export default Mapbox;
export { MapBoxCenterMap, MapBoxPlaceMarkers, placeMarker}