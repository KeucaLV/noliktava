import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/PlauktuKartotajsPrecesEdit.css';

function PlauktuKartotajsPrecesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    setLoading(true);
  
    fetch('http://localhost/noliktava_php/SelectKategorijas.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Data received is not in correct format');
        }
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  
    fetch(`http://localhost/noliktava_php/GetAllPrecesByID.php?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Data received is not in correct format');
        }
        setItem(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateClick = () => {
    if (!item.daudzums || !item.plaukts) {
      setValidationMessage('Please provide both quantity and shelf information.');
      return;
    }

    const { daudzums, plaukts, ...rest } = item;

    fetch('http://localhost/noliktava_php/PrecesEdit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        daudzums,
        plaukts,
        ...rest,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setValidationMessage('Prece Veiksmīgi Rediģēta');
          // Redirect to the parent file after successful update
          setTimeout(() => {
            navigate('/preces'); // Using navigate instead of history.push for navigation
          }, 1000);
        } else {
          setValidationMessage('Rediģēšana Nav Veiksmīga: ' + data.message);
        }
      })
      .catch((error) => {
        setValidationMessage('Kļūda Rediģējot Preci: ' + error.message);
      });
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost/noliktava_php/RemovePrece.php?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Change to response.json() to parse the response as JSON
      })
      .then((data) => {
        if (data.success) {
          setValidationMessage('Prece Veiksmīgi Dzēsta');
          // Optionally, perform additional logic after successful deletion
          setTimeout(() => {
            navigate('/preces'); // Using navigate instead of history.push for navigation
          }, 1000);
        } else {
          setValidationMessage('Failed to delete prece: ' + data.message);
        }
      })
      .catch((error) => {
        setValidationMessage('Error deleting prece: ' + error.message);
      });
  };
  
  const handleInputChange = (field, value) => {
    setItem({ ...item, [field]: value });
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
                <h2>
                  <strong>Nosaukums:</strong> 
                  <input
                    type="text"
                    value={item.nosaukums}
                    onChange={(e) => handleInputChange('nosaukums', e.target.value)}
                  />
                </h2>
              <div>
                <p>
                  <strong>Ražotājs:</strong> 
                  <input
                    type="text"
                    value={item.razotajs}
                    onChange={(e) => handleInputChange('razotajs', e.target.value)}
                  />
                </p>
                <p>
                  <strong>Apraksts:</strong> 
                  <input
                    type="text"
                    value={item.apraksts}
                    onChange={(e) => handleInputChange('apraksts', e.target.value)}
                  />
                </p>
  
                <p>
                  <strong>Kategorija:</strong> 
                  <select
                    value={item.kategorija}
                    onChange={(e) => handleInputChange('kategorija', e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.kategorija}
                      </option>
                    ))}
                  </select>
                </p>
                
                <p>
                  <strong>Daudzums:</strong> 
                  <input
                    type="text"
                    value={item.daudzums}
                    onChange={(e) => handleInputChange('daudzums', e.target.value)}
                  />
                </p>
                
                <p>
                  <strong>Plaukts:</strong> 
                  <input
                    type="text"
                    value={item.plaukts}
                    onChange={(e) => handleInputChange('plaukts', e.target.value)}
                  />
                </p>
  
                <p>
                  <strong>Cena:</strong> 
                  <input
                    type="text"
                    value={item.cena}
                    onChange={(e) => handleInputChange('cena', e.target.value)}
                  />
                </p>

                <p>{validationMessage}</p>
              </div>
              <button onClick={handleUpdateClick}>Update</button>
              <button onClick={handleDeleteClick}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlauktuKartotajsPrecesEdit;
