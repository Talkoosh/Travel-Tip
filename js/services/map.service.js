const API_KEY = 'AIzaSyD-KPvaSQmdmLMPid-c2TdBzO8d_kLjUVE';

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getCurrMapCenter
}

import { locService } from './loc.service.js'

var gMap;
var gMarkers = [];

function initMap(lat, lng) {
    console.log(lat, lng);
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', gMap);
        })
        .then(() => {
            gMap.addListener("click", (mapsMouseEvent) => {
                saveClickedLoc(mapsMouseEvent)
            })
        });
}

function getCurrMapCenter() {
    const lat = gMap.center.lat();
    const lng = gMap.center.lng();
    return { lat, lng }
}

function addMarker(loc, title = 'Hello World') {
    console.log('add marker', loc)
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title
    });
    // gMarkers.push(marker)
    return marker;
}

function saveClickedLoc(mapsMouseEvent) {
    var isSaveLoc = confirm('Would you like to save this location?')
    if (!isSaveLoc) return
    const lat = mapsMouseEvent.latLng.lat();
    const lng = mapsMouseEvent.latLng.lng();
    const posName = prompt('How would you like to call this location?')
    locService.addLoc({ name: posName, lat: lat, lng: lng });
    addMarker({ lat, lng }, posName)
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}