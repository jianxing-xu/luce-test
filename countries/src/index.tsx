import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { start } from '@jianxing/auto-check-update'

ReactDOM.render(
  <React.StrictMode>
    <App />
    123
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
start({
  onNotify() {
    console.log("update notify !!!")
    return true
  },
  time: 2000
})
