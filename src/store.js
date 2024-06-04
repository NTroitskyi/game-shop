import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';  // Note the named import
import gamesReducer from './reducers/gamesReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  games: gamesReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
