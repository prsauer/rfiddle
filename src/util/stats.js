import { playerFromName } from "./match";

function add(a, b) {
    return a + b;
}

export function sum(a) {
    return a.reduce(add);
}

export function mean(s) {
    return (1.0*sum(s))/s.length;
}

export function variance(arr)
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
}

export function mult(a, b) {
    return a.map((val, idx) => val*b[idx]);
}

let playerWin = playerName => details => {
    return playerFromName(playerName, details).stats.win;
}

function pCorr(sigA, sigB) {
    let sumA = sum(sigA);
    let sumB = sum(sigB);
    let sumAA = sum(mult(sigA, sigA));
    let sumBB = sum(mult(sigB, sigB));
    let sumCross = sum(mult(sigA, sigB));
    let N = sigA.length;
    let A = N*sumCross - sumA*sumB;
    let B = Math.sqrt((N*sumAA - sumA*sumA)*(N*sumBB - sumB*sumB));
    return A/B;
}

function test_timestamp_sampler(point) {
    return point.timestamp;
}

function signal_collector(sampler_functions, data) {
    let signals = {}
    for (let s_func of sampler_functions) {
        signals[s_func.name] = [];
        for (let d_point of data) {
            try {
                let sig = s_func(d_point);
                if (!isNaN(sig)) {
                    signals[s_func.name].push(s_func(d_point));
                } else {
                    throw Error("NaN during signal collection");
                }
            }
            catch(error) {
                console.log("Error collecting signal", s_func, d_point.gameId);
            }
        }
    }
    return signals;
}

function signal_aggregator(signals) {
    let aggregate = {}
    console.log("Signals logged: ", Object.keys(signals));
    for (let k of Object.keys(signals)) {
        if (k === 'playerDidWin') {
            continue;
        }
        aggregate[k] = {}
        aggregate[k]['max'] = Math.max(...signals[k]);
        aggregate[k]['min'] = Math.min(...signals[k]);
        aggregate[k]['mean'] = mean(signals[k]);
        aggregate[k]['sum'] = sum(signals[k]);
        aggregate[k]['variance'] = variance(signals[k]);
        aggregate[k]['corrWin'] = pCorr(signals[k], signals['playerDidWin']);
    }
    return aggregate;
}

export function analyze(sampler_functions, data, playerName) {
    function playerDidWin(details) {
        return playerWin(playerName)(details);
    }
    let signals = signal_collector([...sampler_functions, playerDidWin], data);
    return {
        stats: signal_aggregator(signals),
        signals
    };
}

// var data = [
//     { timestamp: 1 },
//     { timestamp: 2 },
//     { timestamp: 3 },
//     { timestamp: 4 },
//     { timestamp: 5 },
// ]
// var t_funcs = [
//     test_timestamp_sampler 
// ]
// console.log(analyze(t_funcs, data));