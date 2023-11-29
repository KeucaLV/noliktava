import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PlauktuKartotajs from './PlauktuKartotajs';
import Header from './Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <PlauktuKartotajs />
  </React.StrictMode>
);


