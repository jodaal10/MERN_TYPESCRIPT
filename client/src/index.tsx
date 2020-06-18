import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'react-data-components/css/table-twbs.css'

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

