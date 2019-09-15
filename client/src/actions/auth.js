import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';
import { setAlert } from './alert';

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
    // Save response
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
