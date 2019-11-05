import {
  GET_USERS,
  GET_PROFILE,
  CLEAR_PROFILE,
  USERS_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  users: [],
  errors: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        profile: null,
        users: [],
        errors: null,
        loading: true
      };
    case USERS_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}
