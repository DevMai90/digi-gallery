// CreateStore - Returns redux store object
// applyMiddleware - Creates store enhancer that applies middleware to dispatch method
// Provides custom functionality
import { createStore, applyMiddleware } from 'redux';

// Thunks are a function that is returned by another function. In this case, dispatch
// Redux Thunk middleware allows us to write action creators that return a FUNCTION instead of an action (dispatch!)
import thunk from 'redux-thunk';

// Pass in any store enhancers
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
