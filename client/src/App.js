import React from 'react';
import { BrowserRouter as Router, Route, Swtich } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';

import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Landing />
    </Router>
  );
};

export default App;
