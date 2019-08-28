const gamesContext = (state = {
    queue: 420,
    summonerId: 0,
}, action) => {
  switch (action.type) {
    case 'GC_SET_QUEUE':
        return {
            queue: action.queue,
            summonerId: state.summonerId,
        }
    case 'GC_SET_SUMMONER_ID':
        return {
            summonerId: action.summonerId,
            queue: state.queue,
        }
    case 'GC_RESET':
        return {
            queue: 420,
            summonerId: 0,
        }
    default:
      return state
  }
}
export default gamesContext;

export const setQueue = queue => ({
  type: 'GC_SET_QUEUE',
  queue
});

export const setSummonerId = summonerId => ({
  type: 'GC_SET_SUMMONER_ID',
  summonerId
});

export const gcReset = () => ({
  type: 'GC_RESET',
});
