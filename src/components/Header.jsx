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
        <Link to="/izvietot" className="header-link">
          <button>Izvietot</button>
        </Link>
        <Link to="/preces" className="header-link">
          <button>Preces</button>
        </Link>
        <Link to="/atskaites" className="header-link">
          <button>Atskaites</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
