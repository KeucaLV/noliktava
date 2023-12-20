import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PlauktuKartotajs from './components/PlauktuKartotajs';
import PlauktuKartotajsIzvietot from './components/PlauktuKartotajsIzvietot';
import PlauktuKartotajsPreces from './components/PlauktuKartotajsPreces';
import PlauktuKartotajsPrecesEdit from './components/PlauktuKartotajsPrecesEdit';
import PlauktuKartotajsPrecesMore from './components/PlauktuKartotajsPrecesMore';
import NoliktavuDarbinieks from './components/NoliktavuDarbinieks';
import NoliktavuDarbinieksPievienotPreci from './components/NoliktavuDarbinieksPievienotPreci';
import NoliktavuDarbinieksPasutit from './components/NoliktavuDarbinieksPasutit'
import NoliktavuDarbinieksPreces from './components/NoliktavuDarbinieksPreces';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/plauktuKartotajs" element={<PlauktuKartotajs />} />
        <Route path="/plauktuKartotajsIzvietot" element={<PlauktuKartotajsIzvietot />} />
        <Route path="/plauktuKartotajsPreces" element={<PlauktuKartotajsPreces />} />
        <Route path="/plauktuKartotajsPrecesEdit/:id" element={<PlauktuKartotajsPrecesEdit />} />
        <Route path="/plauktuKartotajsPrecesMore/:id" element={<PlauktuKartotajsPrecesMore />} />
        <Route path="/noliktavuDarbinieks" element={<NoliktavuDarbinieks />} />
        <Route path="/noliktavuDarbinieksPievienotPreci" element={<NoliktavuDarbinieksPievienotPreci />} />
        <Route path="/noliktavuDarbinieksPasutit" element={<NoliktavuDarbinieksPasutit />} />
        <Route path="/noliktavuDarbinieksPreces" element={<NoliktavuDarbinieksPreces />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
