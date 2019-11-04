import { GET_USERS } from './types';
import axios from 'axios';

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/apis/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
