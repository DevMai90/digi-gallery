import { GET_HOME, POST_ERROR } from './types';
import axios from 'axios';

// Get the most recent 15 posts
export const getHomePosts = limits => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.get('/api/posts/homepage');

    dispatch({
      type: GET_HOME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
