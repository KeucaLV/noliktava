import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PlauktuKartotajs from './components/PlauktuKartotajs';
import PlauktuKartotajsIzvietot from './components/PlauktuKartotajsIzvietot';
import PlauktuKartotajsPreces from './components/PlauktuKartotajsPreces';
import PlauktuKartotajsPrecesEdit from './components/PlauktuKartotajsPrecesEdit';
import PlauktuKartotajsPrecesMore from './components/PlauktuKartotajsPrecesMore';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PlauktuKartotajs />} />
        <Route path="/izvietot" element={<PlauktuKartotajsIzvietot />} />
        <Route path="/preces" element={<PlauktuKartotajsPreces />} />
        <Route path="/precesEdit/:id" element={<PlauktuKartotajsPrecesEdit />} />
        <Route path="/precesMore/:id" element={<PlauktuKartotajsPrecesMore />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
