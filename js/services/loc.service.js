import {storage} from './storage.service.js'
import {makeId} from '../utils.js'
export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}

const LOCS_KEY = 'LOCS'
const locs = storage.load(LOCS_KEY) || []; 

function addLoc(loc){
    loc.createdAt = Date.now(); 
    loc.id = makeId(); 
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

function deleteLoc(id){
    const locIdx = locs.findIndex((loc) => loc.id === id);
    locs.splice(locIdx, 1);
    storage.save(LOCS_KEY, locs);
}