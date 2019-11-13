import {
  GET_HOME,
  POST_ERROR,
  GET_USER_POSTS,
  GET_POSTS,
  GET_POST,
  CLEAR_POSTS,
  ADD_POST
} from './types';
import axios from 'axios';

export const getHomePosts = () => async dispatch => {
  // Get the most recent 15 posts
  // @todo pagination
  try {
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

export const getPosts = category => async dispatch => {
  dispatch({
    type: CLEAR_POSTS
  });

  try {
    let res;

    if (category === 'All') res = await axios.get('/api/posts');
    else res = await axios.get(`/api/posts/category/${category}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPost = id => async dispatch => {
  dispatch({
    type: CLEAR_POSTS
  });

  try {
    const res = await axios.get(`/api/posts/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
