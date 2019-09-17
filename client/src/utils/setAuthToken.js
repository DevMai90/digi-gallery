import axios from 'axios';

// Set global headers with x-auth-token just like in postman
// These are DEFAULTS that will apply to every request
const setAuthToken = token => {
  if (token) {
    // Check for token in localStorage and set as default on all axios requests
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // If no token or invalid token, clear header
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
