import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/homepage/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Categories from './components/categories/Categories';
import Contributors from './components/contributors/Contributors';
import Profile from './components/profiles/Profile';
import NotFound from './components/layout/NotFound';

// Makes Redux store available to the entire app
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

// Must check our token to see if we have one. If we do then return user. Then set loading to false after. Update state

// If token then set auth token. Which is allow us to user loadUser action creator
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  // loadUser is available directly through the store since we've imported it here. No need for connect()

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  // Empty brackets indicate that there is nothing that will cause loadUser to re-run.

  return (
    // Provider wraps around EVERYTHING
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <div className="bg-light">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route
                exact
                path="/categories/:category"
                component={Categories}
              />
              <Route exact path="/contributors" component={Contributors} />
              <Route exact path="/contributors/:id" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

/*
- exact path comes into play when there are multiple paths with similar names
- Needed for nested routes
ex
"/users"
"/users/create"
path would only return /users because path returns the FIRST match. (react router does partial matching)
exact path disables partial matching. so we can just match exact path /users
path /users/create would not be affected 

Use exact path on any routes that could be included within other routes

Switch will iterate over all of its children Route components. Only render the first one that matches the current location.

Regular route will render every route that matches. Switch will only rear the route that actually matches

*/
