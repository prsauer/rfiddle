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
import common from "./common";

var myid = 'Z2SI1qI2W86XQcY0L1gQ6Cr6rB8xQ_3vUY8Hq4mLgg-Arw';

async function def() {
    var championsById = await getChampions();
    var matches = await getMatches(myid, false);

    var matchDetails = []

    for (let m of matches) {
        let details = await getMatchDetails(m['gameId']);
        matchDetails.push(details);
    }
    let om = matchDetails[0];

    console.log(matchDetails[0]['participants'][0]);
    console.log(matchDetails[0]['participantIdentities'][0]);
    console.log(Object.keys(matchDetails[0]));
    console.log(
        analyze([
            common.gameDuration,
            common.alliedDeaths,
            common.enemyDeaths,
            common.myKillsPer10,
            common.myDeathsPer10,
            common.myKDA,
            common.myCSPerMin
        ],
        matchDetails, 'Armsperson').stats);
    // console.log(alliesOf('Armsperson', om));
};
def();
