import common from "./common";

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
        aggregate[k]['mean'] = common.mean(signals[k]);
        aggregate[k]['sum'] = common.sum(signals[k]);
        aggregate[k]['variance'] = common.variance(signals[k]);
        aggregate[k]['corrWin'] = common.pCorr(signals[k], signals['playerDidWin']);
    }
    return aggregate;
}

export function analyze(sampler_functions, data, playerName) {
    function playerDidWin(details) {
        return common.playerWin(playerName)(details);
    }
    let signals = signal_collector([...sampler_functions, playerDidWin], data);
    return {
        stats: signal_aggregator(signals),
        signals
    };
}
