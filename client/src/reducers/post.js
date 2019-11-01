import {
  GET_HOME,
  POST_ERROR,
  GET_USER_POSTS,
  GET_POSTS,
  CLEAR_POSTS
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HOME:
      return {
        ...state,
        loading: false,
        posts: payload
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case GET_USER_POSTS:
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload
      };
    case CLEAR_POSTS:
      return {
        posts: [],
        post: null,
        loading: true,
        errors: {}
      };
    default:
      return state;
  }
}
