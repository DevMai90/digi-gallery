// As our app grows, we will have several different reducing functions. Each will manage a separate part of the state.
// combineReducers takens in an object of reducing functions. These functions are passed into createStore()
import { combineReducers } from 'redux';

// Reducers
import alert from './alert';
import auth from './auth';
import post from './post';
import users from './users';

export default combineReducers({
  alert,
  auth,
  post,
  users
});

/*
- Reducers specify how the app's state changes in response to actions passed to the store
*/
