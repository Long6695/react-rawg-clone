import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import GamesProvider from 'context/gamesContext';


ReactDOM.render(
<GamesProvider>
  <App />
</GamesProvider>
, document.getElementById('root'))