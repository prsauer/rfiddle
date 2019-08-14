require('dotenv').config();
import {
    getChampions,
    getMatches,
    getMatchDetails
} from "./riot";
import {
    mean,
    analyze,
    sum
} from "./stats";
import {
    enemiesOf,
    playerFromName,
    alliesOf
} from "./match";

var myid = 'Z2SI1qI2W86XQcY0L1gQ6Cr6rB8xQ_3vUY8Hq4mLgg-Arw';

function gameDuration(details) {
    return details.gameDuration/60;
}

function myCSPerMin(details) {
    let n10s = (details.gameDuration/60 - 2);
    return playerFromName('Armsperson', details).stats.totalMinionsKilled/n10s;
}

function myKillsPer10(details) {
    let n10s = details.gameDuration/600;
    return playerFromName('Armsperson', details).stats.kills/n10s;
}

function myDeathsPer10(details) {
    let n10s = details.gameDuration/600;
    return playerFromName('Armsperson', details).stats.deaths/n10s;
}

function myKDA(details) {
    let p = playerFromName('Armsperson', details);
    return p.stats.deaths > 0 ? (p.stats.kills + p.stats.assists)/p.stats.deaths : 5;
}

function alliedDeaths(details) {
    return mean(alliesOf('Armsperson', details).map(p => p.stats.deaths));
}

function enemyDeaths(details) {
    return mean(enemiesOf('Armsperson', details).map(p => p.stats.deaths));
}

async function def() {
    var championsById = await getChampions();
    var matches = await getMatches(myid, false);

    var matchDetails = []

    var rows = [];

    var i = 0;
    for (let m of matches) {
        i = i + 1
        // printStub(riot.getMatchDetails(m['gameId']));
        // rows.push(calcKDAs(riot.getMatchDetails(m['gameId'])));
        let details = await getMatchDetails(m['gameId']);
        matchDetails.push(details);
    }
    let om = matchDetails[0];

    console.log(matchDetails[0]['participants'][0]);
    console.log(matchDetails[0]['participantIdentities'][0]);
    console.log(Object.keys(matchDetails[0]));
    console.log(
        analyze([
            gameDuration,
            alliedDeaths,
            enemyDeaths,
            myKillsPer10,
            myDeathsPer10,
            myKDA,
            myCSPerMin
        ],
        matchDetails, 'Armsperson').stats);
    // console.log(alliesOf('Armsperson', om));
};
def();
