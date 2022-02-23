import {storage} from './storage.service.js'
export const locService = {
    getLocs,
    addLoc
}


const LOCS_KEY = 'LOCS'
const locs = storage.load(LOCS_KEY) || []; 

function addLoc(loc){
    loc.createdAt = Date.now(); 
    locs.push(loc);
    storage.save(LOCS_KEY, locs)
}

function getLocs() {
    if(!locs || !locs.length) return; 

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}
