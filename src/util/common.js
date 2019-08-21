// This is the blob file with all functions that need to be pretty-printed in the app
// unfortunately due to how webpack rejiggers modules it's easiest to just
// dump them all into a giant file so we don't get any weird aliasing when we
// start calling .toString on them

function add(a, b) {
    return a + b;
}

function sum(a) {
    return a.reduce(add);
}

function mean(s) {
    return (1.0*sum(s))/s.length;
}

function mult(a, b) {
    return a.map((val, idx) => val*b[idx]);
}

function playerFromName(playerName, details) {
    let playerId = details.participantIdentities.find(p => p.player.summonerName === playerName).participantId;
    return details.participants.find(p => p.participantId === playerId);
}
function alliesOf(playerName, details) {
    let player = playerFromName(playerName, details);
    return details.participants.filter(p => p.teamId === player.teamId && p.participantId != player.participantId);
}
function enemiesOf(playerName, details) {
    let player = playerFromName(playerName, details);
    return details.participants.filter(p => p.teamId !== player.teamId);
}

export default {
    mean, add, sum, mult,
    variance: function variance(arr)
    {
        var len = 0;
        var sum=0;
        for(var i=0;i<arr.length;i++) {
            len = len + 1;
            sum = sum + arr[i];
        }
        var v = 0;
        if (len > 1) {
            var mean = sum / len;
            for(var i=0;i<arr.length;i++) {
                v = v + (arr[i] - mean) * (arr[i] - mean);
            }
            return v / len;
        }
        else {
            return 0;
        }
    },
    playerWin: playerName => details => {
        return playerFromName(playerName, details).stats.win;
    },
    pCorr: function pCorr(sigA, sigB) {
        let sumA = sum(sigA);
        let sumB = sum(sigB);
        let sumAA = sum(mult(sigA, sigA));
        let sumBB = sum(mult(sigB, sigB));
        let sumCross = sum(mult(sigA, sigB));
        let N = sigA.length;
        let A = N*sumCross - sumA*sumB;
        let B = Math.sqrt((N*sumAA - sumA*sumA)*(N*sumBB - sumB*sumB));
        return A/B;
    },
    alliesOf,
    enemiesOf,
    playerFromName,
    membersOfTeam: function membersOfTeam(teamId, details) {
        return details.participants.filter(p => p.teamId === teamId);
    },
    playerWithName: function playerWithName(playerName, details) {
        let id = details.participantIdentities.find(p => p.player.summonerName === playerName).participantId;
        return details.participants.find(p => p.participantId == id);
    },
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
