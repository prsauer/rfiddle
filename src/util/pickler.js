import AsyncStorage from "@callstack/async-storage";

var api_cache_file = './api.js.cache';

export async function pickle(data) {
    let strData = JSON.stringify(data);
    console.log("Writing file...");
    return await AsyncStorage.setItem(api_cache_file, strData);
}

export async function unpickle() {
    var item = await AsyncStorage.getItem(api_cache_file);
    return JSON.parse(item);
}
