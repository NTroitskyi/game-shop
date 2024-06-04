import { FETCH_GAMES_SUCCESS, FETCH_ADDITIONAL_GAMES_SUCCESS } from '../actions/gameActions';

const initialState = {
  games: [],
  additionalGames: [],
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        games: action.payload,
      };
    case FETCH_ADDITIONAL_GAMES_SUCCESS:
      return {
        ...state,
        additionalGames: action.payload,
      };
    default:
      return state;
  }
};

export default gamesReducer;
