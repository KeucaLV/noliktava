import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PlauktuKartotajsPrecesMore.css';

function PlauktuKartotajsPrecesMore() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost/noliktava_php/GetAllPrecesByID.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data[0]); // Assuming data is an array with a single item based on ID
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="nez">
      <div className="PlauktuKartotajsPrecesMore">
        <div className="PrecesMore">
          {item && (
            <div className="ItemDetails">
              <h2>{item.nosaukums}</h2>
              <div>
                <p><strong>Razotājs:</strong> {item.razotajs}</p>
                <p><strong>Apraksts:</strong> {item.apraksts}</p>
                <p><strong>Kategorija:</strong> {item.kategorija}</p>
                <p><strong>Daudzums:</strong> {item.daudzums}</p>
                <p><strong>Plaukts:</strong> {item.plaukts}</p>
                <p><strong>Cena:</strong> {item.cena} </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlauktuKartotajsPrecesMore;
