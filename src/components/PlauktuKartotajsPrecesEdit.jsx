import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PlauktuKartotajsPrecesEdit.css';

function PlauktuKartotajsPrecesEdit() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newDaudzums, setNewDaudzums] = useState('');
  const [newPlaukts, setNewPlaukts] = useState('');

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

  const handleUpdateClick = () => {
    fetch('http://localhost/noliktava_php/PrecesEdit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        daudzums: newDaudzums,
        plaukts: newPlaukts,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        console.log(data); 
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="nez">
      <div className="PlauktuKartotajsPrecesEdit">
        <div className="PrecesEdit">
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
              <input
                type="text"
                placeholder="New Daudzums"
                value={newDaudzums}
                onChange={(e) => setNewDaudzums(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Plaukts"
                value={newPlaukts}
                onChange={(e) => setNewPlaukts(e.target.value)}
              />
              <button onClick={handleUpdateClick}>Update</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlauktuKartotajsPrecesEdit;
