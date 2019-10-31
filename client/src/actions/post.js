import { GET_HOME, POST_ERROR, GET_USER_POSTS } from './types';
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

export const getUserPosts = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/user/${id}`);

    dispatch({
      type: GET_USER_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
