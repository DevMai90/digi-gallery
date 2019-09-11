import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// State here will be an array of alert objects
const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // State here is an array.
      // State is immutable so we have to make a copy of it
      return [...state, payload];
    case REMOVE_ALERT:
      // .filter returns a new array of items that pass
      // Payload in this case will be an id
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}

/*
- Payload is data
*/
