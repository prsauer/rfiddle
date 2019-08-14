const fs = require('fs');

var api_cache_file = './api.js.cache';

export function pickle(data) {
    let strData = JSON.stringify(data);
    console.log("Writing file...", fs.writeFileSync(api_cache_file, strData));
}

export function unpickle() {
    let up = JSON.parse(fs.readFileSync(api_cache_file));
    return up;
}
