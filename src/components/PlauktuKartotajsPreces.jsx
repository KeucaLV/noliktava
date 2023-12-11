import React from 'react';
import '../css/PlauktuKartotajsPreces.css';

function PlauktuKartotajsPreces() {
  return (
    <div className="nez">
        <div className="PlauktuKartotajsPreces">
            <div className="SearchContainer">
                <input type="text" placeholder="Search..." className="SearchInput" />

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

            </div>
        </div>
    </div>
  );
}

export default PlauktuKartotajsPreces;
