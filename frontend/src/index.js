import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); 
//hold pointer to real root 
//create root renders stuff inside real root
root.render( //take app component, turn it into html and insert into root div
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//strict mode to double check for mistakes
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
