import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/images/Logo.png'} alt="Logo" />
      </div>

      <div className="header-buttons">
        <Link to="/plauktuKartotajsIzvietot" className="header-link">
          <button>Izvietot</button>
        </Link>

        <Link to="/plauktuKartotajsPreces" className="header-link">
          <button>Preces</button>
        </Link>

        <Link to="/noliktavuDarbinieks" className="header-link">
          <button>Darbinieks</button>
        </Link>

        <Link to="/plauktuKartotajs" className="header-link">
          <button>Kartotajs</button>
        </Link>

        <Link to="/noliktavuDarbinieksPreces" className="header-link">
          <button>Darbinieks Preces</button>
        </Link>

        <Link to="/noliktavuDarbinieksPievienotPreci" className="header-link">
          <button>Darbinieks Pievienot</button>
        </Link>

        <Link to="/noliktavuDarbinieksPasutit" className="header-link">
          <button>Darbinieks Pasutit</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
