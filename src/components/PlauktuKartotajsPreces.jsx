import React from 'react';
import '../css/PlauktuKartotajsPreces.css';

function PlauktuKartotajsPreces() {
  return (
    <div className="nez">
        <div className="PlauktuKartotajsPreces">
            <div className="SearchContainer">
                <input type="text" placeholder="Meklēt..." className="SearchInput" />

                <select className="Dropdown">
                <option value="plaukts">Plaukts</option>
                </select>

                <select className="Dropdown">
                <option value="kategorija">Kategorija</option>
                </select>

                <select className="Dropdown">
                <option value="kartot">Kārtot</option>
                </select>
            </div>
            <div className="Preces">
              <div className="item">1</div>
              <div className="item">2</div>
              <div className="item">3</div>
              <div className="item">4</div>
              <div className="item">5</div>
              <div className="item">6</div>
              <div className="item">7</div>
              <div className="item">8</div>
              <div className="item">9</div>
            </div>
        </div>
    </div>
  );
}

export default PlauktuKartotajsPreces;
