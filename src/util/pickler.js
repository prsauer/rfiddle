import AsyncStorage from "@callstack/async-storage";

var api_cache_file = './api.js.cache';

export async function pickle(data) {
    let strData = JSON.stringify(data);
    return await AsyncStorage.setItem(api_cache_file, strData);
}

export async function unpickle(cb) {
    var item = await AsyncStorage.getItem(api_cache_file);
    var res = JSON.parse(item);
    cb(res);
}
