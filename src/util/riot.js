import { pickle, unpickle } from "./pickler.js";

var headers = {
    "X-Riot-Token": 'test',
    "Accept": "application/json",
}

var API_ROOT_URI = 'https://intense-ravine-93254.herokuapp.com'
var apiCache;
unpickle(r => {
    apiCache = r;
})

export async function getChampions() {
    let rawData = await cachedGet('http://ddragon.leagueoflegends.com/cdn/9.14.1/data/en_US/champion.json');
    let remap = {};
    Object.keys(rawData.data).map(val => { let cd = rawData.data[val]; remap[cd.key] = cd; }, {});
    return remap;
}

export async function getMatches(accountId, cached=true) {
    let gm = await riotGet(`/lol/match/v4/matchlists/by-account/${accountId}?queue=420`, cached=cached);
    return gm.matches;
}

export async function getMatchDetails(matchId, cached=true) {
    return await riotGet(`/lol/match/v4/matches/${matchId}`, cached=cached)
}

export async function saveApiCache(cache) {
    await pickle(cache);
}

export async function riotGet(path, cached=true) {
    return await cachedGet(API_ROOT_URI + path, headers=headers, cached=cached);
}

async function cachedGet(path, headers={}, cached=true) {
    if (apiCache && Object.keys(apiCache).includes(path) && cached) {
        console.log("Cache Hit", path);
        return apiCache[path];
    }
    console.log("Cache Miss", path);
    let res = await fetch(path, { headers });
    let jdata = await res.json();
    console.log('API Call', path, '=>', res.status);
    if (res.status === 200) {
        apiCache[path] = jdata;
        await saveApiCache(apiCache);
    }
    return jdata;
}

export function getSummoner(name) {
    return riotGet(`/lol/summoner/v4/summoners/by-name/${name}`);
}
