import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PlauktuKartotajs from './component/PlauktuKartotajs';
import Header from './component/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <PlauktuKartotajs />
  </React.StrictMode>
);


