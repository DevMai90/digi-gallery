import { GET_USERS, GET_PROFILE, CLEAR_PROFILE, USERS_ERROR } from './types';
import axios from 'axios';

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProfile = id => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
