import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/homepage/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

// Makes Redux store available to the entire app
import { Provider } from 'react-redux';
import store from '../src/store';

import './App.css';

// Must check our token to see if we have one. If we do then return user. Then set loading to false after. Update state

const App = () => {
  return (
    // Provider wraps around EVERYTHING
    <Provider store={store}>
      <Router>
        <div className="contain">
          <Header />
          <Route exact path="/" component={Home} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
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
