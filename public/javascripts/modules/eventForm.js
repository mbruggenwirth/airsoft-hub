import axios from 'axios';
import Pikaday from 'pikaday';
import {MapBoxCenterMap, placeMarker} from './mapbox';

let autocomplete = null;

const getGeolocation = () => {
    const input = document.querySelector('#autocomplete');

    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
        var place = autocomplete.getPlace();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        MapBoxCenterMap([lng,lat]);
    });

    input.addEventListener('keydown', (e) => {
        if (e.which === 13) e.preventDefault();
    });
};

exports.autoComplete = () => {
    setTimeout(() => {
        getGeolocation();
    }, 500);
};

const getGeoJson = () => {
    const place = autocomplete.getPlace();

    if(place) {

        return {
            type: 'Feature',
            properties: {
                address: place.adr_address
            },
            geometry: {
                type: 'Point',
                coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
            }
        }
    }
    return false;
};

export default  () => {
    const form = document.getElementById('event-add');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.elements['name'].value;
        const checkboxes = document.querySelectorAll('input[name="type"]');
        const location = getGeoJson();
        const type = [...checkboxes]
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        const event = {
            name,
            type,
            location
        };

        axios('/event/add', {
            method: 'POST',
            data: event
        }).then((response) => {
            placeMarker(event);
            form.reset();
        }).catch((e) => {
            console.error(e);
        })

    });
};

