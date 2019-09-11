import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/homepage/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Makes Redux store available to the entire app
import { Provider } from 'react-redux';
import store from '../src/store';

import './App.css';

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
path would only return /users because path returns the FIRST match
exact path would allow us to access /users/create
*/
