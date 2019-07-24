import '../sass/style.scss';
import '@babel/polyfill';

import MapBox  from './modules/mapbox';
import EventForm, { autoComplete } from './modules/eventForm';


document.addEventListener("DOMContentLoaded", autoComplete);
MapBox();
EventForm();
