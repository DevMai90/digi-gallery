import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Must send token we have on client side to backend to validate then load user.
// Client JWT will have req.user.id as payload. Compare this through the backend auth route to send back user
// Must do this each time app.js is loaded.
export const loadUser = () => async dispatch => {
  // If there is a token in local storage...
  // if (localStorage.getItem('token')) {
  // Then set or clear axios header...
  // setAuthToken(localStorage.getItem('token'));
  // }
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    // Send GET request to backend route. Note that headers have been set with the token
    const res = await axios.get('/api/auth');

    // Send action to reducer in order to update state
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    // If there is an error then send action to auth reducer
    dispatch({
      type: AUTH_ERROR
    });
    // Not looping through errors because we did not add errors to this backend route
  }
};

export const register = (
  firstName,
  lastName,
  password,
  email,
  handle
) => async dispatch => {
  // Build new user data object
  const body = JSON.stringify({
    firstName,
    lastName,
    password,
    email,
    handle
  });

  // Set headers because we are sending data (just like in Postman)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // Hit backend route, send req info, configure headers
    // Save response which is our token (see backend)
    const res = await axios.post('/api/users/', body, config);

    // Dispatch action which is just an object
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    // Return errors array from express-validator in backend
    const errors = err.response.data.errors;

    // Send errors to Redux. Dispatch setAlert which dispatches set and remove alerts
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    // Tells reducer what to do when registration fails
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const loginUser = (login, password) => async dispatch => {
  const body = JSON.stringify({
    login,
    password
  });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
