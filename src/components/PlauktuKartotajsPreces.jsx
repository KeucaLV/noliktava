import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PlauktuKartotajsPreces.css';

function PlauktuKartotajsPreces() {
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/precesEdit/${id}`);
  };

  const handleMoreClick = (id) => {
    navigate(`/precesMore/${id}`);
  };

  const [preces, setPreces] = useState([]);

  useEffect(() => {
    fetch('http://localhost/noliktava_php/GetAllPreces.php')
      .then((response) => response.json())
      .then((data) => {
        setPreces(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
          {preces.map((prece) => (
            <div className="item" key={prece.id}>
              <div className="ItemCredentials">
                <div className="ItemTitle">
                  <h1>{prece.nosaukums}</h1>
                </div>
                <div className="ItemInfo">
                  <div className="Column">
                    <p><strong>Razotājs:</strong> {prece.razotajs}</p>
                    <p><strong>Kategorija:</strong> {prece.kategorija}</p>
                  </div>
                  <div className="Column">
                    <p><strong>Daudzums:</strong> {prece.daudzums}</p>
                    <p><strong>Plaukts:</strong> {prece.plaukts}</p>
                  </div>
                </div>
              </div>
              <div className="ItemButtons">
                <button className="EditButton" onClick={() => handleEditClick(prece.id)}>Rediģēt</button>
                <button className="MoreButton" onClick={() => handleMoreClick(prece.id)}>Vairāk</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlauktuKartotajsPreces;
