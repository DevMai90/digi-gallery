import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/homepage/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="contain">
        <Header />
        <Route exact path="/" component={Home} />
        <Switch>
          {/* <div style={{ background: 'white' }}> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* </div> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// exact path
// switch
