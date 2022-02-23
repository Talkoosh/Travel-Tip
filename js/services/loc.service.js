import { storage } from './storage.service.js'
import { makeId } from '../utils.js'
import { mapService } from './map.service.js'
export const locService = {
    getLocs,
    addLoc,
    deleteLoc,
    searchLoc
}

const API_KEY = 'AIzaSyD-KPvaSQmdmLMPid-c2TdBzO8d_kLjUVE';

const LOCS_KEY = 'LOCS'
const locs = storage.load(LOCS_KEY) || [];

function addLoc(loc) {
    loc.createdAt = Date.now();
    loc.id = makeId();
    loc.marker = mapService.addMarker({ lat: loc.lat, lng: loc.lng }, loc.name)
    locs.push(loc);
    storage.save(LOCS_KEY, locs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 500)
    });
}

function deleteLoc(id) {
    const locIdx = locs.findIndex((loc) => loc.id === id);
    locs[locIdx].marker
    locs.splice(locIdx, 1);
    storage.save(LOCS_KEY, locs);
}

function searchLoc(val) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${val}&key=${API_KEY}`)
        .then(res => res.data)
        .then(res => res.results[0].geometry.location)
        .then(res => {
            mapService.panTo(res);
        });
}