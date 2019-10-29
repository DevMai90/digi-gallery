import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Stamp our App component into the index.html div with an identifier of root.
// Gets placed inside of #root. Overrides anything already inside of #root.
ReactDOM.render(<App />, document.getElementById('root'));
