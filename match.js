
export function alliesOf(playerName, details) {
    let player = playerFromName(playerName, details);
    return details.participants.filter(p => p.teamId === player.teamId && p.participantId != player.participantId);
}

export function enemiesOf(playerName, details) {
    let player = playerFromName(playerName, details);
    return details.participants.filter(p => p.teamId !== player.teamId);
}

export function playerFromName(playerName, details) {
    let playerId = details.participantIdentities.find(p => p.player.summonerName === playerName).participantId;
    return details.participants.find(p => p.participantId === playerId);
}

export function membersOfTeam(teamId, details) {
    return details.participants.filter(p => p.teamId === teamId);
}

export function playerWithName(playerName, details) {
    let id = details.participantIdentities.find(p => p.player.summonerName === playerName).participantId;
    return details.participants.find(p => p.participantId == id);
}
