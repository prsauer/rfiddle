const games = (state = {
    gamesList: [],
    totalCount: 0,
    loading: false,
}, action) => {
  switch (action.type) {
    case 'GAMES_ADD_GAME':
        return {
            gamesList: [...state.gamesList, action.game],
            totalCount: state.totalCount,
            loading: state.loading
        }
    case 'GAMES_RESET':
        return {
            gamesList: [],
            totalCount: 0,
            loading: false
        }
    case 'GAMES_START_LOADING':
        return {
            gamesList: state.gamesList,
            totalCount: action.total,
            loading: true
        }
    default:
      return state
  }
}
export default games;

export const startLoading = total => ({
  type: 'GAMES_START_LOADING',
  total
});

export const addGame = game => ({
  type: 'GAMES_ADD_GAME',
  game
});

export const resetGames = () => ({
  type: 'GAMES_RESET',
});
