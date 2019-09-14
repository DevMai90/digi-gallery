import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';

export const register = (
  firstName,
  lastName,
  password,
  email,
  handle
) => async dispatch => {
  // Build new user data object
  const newUser = JSON.stringify({
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
    const res = await axios.post('/api/users/', newUser, config);

    // Dispatch action which is just an object
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    // Return errors array from express-validator in backend
    const errors = err.response.data.errors;

    // Send errors to Redux
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
  }
};
