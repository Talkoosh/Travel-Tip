const API_KEY = 'AIzaSyD-KPvaSQmdmLMPid-c2TdBzO8d_kLjUVE';

import { mapService } from './map.service.js'
import { storage } from './storage.service.js'
export const locService = {
    getLocs,
    addLoc,
    searchLoc,
}


const LOCS_KEY = 'LOCS'
const locs = storage.load(LOCS_KEY) || [];

function addLoc(loc) {
    loc.createdAt = Date.now();
    locs.push(loc);
    storage.save(LOCS_KEY, locs)
}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function searchLoc(val) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${val}&key=${API_KEY}`)
        .then(res => res.data)
        .then(res => res.results[0].geometry.location)
        .then(res => {
            mapService.panTo(res);
        });
}