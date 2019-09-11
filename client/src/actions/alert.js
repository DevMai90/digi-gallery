import { SET_ALERT, REMOVE_ALERT } from './types';
import uuidv4 from 'uuid/v4';

// Action Creators
// function that returns a function - Pass dispatch into the THUNK
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();

  // Dispatch actions
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, timeout);
};
