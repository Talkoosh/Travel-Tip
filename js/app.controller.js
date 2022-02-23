import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGoToLoc = onGoToLoc;
window.onDeleteLoc = onDeleteLoc;
window.onCopyLink = onCopyLink;
window.onSearchLoc = onSearchLoc;


function onInit() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let lat = +params.lat;
    let lng = +params.lng;
    if (!lat || !lng) {
        lat = 32.0749831;
        lng = 34.9120554;
    }

    mapService.initMap(lat, lng)
        .then(() => {
            console.log('Map is ready');

        })
        .catch(() => console.log('Error: cannot init map'));
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            let stringHTMLs = locs.map((loc) => {
                return `<div>
                <p>name: ${loc.name} lat: ${loc.lat} lng: ${loc.lng}</p>
                <button onclick="onGoToLoc(${loc.lat}, ${loc.lng})">Go</button>
                <button onclick="onDeleteLoc('${loc.id}')">Delete</button>
                </div> `
            }).join('')

            document.querySelector('.locs').innerHTML = stringHTMLs;
        })
}

function onDeleteLoc(id) {
    locService.deleteLoc(id);
    onGetLocs();
}

function onGoToLoc(lat, lng) {
    mapService.panTo(lat, lng)
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            document.querySelector('.user-pos').innerText =
                `Latitude: ${lat} - Longitude: ${lng}`
            mapService.panTo(lat, lng);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onSearchLoc() {
    var val = document.querySelector('[name="search-input"]').value;
    locService.searchLoc(val);
}

function onCopyLink() {
    const pos = mapService.getCurrMapCenter();

    const URL = `https://talkoosh.github.io/Travel-Tip/index.html?lat=${pos.lat}&lng=${pos.lng}`
    navigator.clipboard.writeText(URL);


}