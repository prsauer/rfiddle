import { combineReducers } from 'redux';
import games from './games';
import gamesContext from './gamesContext';

export default combineReducers({
  games,
  gamesContext
});
