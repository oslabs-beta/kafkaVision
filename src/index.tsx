import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './styles.css'; //importing into div tree

var mountNode = document.getElementById('root'); //changed from app
ReactDOM.render(<App />, mountNode);
