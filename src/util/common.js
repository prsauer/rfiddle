import {
    enemiesOf,
    playerFromName,
    alliesOf
} from "./match";
import {
    mean,
    analyze,
    sum
} from "./stats";

export default {
    gameDuration: function gameDuration(details) {
        return details.gameDuration/60;
    },
    myCSPerMin: function myCSPerMin(details) {
        let n10s = (details.gameDuration/60 - 2);
        return playerFromName('Armsperson', details).stats.totalMinionsKilled/n10s;
    },
    myKillsPer10: function myKillsPer10(details) {
        let n10s = details.gameDuration/600;
        return playerFromName('Armsperson', details).stats.kills/n10s;
    },
    myDeathsPer10: function myDeathsPer10(details) {
        let n10s = details.gameDuration/600;
        return playerFromName('Armsperson', details).stats.deaths/n10s;
    },
    myKDA: function myKDA(details) {
        let p = playerFromName('Armsperson', details);
        return p.stats.deaths > 0 ? (p.stats.kills + p.stats.assists)/p.stats.deaths : 5;
    },
    alliedDeaths: function alliedDeaths(details) {
        return mean(alliesOf('Armsperson', details).map(p => p.stats.deaths));
    },
    enemyDeaths: function enemyDeaths(details) {
        return mean(enemiesOf('Armsperson', details).map(p => p.stats.deaths));
    }
};
