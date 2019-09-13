import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

// Check local storage to see if we already have an auth token
// Must set loading because we won't have everything ready during asynchronous actions. We can load a spinner
// Successful registration means we're already authenticated
// Load our user to application state
// Call set alerts if we're successful.

// This state will appear under auth in Redux
const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuthenticated: false,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      console.log(payload);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
        user: '@todo'
      };
    default:
      return state;
  }
}
