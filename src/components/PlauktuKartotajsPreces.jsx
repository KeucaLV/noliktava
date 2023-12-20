import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PlauktuKartotajsPreces.css';

function getKategorija(prece, kategorijas) {
  if (!Array.isArray(kategorijas)) {
    return 'Unknown';
  }

  const foundKategorija = kategorijas.find((item) => item.id === prece.kategorija);
  return foundKategorija ? foundKategorija.kategorija : 'Unknown';
}

function PlauktuKartotajsPreces() {
  const navigate = useNavigate();
  const [kategorijas, setKategorijas] = useState([]);
  const [preces, setPreces] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [plauktsOptions, setPlauktsOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResultsMessage, setSearchResultsMessage] = useState('');
  const [kategorijasOptions, setKategorijasOptions] = useState([]);
  const foundKategorija = preces.length > 0 ? getKategorija(preces[0], kategorijas) : 'Unknown';

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditClick = (id) => {
    navigate(`/precesEdit/${id}`);
  };

  const handleMoreClick = (id) => {
    navigate(`/precesMore/${id}`);
  };

  const handlePlauktsChange = (event) => {
    const selectedPlauktsId = event.target.value;
  
    fetch(`http://localhost/noliktava_php/SelectPrecesByPlaukts.php?id=${selectedPlauktsId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPreces(data);
      })
      .catch((error) => {
        console.error('Error fetching Preces by Plaukts:', error);
      });
  };
  
  const fetchKategorijas = () => {
    fetch('http://localhost/noliktava_php/SelectKategorijas.php')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setKategorijas(data);
        } else {
          console.error('Invalid data format for Kategorijas');
        }
      })
      .catch((error) => {
        console.error('Error fetching Kategorijas:', error);
      });
  };

  const handleKategorijasChange = (event) => {
    const selectedKategorijasId = event.target.value;
  
    fetch(`http://localhost/noliktava_php/SelectPrecesByKategorijas.php?id=${selectedKategorijasId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the received data
  
        // Set the received data to the preces state
        setPreces(data);
      })
      .catch((error) => {
        console.error('Error fetching Preces by Kategorijas:', error);
      });
  };
  
  useEffect(() => {
    fetchKategorijas();
    
    fetch('http://localhost/noliktava_php/SelectKategorijas.php')
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setKategorijas(data);
        // Update the dropdown HTML after setting the categories
        const dropdown = document.getElementById('kategorijasDropdown');
        if (dropdown) {
          // Clear existing options before appending new ones
          dropdown.innerHTML = '';
          data.forEach((category) => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.kategorija;
            dropdown.appendChild(option);
          });
        }
      } else {
        console.error('Invalid data format for Kategorijas');
      }
    })
    .catch((error) => {
      console.error('Error fetching Kategorijas:', error);
    });

      fetch('http://localhost/noliktava_php/GetAllPreces.php')
      .then((response) => response.json())
      .then((data) => {
        setPreces(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetch('http://localhost/noliktava_php/SortOptions.php')
      .then((response) => response.json())
      .then((data) => {
        console.log('Sorting options:', data); // Check the console for received data
        setSortOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching sorting options:', error);
      });

      fetch('http://localhost/noliktava_php/SelectPlaukts.php')
      .then((response) => response.json())
      .then((data) => {
        console.log('Plaukts options:', data);
        setPlauktsOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching plaukts:', error);
      });

      if (searchTerm !== '') {
        fetch(`http://localhost/noliktava_php/SearchPreces.php?searchTerm=${searchTerm}`)
          .then((response) => response.json())
          .then((data) => {
            setPreces(data);
            setSearchResultsMessage(data.length > 0 ? `${data.length} Preces atrastas` : 'No preces found');
          })
          .catch((error) => {
            console.error('Error fetching search results:', error);
          });
      }

      const plauktsDropdown = document.getElementById('plauktsDropdown');
  if (plauktsDropdown) {
    plauktsDropdown.addEventListener('change', handlePlauktsChange);
  }

  const kategorijasDropdown = document.getElementById('kategorijasDropdown');
  if (kategorijasDropdown) {
    kategorijasDropdown.addEventListener('change', handleKategorijasChange);
    // Set the selected value based on state
    kategorijasDropdown.value = searchTerm; // Assuming searchTerm corresponds to the selected value
  }

  const getKategorija = (prece) => {
    if (!Array.isArray(kategorijas)) {
      return 'Unknown';
    }

    const foundKategorija = kategorijas.find((item) => item.id === prece.kategorija);
    return foundKategorija ? foundKategorija.kategorija : 'Unknown';
  };

  return () => {
    if (plauktsDropdown) {
      plauktsDropdown.removeEventListener('change', handlePlauktsChange);
    }
    if (kategorijasDropdown) {
      kategorijasDropdown.removeEventListener('change', handleKategorijasChange);
    }
  };
}, [searchTerm]);


return (
  <div className="nez">
    <div className="PlauktuKartotajsPreces">
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Meklēt..."
          className="SearchInput"
          value={searchTerm}
          onChange={handleSearch}
        />

        <select className="Dropdown" onChange={handlePlauktsChange}>
          <option value="">Plaukts</option>
          {plauktsOptions.map((plauktsData) => (
            <option key={plauktsData.id} value={plauktsData.id}>
              {plauktsData.plaukta_nr} - {plauktsData.stavoklis} (Brīvas vietas: {plauktsData.brivas_vietas})
            </option>
          ))}
        </select>

        <select className="Dropdown" id="kategorijasDropdown" onChange={handleKategorijasChange} value={searchTerm}>
          <option value="">Kategorija</option>
          {kategorijasOptions.map((kategorijaData) => (
            <option key={kategorijaData.id} value={kategorijaData.id}>
              {kategorijaData.kategorija}
            </option>
          ))}
        </select>

        <select className="Dropdown" onChange={(e) => console.log(e.target.value)}>
          <option value="">Kārtot pēc</option>
          {Object.entries(sortOptions).map(([label, value]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="Preces">
        {preces.length > 0 ? (
          preces.map((prece) => {
            const foundKategorija = getKategorija(prece, kategorijas); // Pass kategorijas here

            return (
              <div className="item" key={prece.id}>
                <div className="ItemCredentials">
                  <div className="ItemTitle">
                    <h1>{prece.nosaukums}</h1>
                  </div>
                  <div className="ItemInfo">
                    <div className="Column">
                      <p><strong>Ražotājs:</strong> {prece.razotajs}</p>
                      <p><strong>Kategorija:</strong> {foundKategorija}</p> {/* Display the category here */}
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
            );
          })
        ) : (
          <p>{searchResultsMessage || 'No preces added'}</p>
        )}
      </div>
    </div>
  </div>
);
}

export default PlauktuKartotajsPreces;
