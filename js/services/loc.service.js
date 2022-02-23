import {storage} from './storage.service.js'
export const locService = {
    getLocs,
    addLoc,
}

hi()

const LOCS_KEY = 'LOCS'
const locs = storage.load(LOCS_KEY) || []; 

function addLoc(loc){
    loc.createdAt = Date.now(); 
    locs.push(loc);
    storage.save(LOCS_KEY, locs)
}


function hi(){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Israel&key=AIzaSyD-KPvaSQmdmLMPid-c2TdBzO8d_kLjUVE')
    .then(res => res.json())
    .then(res => console.log(res))
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}
