import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages'
import authReducer from './reducers/authReducer';
import homePageReducer from './reducers/homePageReducer';

export default combineReducers({
  flashMessages,
  authReducer,
  homePageReducer
});
