import {storage} from './storage.service.js'
export const locService = {
    getLocs,
    addLoc
}


const LOCS_KEY = 'LOCS'
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: Date.now()}, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: Date.now() }
]

function addLoc(loc){
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